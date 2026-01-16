import React from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Alert, 
  Text,
  Image,
  Platform
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Transaction, useTransaction } from '../context/TransactionContext';

const Colors = {
  background: '#FFFFFF',
  text: '#171717',
  icon: '#333333',
  border: '#EFEFEF',
  cardBg: '#F9FAFB',
  income: '#2ECC71',
  expense: '#E74C3C',
};

export default function FinanceScreen() {
  const router = useRouter();
  const { transactions, deleteTransaction } = useTransaction();

  const handleDelete = (id: number) => {
    Alert.alert('Hapus Transaksi', 'Apakah anda yakin ingin menghapus transaksi ini?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => deleteTransaction(id) },
    ]);
  };

  const formatRupiah = (number: number) => {
    return `Rp ${number.toLocaleString('id-ID')}`;
  };

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <Ionicons
          name={item.type === 'income' ? 'arrow-up-circle' : 'arrow-down-circle'}
          size={36}
          color={item.type === 'income' ? Colors.income : Colors.expense}
        />
      </View>

      <View style={styles.cardContent}>
        <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
        <Text style={styles.cardDate}>
          {new Date(item.date).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric'
          })}
          {item.description ? ` • ${item.description}` : ''}
        </Text>
      </View>

      <View style={styles.cardRight}>
        <Text style={[
          styles.cardAmount, 
          { color: item.type === 'income' ? Colors.income : Colors.expense }
        ]}>
          {item.type === 'income' ? '+ ' : '- '}
          {formatRupiah(item.amount)}
        </Text>
        
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => handleDelete(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={require('../../assets/images/logo-uts.png')} 
              style={styles.headerLogo} 
            />
            <ThemedText style={styles.headerTitle}>Transaksi</ThemedText>
          </View>
          
          <TouchableOpacity onPress={() => router.push('/add-transaction')}>
            <Ionicons name="add-circle-outline" size={32} color={Colors.icon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={styles.bodyContent}>
        {transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color="#E0E0E0" />
            <Text style={styles.emptyText}>Belum ada transaksi</Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => router.push('/add-transaction')}
            >
              <Text style={styles.emptyButtonText}>Tambah Sekarang</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: { 
    flexDirection: 'row', 
    alignItems: 'center',
    paddingLeft: Platform.OS === 'android' ? 0 : 0 
  },
  headerLogo: {
    width: 54,
    height: 54,
    marginRight: 12, 
    resizeMode: 'contain' 
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold', 
    color: Colors.text,
  },
  bodyContent: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardIcon: {
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold', 
    color: Colors.text,
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Poppins_400Regular', 
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  cardAmount: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  emptyText: {
    marginTop: 16,
    color: '#999',
    fontSize: 16,
    marginBottom: 24,
    fontFamily: 'Poppins_400Regular',
  },
  emptyButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  emptyButtonText: {
    color: '#555',
    fontFamily: 'Poppins_600SemiBold',
  },
});