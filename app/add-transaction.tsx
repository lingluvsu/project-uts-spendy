import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { useTransaction } from './context/TransactionContext';

const Colors = {
  background: '#FFFFFF',
  text: '#171717',
  textLight: '#6B7280',
  placeholder: '#A0A0A0',
  border: '#E0E0E0',
  income: '#2ECC71',
  incomeLight: '#E0F8E9',
  incomeBorder: '#B3E6C9',
  expense: '#E74C3C',
  expenseLight: '#FDEEEB',
  expenseBorder: '#F5B7B1',
  primary: '#ADD8E6',
  primaryText: '#FFFFFF',
  icon: '#333333',
};

export default function AddTransactionScreen() {
  const router = useRouter();
  const { addTransaction } = useTransaction(); 

  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
const [kategori, setKategori] = useState('');
const [deskripsi, setDeskripsi] = useState('');
const [jumlah, setJumlah] = useState('');

  const onSave = () => {
    if (!amount || !title) {
      Alert.alert('Gagal', 'Mohon isi jumlah dan judul transaksi');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      Alert.alert('Gagal', 'Jumlah harus berupa angka');
      return;
    }

    addTransaction(title, numAmount, type, description);
    
    router.back();
  };

  const submitData = () => {
  fetch('http://10.0.2.2:3000/pengeluaran', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      kategori,
      deskripsi,
      jumlah: Number(jumlah),
      tanggal: new Date().toISOString().split('T')[0],
    }),
  })
    .then(res => res.json())
    .then(() => {
      alert('Data berhasil ditambah');
    })
    .catch(err => console.log(err));
};

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={Colors.icon} />
          </TouchableOpacity>
          <ThemedText style={{fontSize: 18, fontWeight: 'bold'}}>Transaksi Baru</ThemedText>
          <View style={{width: 28}} /> 
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
           <ThemedText style={styles.sectionTitle}>Detail Transaksi</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Rp. 0"
            placeholderTextColor={Colors.placeholder}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Judul (contoh: Makan Siang)"
            placeholderTextColor={Colors.placeholder}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Keterangan (opsional)"
            placeholderTextColor={Colors.placeholder}
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
  placeholder="Kategori"
  value={kategori}
  onChangeText={setKategori}
/>

<TextInput
  placeholder="Deskripsi"
  value={deskripsi}
  onChangeText={setDeskripsi}
/>

<TextInput
  placeholder="Jumlah"
  keyboardType="numeric"
  value={jumlah}
  onChangeText={setJumlah}
/>

        </View>

        <ThemedText style={styles.sectionTitle}>Jenis Transaksi</ThemedText>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[styles.typeBox, styles.incomeBox, type === 'expense' && styles.typeBoxUnselected]}
            onPress={() => setType('income')}
          >
            <Ionicons name="arrow-up" size={24} color={Colors.income} />
            <Text style={[styles.typeText, { color: Colors.income }]}>Pemasukkan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeBox, styles.expenseBox, type === 'income' && styles.typeBoxUnselected]}
            onPress={() => setType('expense')}
          >
            <Ionicons name="arrow-down" size={24} color={Colors.expense} />
            <Text style={[styles.typeText, { color: Colors.expense }]}>Pengeluaran</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    safeArea: { backgroundColor: Colors.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
    scrollContent: { paddingHorizontal: 24, paddingBottom: 40, paddingTop: 20 },
    formContainer: { marginBottom: 24 },
    input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: Colors.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, marginBottom: 16, color: Colors.text },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: Colors.text, marginBottom: 12 },
    typeContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
    typeBox: { flex: 1, borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 2, elevation: 2 },
    incomeBox: { backgroundColor: Colors.incomeLight, borderColor: Colors.incomeBorder },
    expenseBox: { backgroundColor: Colors.expenseLight, borderColor: Colors.expenseBorder },
    typeBoxUnselected: { opacity: 0.4, elevation: 0, borderWidth: 1, borderColor: Colors.border, backgroundColor: '#f9f9f9' },
    typeText: { fontSize: 14, fontWeight: '600', marginTop: 8 },
    saveButton: { backgroundColor: Colors.primary, borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginTop: 32 },
    saveButtonText: { color: Colors.text, fontSize: 18, fontWeight: 'bold' },
});