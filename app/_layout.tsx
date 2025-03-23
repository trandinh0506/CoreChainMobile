import { Stack } from 'expo-router';
import { ThemeProvider } from '@/context/ThemeContext';
import '../global.css';
import { SocketProvider } from '@/context/SocketContext';

export default function RootLayout() {
  return (
    <SocketProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="chat/[id]" />
        </Stack>
      </ThemeProvider>
    </SocketProvider>
  );
}
