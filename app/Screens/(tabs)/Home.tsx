import { DoctorProps } from '@/app/Utils/DoctorProps';
import doctors from '@/app/Utils/Doctors';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet, Text
} from 'react-native';
import DoctorCard from '../../Components/DoctorCard';

const { width } = Dimensions.get('window');

const Home = () => {
  const [doctorsList, setDoctorsList] = useState<DoctorProps[]>([]);

  useEffect(() => {
    setDoctorsList(doctors);
  }, []);

  const renderDoctorItem = ({ item }: { item: DoctorProps }) => (

    <DoctorCard
    item={item}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
    <Text style={styles.heading}>Top Rated Doctors Near You</Text>
      <FlatList
        data={doctorsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDoctorItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: '5%',
  },
  heading:{
      fontSize: 22,
  fontWeight: 'bold',
  marginVertical: 16,
  color: '#333',
  paddingHorizontal:"4%"
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  location: {
    fontSize: 13,
    color: '#888',
  },
  rating: {
    fontSize: 12,
    color: '#444',
    marginTop: 4,
  },
});
