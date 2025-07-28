import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Appointment {
  doctorId: number;
  doctorName: string;
  date: string;
  slot: string;
  avatar: string;
}

const MyAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const loadAppointments = async () => {
      const data = await AsyncStorage.getItem('appointments');
      if (data) {
        setAppointments(JSON.parse(data));
      }
    };

    const unsubscribe = loadAppointments();
    return () => unsubscribe;
  }, []);

  const renderItem = ({ item }: { item: Appointment }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={styles.doctor}>{item.doctorName}</Text>
        <Text style={styles.detail}>📅 {item.date}</Text>
        <Text style={styles.detail}>⏰ {item.slot}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Appointments</Text>
      {appointments.length === 0 ? (
        <Text style={styles.empty}>No appointments booked yet.</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default MyAppointments;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  empty: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 100,
  },
  avatar: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
  },
});
