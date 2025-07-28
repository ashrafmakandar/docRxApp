import { DoctorProps } from '@/app/Utils/DoctorProps';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Button,
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import CustomeButton from '../Components/CustomeButton';

const DoctorDetails = () => {
  const params = useLocalSearchParams();
  const doctor: DoctorProps = JSON.parse(params.doctor as string);

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // Fetch booked slots on date or doctor change
  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const stored = await AsyncStorage.getItem('appointments');
        const allAppointments = stored ? JSON.parse(stored) : [];

        const matching = allAppointments.filter(
          (appt: any) =>
            appt.doctorId === doctor.id &&
            appt.date === selectedDate.toDateString()
        );

        const takenSlots = matching.map((appt: any) => appt.slot);
        setBookedSlots(takenSlots);
      } catch (err) {
        console.error('Error fetching booked slots:', err);
      }
    };

    fetchBookedSlots();
  }, [selectedDate]);

  const availableSlots = doctor.appointments.filter(
    (slot) => !bookedSlots.includes(slot)
  );

  return (
    <SafeAreaView style={styles.safeArea}>

<TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
  <Ionicons name="arrow-back" size={24} color="black" />
</TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: doctor.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialization}>{doctor.specialization}</Text>
        <Text style={styles.location}>📍 {doctor.location}</Text>
        <Text style={styles.phone}>📞 {doctor.phone}</Text>
        <Text style={styles.description}>{doctor.description}</Text>
        <Text style={styles.rating}>⭐ {doctor.rating} ({doctor.reviews} reviews)</Text>

        <Text style={styles.appointmentTitle}>Available Slots for {selectedDate.toDateString()}:</Text>

        {availableSlots.length === 0 ? (
          <Text style={{ color: 'red', marginVertical: 10 }}>
            No available slots for the selected date.
          </Text>
        ) : (
          <FlatList
            data={availableSlots}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.slot,
                  selectedSlot === item && styles.selectedSlot,
                ]}
                onPress={() => {
                  setSelectedSlot(item);
                  setShowButton(true);
                }}
              >
                <Text style={{ color: selectedSlot === item ? '#fff' : '#000' }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}

        {showButton && (
          <View style={styles.appointmentWrapper}>
            <Button
              title="Pick Appointment Date"
              onPress={() => setShowDatePicker(true)}
            />

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={(event, date) => {
                  setShowDatePicker(Platform.OS === 'ios');
                  if (date) setSelectedDate(date);
                }}
              />
            )}

<CustomeButton

text='Confirm Appointment'
color='#28a745'
    onPress={async () => {
                const appointmentData = {
                  doctorId: doctor.id,
                  doctorName: doctor.name,
                  slot: selectedSlot,
                  date: selectedDate.toDateString(),
                   avatar: doctor.avatar,
                };

                try {
                  const existing = await AsyncStorage.getItem('appointments');
                  const appointments = existing ? JSON.parse(existing) : [];

                  appointments.push(appointmentData);

                  await AsyncStorage.setItem('appointments', JSON.stringify(appointments));

                  alert('Appointment saved!');
                  router.replace('/Screens/(tabs)/Appointment');
                } catch (error) {
                  console.error('Error saving appointment:', error);
                  alert('Failed to save appointment.');
                }
              }}
/>
   
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  specialization: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    marginVertical: 2,
  },
  phone: {
    fontSize: 14,
    marginVertical: 2,
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  rating: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  appointmentTitle: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  slot: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 100,
    alignItems: 'center',
  },
  selectedSlot: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  appointmentWrapper: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: '',
    padding: 12,
    borderRadius: 10,
  },
});
