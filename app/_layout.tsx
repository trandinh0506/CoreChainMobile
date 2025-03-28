import { Stack } from 'expo-router';
import '../global.css';
import { UserProvider } from '@/context/UserContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { SocketProvider } from '@/context/SocketContext';
import { MessageProvider } from '@/context/MessageContext';
export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <SocketProvider>
          <MessageProvider>
            <Stack screenOptions={{ headerShown: false }}></Stack>
          </MessageProvider>
        </SocketProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
