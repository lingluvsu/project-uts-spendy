import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Image, 
  Platform,
  Modal,           
  TouchableWithoutFeedback 
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FilterDuration, useTransaction } from '../context/TransactionContext';

const Colors = {
  background: '#F4F5F7',
  cardBg: '#FFFFFF',
  text: '#171717',
  textLight: '#6B7280',
  border: '#EFEFEF',
  income: '#2ECC71',
  expense: '#E74C3C',
  primary: '#4A90E2',
  modalOverlay: 'rgba(0,0,0,0.4)', 
};

export default function TabTwoScreen() {
  const { 
    totalIncome, 
    totalExpense, 
    currentBalance, 
    filterDuration, 
    setFilterDuration,
    filterDate,
    setFilterDate
  } = useTransaction();

  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatRupiah = (number: number) => {
    return `Rp ${number.toLocaleString('id-ID')}`;
  };

  const formatDateIndo = (date: Date) => {
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getFilterLabel = () => {
    switch (filterDuration) {
      case 'date': return formatDateIndo(filterDate);
      case 'month': return filterDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
      case 'year': return filterDate.getFullYear().toString();
      default: return 'Semua Waktu';
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setFilterDate(selectedDate);
      setFilterDuration('date');
    }
  };

  const handleSelectFilter = (type: FilterDuration) => {
    if (type === 'date') {
      setModalVisible(false);
      setTimeout(() => setShowDatePicker(true), 300);
    } else {
      if (type !== 'all') {
        setFilterDate(new Date());
      }
      setFilterDuration(type);
      setModalVisible(false);
    }
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
            <ThemedText style={styles.headerTitle}>Laporan</ThemedText>
          </View>

          <TouchableOpacity 
            style={styles.dateFilter} 
            onPress={() => setModalVisible(true)}
          >
            <ThemedText style={styles.dateYear}>Filter</ThemedText>
            <ThemedText style={styles.dateMonth}>
              {getFilterLabel()} <Ionicons name="chevron-down" size={14} />
            </ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContent}>
          {/* Kartu Total Pemasukan */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryTextContainer}>
              <ThemedText style={styles.summaryLabel}>Total Pemasukan</ThemedText>
              <ThemedText style={[styles.summaryAmount, { color: Colors.income }]}>
                {formatRupiah(totalIncome)}
              </ThemedText>
            </View>
            <View style={[styles.iconWrapper, { backgroundColor: '#EAF9F1' }]}>
              <Ionicons name="arrow-up" size={24} color={Colors.income} />
            </View>
          </View>

          {/* Kartu Total Pengeluaran */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryTextContainer}>
              <ThemedText style={styles.summaryLabel}>Total Pengeluaran</ThemedText>
              <ThemedText style={[styles.summaryAmount, { color: Colors.expense }]}>
                {formatRupiah(totalExpense)}
              </ThemedText>
            </View>
            <View style={[styles.iconWrapper, { backgroundColor: '#FDEEEB' }]}>
              <Ionicons name="arrow-down" size={24} color={Colors.expense} />
            </View>
          </View>

          {/* Kartu Saldo Bersih */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryTextContainer}>
              <ThemedText style={styles.summaryLabel}>Saldo Bersih</ThemedText>
              <ThemedText style={[styles.summaryAmount, { color: Colors.text }]}>
                {formatRupiah(currentBalance)}
              </ThemedText>
            </View>
            <View style={[styles.iconWrapper, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="wallet-outline" size={24} color="#2196F3" />
            </View>
          </View>

          <View style={styles.categoryCard}>
            <ThemedText style={styles.categoryTitle}>Kategori Populer</ThemedText>
            <ThemedText style={{color: Colors.textLight, marginBottom: 12}}>
               (Fitur kategori akan hadir segera)
            </ThemedText>
            <View style={styles.categoryIconsContainer}>
              <View style={styles.placeholderIcon}>
                <Ionicons name="fast-food-outline" size={24} color="#fff" />
              </View>
              <View style={[styles.placeholderIcon, {backgroundColor: '#E67E22'}]}>
                <Ionicons name="car-sport-outline" size={24} color="#fff" />
              </View>
              <View style={[styles.placeholderIcon, {backgroundColor: '#9B59B6'}]}>
                <Ionicons name="bag-handle-outline" size={24} color="#fff" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Pilih Periode Laporan</Text>
              
              <TouchableOpacity 
                style={[styles.modalOption, filterDuration === 'all' && styles.modalOptionActive]}
                onPress={() => handleSelectFilter('all')}
              >
                <Text style={[styles.modalOptionText, filterDuration === 'all' && styles.modalOptionTextActive]}>
                  Semua Waktu
                </Text>
                {filterDuration === 'all' && <Ionicons name="checkmark" size={20} color={Colors.primary} />}
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalOption, filterDuration === 'date' && styles.modalOptionActive]}
                onPress={() => handleSelectFilter('date')}
              >
                <Text style={[styles.modalOptionText, filterDuration === 'date' && styles.modalOptionTextActive]}>
                  Pilih Tanggal (Kalender)
                </Text>
                {filterDuration === 'date' && <Ionicons name="checkmark" size={20} color={Colors.primary} />}
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalOption, filterDuration === 'month' && styles.modalOptionActive]}
                onPress={() => handleSelectFilter('month')}
              >
                <Text style={[styles.modalOptionText, filterDuration === 'month' && styles.modalOptionTextActive]}>
                  Bulan Ini
                </Text>
                {filterDuration === 'month' && <Ionicons name="checkmark" size={20} color={Colors.primary} />}
              </TouchableOpacity>

               <TouchableOpacity 
                style={[styles.modalOption, filterDuration === 'year' && styles.modalOptionActive]}
                onPress={() => handleSelectFilter('year')}
              >
                <Text style={[styles.modalOptionText, filterDuration === 'year' && styles.modalOptionTextActive]}>
                  Tahun Ini
                </Text>
                {filterDuration === 'year' && <Ionicons name="checkmark" size={20} color={Colors.primary} />}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={filterDate}
          mode="date"
          display="default" 
          onChange={onChangeDate}
        />
      )}

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    backgroundColor: Colors.cardBg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.cardBg,
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
  dateFilter: {
    alignItems: 'flex-end',
    padding: 8, 
  },
  dateYear: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'right',
    fontFamily: 'Poppins_400Regular',
  },
  dateMonth: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'right',
    fontFamily: 'Poppins_600SemiBold',
  },
  scrollView: { flex: 1 },
  mainContent: { padding: 24 },
  summaryCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryTextContainer: { flex: 1 },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
    fontFamily: 'Poppins_400Regular',
  },
  summaryAmount: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  categoryCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.text,
    marginBottom: 8,
  },
  categoryIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  placeholderIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.text,
  },
  modalOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalOptionActive: {
    backgroundColor: '#F5F9FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 0,
  },
  modalOptionText: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'Poppins_400Regular',
  },
  modalOptionTextActive: {
    color: Colors.primary,
    fontFamily: 'Poppins_600SemiBold',
  },
  modalCloseButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    color: Colors.textLight,
    fontFamily: 'Poppins_500Medium',
  },
});