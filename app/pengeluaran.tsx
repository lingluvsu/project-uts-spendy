import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Pengeluaran = {
  id: number;
  kategori: string;
  deskripsi: string;
  jumlah: number;
  tanggal: string;
};

export default function PengeluaranListScreen() {
  const [data, setData] = useState<Pengeluaran[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.0.2.2:3000/pengeluaran')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.kategori}>{item.kategori}</Text>
            <Text style={styles.deskripsi}>{item.deskripsi}</Text>
            <Text style={styles.jumlah}>Rp {item.jumlah.toLocaleString()}</Text>
            <Text style={styles.tanggal}>{item.tanggal}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  kategori: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deskripsi: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  jumlah: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6,
  },
  tanggal: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});
