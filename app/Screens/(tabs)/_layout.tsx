import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF',
    
     }}>
      <Tabs.Screen name="Home" options={{ title: 'Home',headerShown:false ,

         tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
      }} />
      <Tabs.Screen name="Appointment" options={{ title: 'Appointments',headerShown:false ,
      tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),

       }} />
      <Tabs.Screen name="Profile" options={{ title: 'Profile',headerShown:false ,
  tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),

       }} />
    </Tabs>
  );
}
