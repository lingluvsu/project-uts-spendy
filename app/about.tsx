import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

const Colors = {
  background: '#FFFFFF',
  text: '#171717',
  textLight: '#6B7280',
  border: '#EFEFEF',
  icon: '#333333',
};

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      {/* 1. Sembunyikan header bawaan Expo Router */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* 2. SafeAreaView untuk menangani Status Bar / Notch */}
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        
        {/* 3. Header Kustom */}
        <View style={styles.header}>
          
          {/* Ikon Kiri (Tombol Kembali) */}
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={Colors.icon} />
          </TouchableOpacity>

          {/* Judul Halaman */}
          <ThemedText style={styles.headerTitle}>Tentang Aplikasi</ThemedText>

          {/* Ikon Kanan (Ikon kustom) */}
          <TouchableOpacity>
             <Ionicons name="analytics-outline" size={28} color={Colors.icon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* 4. Konten Halaman */}
      <View style={styles.bodyContent}>
        <ThemedText style={styles.appName}>Spendy</ThemedText>
        <ThemedText style={styles.appVersion}>1.0</ThemedText>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  bodyContent: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  appName: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.text,
  },
  appVersion: {
    fontSize: 18,
    color: Colors.textLight,
    marginTop: 8,
  },
});