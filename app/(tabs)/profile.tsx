import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image, 
  Platform
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTransaction } from '../context/TransactionContext';

const Colors = {
  background: '#FFFFFF',
  text: '#171717',
  textLight: '#6B7280',
  border: '#EFEFEF',
  icon: '#333333',
  buttonBg: '#E0F7FA', 
  buttonBorder: '#B2EBF2', 
  buttonText: '#00796B', 
};

export default function ProfileScreen() {
  const router = useRouter(); 
  const { userName } = useTransaction();

  const onEditProfile = () => {
    router.push('/edit-profile');
  };

  const onAbout = () => {
    router.push('/about');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={require('../../assets/images/logo-uts.png')} 
              style={styles.headerLogo} 
            />
            <ThemedText style={styles.headerTitle}>Profil</ThemedText>
          </View>
          <View style={{ width: 28 }} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scrollView}>
        <View style={styles.mainContent}>
          <View style={styles.profileSection}>
            <View>
              <ThemedText style={styles.greetingLabel}>Selamat Datang,</ThemedText>
              <ThemedText style={styles.greetingText}>{userName}</ThemedText>
            </View>
            
            <View style={styles.profileIconCircle}>
              <Ionicons
                name="person-outline"
                size={48}
                color={Colors.textLight}
              />
            </View>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuButton} onPress={onEditProfile}>
              <ThemedText style={styles.menuButtonText}>Edit Profil</ThemedText>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={Colors.buttonText}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton} onPress={onAbout}>
              <ThemedText style={styles.menuButtonText}>
                Tentang Aplikasi
              </ThemedText>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={Colors.buttonText}
              />
            </TouchableOpacity>
          </View>
        </View>
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
  headerLeft: { 
    flexDirection: 'row', 
    alignItems: 'center', 
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
  scrollView: {
    flex: 1,
  },
  mainContent: {
    padding: 24,
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greetingLabel: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 4,
    fontFamily: 'Poppins_400Regular',
  },
  greetingText: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: Colors.text,
  },
  profileIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  menuContainer: {
    gap: 16, 
  },
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.buttonBg,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
  },
  menuButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    color: Colors.buttonText,
  },
});