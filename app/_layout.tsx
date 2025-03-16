import { Stack } from 'expo-router';
import { ThemeProvider } from '@/context/ThemeContext';
import '../global.css';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="chat/[id]" />
      </Stack>
    </ThemeProvider>
  );
}
