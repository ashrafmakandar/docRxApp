import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack  screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="Splash" options={{ headerShown: false }} />
      <Stack.Screen name="Screens/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ title: "Login" }} />
      <Stack.Screen name="Screens/SignUp" options={{ title: "Sign Up" }} />
      <Stack.Screen name="DoctorsList" options={{ title: "Doctors" }} />
      <Stack.Screen name="Appointment" options={{ title: "Book Appointment" }} />
    </Stack>
  );
}
