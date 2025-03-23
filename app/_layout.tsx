import { Stack } from 'expo-router';
import '../global.css';
import { UserProvider } from '@/context/UserContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { SocketProvider } from '@/context/SocketContext';
export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <SocketProvider>
          <Stack screenOptions={{ headerShown: false }}></Stack>
        </SocketProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
