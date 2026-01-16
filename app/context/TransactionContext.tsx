import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getDbConnection, initDatabase } from '../database/db';

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  date: string;
}

export type FilterDuration = 'all' | 'date' | 'month' | 'year';

interface TransactionContextType {
  transactions: Transaction[];
  totalIncome: number;
  totalExpense: number;
  currentBalance: number;
  userName: string;
  loading: boolean;
  filterDuration: FilterDuration; 
  setFilterDuration: (duration: FilterDuration) => void;
  filterDate: Date; 
  setFilterDate: (date: Date) => void; 
  addTransaction: (title: string, amount: number, type: 'income' | 'expense', description: string) => void;
  deleteTransaction: (id: number) => void;
  updateUserName: (name: string) => void;
  refreshData: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
    // Fetch data from backend API
    const refreshData = async () => {
      try {
        const res = await fetch('http://10.0.2.2:3000/pengeluaran');
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.log(err);
      }
    };
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);
  
  const [filterDuration, setFilterDuration] = useState<FilterDuration>('all');
  const [filterDate, setFilterDate] = useState<Date>(new Date()); 

  const db = getDbConnection();
  const loadData = useCallback(() => {
    setLoading(true);
    try {
      let query = 'SELECT * FROM transactions';
      let params: any[] = [];
      
      const selectedIso = filterDate.toISOString(); 
      if (filterDuration === 'date') {
        const dateStr = selectedIso.slice(0, 10);
        query += " WHERE strftime('%Y-%m-%d', date) = ?";
        params.push(dateStr);

      } else if (filterDuration === 'month') {
        const monthStr = selectedIso.slice(0, 7); 
        query += " WHERE strftime('%Y-%m', date) = ?";
        params.push(monthStr);

      } else if (filterDuration === 'year') {
        const yearStr = filterDate.getFullYear().toString();
        query += " WHERE strftime('%Y', date) = ?";
        params.push(yearStr);
      }

      query += ' ORDER BY id DESC;';

      const result = db.getAllSync<Transaction>(query, params);
      setTransactions(result);

    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      setLoading(false);
    }
  }, [db, filterDuration, filterDate]); 

  const loadUserProfile = useCallback(() => {
    try {
      const user = db.getFirstSync<{ id: number, name: string }>('SELECT * FROM user_profile WHERE id = 1;');
      if (user) {
        setUserName(user.name);
      } else {
        db.runSync('INSERT INTO user_profile (id, name) VALUES (1, ?)', ['Guest']);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  }, [db]);

  useEffect(() => {
    initDatabase()
      .then(() => {
        loadData();
        loadUserProfile();
      })
      .catch((err) => console.error('Database init error:', err));
  }, [loadData, loadUserProfile]);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((tx) => {
      if (tx.type === 'income') {
        income += tx.amount;
      } else {
        expense += tx.amount;
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    setCurrentBalance(income - expense);
  }, [transactions]);

  const addTransaction = (title: string, amount: number, type: 'income' | 'expense', description: string) => {
    const date = new Date().toISOString();
    try {
      db.runSync(
        'INSERT INTO transactions (title, amount, type, description, date) VALUES (?, ?, ?, ?, ?);',
        [title, amount, type, description, date]
      );
      loadData(); 
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = (id: number) => {
    try {
      db.runSync('DELETE FROM transactions WHERE id = ?;', [id]);
      loadData();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const updateUserName = (name: string) => {
    try {
      db.runSync('UPDATE user_profile SET name = ? WHERE id = 1;', [name]);
      setUserName(name);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        totalIncome,
        totalExpense,
        currentBalance,
        userName,
        loading,
        filterDuration,    
        setFilterDuration,
        filterDate,      
        setFilterDate,    
        addTransaction,
        deleteTransaction,
        updateUserName,
        refreshData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};