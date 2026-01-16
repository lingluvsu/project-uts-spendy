import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  Alert
} from 'react-native';
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
  border: '#EFEFEF',
  icon: '#333333',
  inputBg: '#F5F7FA', 
  inputBorder: '#E2E8F0',
  primary: '#4A90E2', 
  white: '#FFFFFF',
};

export default function EditProfileScreen() {
  const router = useRouter();
  
  const { userName, updateUserName } = useTransaction();

  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (userName) {
      setNameInput(userName);
    }
  }, [userName]);

  const handleSave = () => {
    if (nameInput.trim() === '') {
      Alert.alert('Peringatan', 'Nama tidak boleh kosong!');
      return;
    }

    updateUserName(nameInput);

    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      {/* Sembunyikan header bawaan */}
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header Kustom */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={Colors.icon} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Edit Profil</ThemedText>
          <View style={{ width: 28 }} /> {/* Penyeimbang layout kanan */}
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Ikon Profil Besar */}
        <View style={styles.profileIconCircle}>
          <Ionicons name="person-outline" size={80} color={Colors.textLight} />
          <View style={styles.cameraIconBadge}>
            <Ionicons name="camera" size={20} color="white" />
          </View>
        </View>

        {/* Form Input */}
        <View style={styles.formContainer}>
          <ThemedText style={styles.inputLabel}>Nama Lengkap</ThemedText>
          <TextInput
            style={styles.input}
            value={nameInput}
            onChangeText={setNameInput}
            placeholder="Masukkan nama anda"
            placeholderTextColor={Colors.textLight}
            autoFocus={false}
          />
          <Text style={styles.hintText}>
            Nama ini akan muncul di halaman utama aplikasi.
          </Text>
        </View>
        
        {/* Tombol Simpan */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
        </TouchableOpacity>

      </ScrollView>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
  },
  profileIconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    marginTop: 20,
    marginBottom: 40,
    position: 'relative',
  },
  cameraIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.background,
  },
  formContainer: {
    width: '100%',
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: Colors.inputBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.text,
  },
  hintText: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 4,
  },
  saveButton: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    // Shadow
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});