import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useSegments } from 'expo-router';

export default function TabBar() {
  const router = useRouter();
  const segments = useSegments();

  // Hàm kiểm tra tab đang active dựa trên segments
  const isActive = (routeName: string) => {
    // Nếu đang ở route chính của group, segments[0] sẽ là undefined hoặc rỗng
    // Bạn có thể tinh chỉnh theo cấu trúc của bạn.
    console.log(segments);
    return segments[0] === routeName || (!segments[0] && routeName === 'home');
  };

  return (
    <View className="h-16 flex-row bg-gray-800 items-center justify-around">
      {/* Home */}
      <TouchableOpacity onPress={() => router.push('/(tabs)')}>
        <Ionicons
          name="home"
          size={24}
          color={isActive('home') ? 'yellow' : 'white'}
        />
        <Text
          className={
            isActive('home') ? 'text-yellow-300 text-xs' : 'text-white text-xs'
          }
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Chat - danh sách chat */}
      <TouchableOpacity onPress={() => router.push('/(tabs)/chat')}>
        <Ionicons
          name="chatbubbles"
          size={24}
          color={isActive('chat') ? 'yellow' : 'white'}
        />
        <Text
          className={
            isActive('chat') ? 'text-yellow-300 text-xs' : 'text-white text-xs'
          }
        >
          Chat
        </Text>
      </TouchableOpacity>

      {/* Settings */}
      <TouchableOpacity onPress={() => router.push('/(tabs)/settings')}>
        <Ionicons
          name="settings"
          size={24}
          color={isActive('settings') ? 'yellow' : 'white'}
        />
        <Text
          className={
            isActive('settings')
              ? 'text-yellow-300 text-xs'
              : 'text-white text-xs'
          }
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}
