import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import tw from 'twrnc';

export default function TabsLayout() {
  const { theme } = useTheme();
  const tabBarBackgroundStyle =
    theme === 'dark' ? tw`bg-gray-900` : tw`bg-white`;
  return (
    <Tabs
      screenOptions={{
        // Kết hợp style object từ Tailwind với object bổ sung (nếu cần)
        tabBarStyle: [
          tabBarBackgroundStyle,
          {
            // Ví dụ bỏ border top default
            borderTopWidth: 0,
          },
        ],
        // Màu chữ icon active/inactive
        tabBarActiveTintColor: '#facc15', // Vàng
        tabBarInactiveTintColor: theme === 'dark' ? '#fff' : '#000',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
