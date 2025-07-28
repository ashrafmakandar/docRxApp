import { DoctorProps } from '@/app/Utils/DoctorProps';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  item: DoctorProps;
}

const DoctorCard: React.FC<Props> = ({ item }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/Screens/DoctorDetails",
      params: { doctor: JSON.stringify(item) }, // pass serialized object
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.specialization}>{item.specialization}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.rating}>⭐ {item.rating} ({item.reviews} reviews)</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
