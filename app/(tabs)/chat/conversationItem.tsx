import { View, Text, Image, Pressable } from 'react-native';
import { ConversationItem } from '@/declarations/conversationItem';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Message } from '@/declarations/message';
interface ConversationItemProps {
  data: ConversationItem;
}

export default function ConversationRenderItem({
  data,
}: ConversationItemProps) {
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <Pressable
      className={`p-4 flex-row items-center`}
      android_ripple={{ color: '#gray' }} // android ripple effect
      style={({ pressed }) => [
        { backgroundColor: pressed ? 'gray' : 'white' }, // change color when pressed
      ]}
      onPress={() =>
        router.push({
          pathname: '/chat/[id]',
          params: { id: data.id, chatName: data.name },
        })
      }
    >
      {/* Avatar */}
      <Image source={{ uri: data.avatar }} className="w-12 h-12 rounded-full" />

      {/* conversation infor */}
      <View className="flex-1 ml-3">
        <Text
          className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          {data.name}
        </Text>
        <Text
          className={`text-sm ${
            data.isTyping ? 'text-green-500' : 'text-gray-500'
          }`}
        >
          {data.isTyping ? 'Typing...' : data.latestMessage}
        </Text>
      </View>

      {/* timestamp and unread message */}
      <View className="items-end">
        <Text className="text-xs text-gray-400">{data.timestamp}</Text>
        {data.unreadCount > 0 && (
          <View className="bg-red-500 rounded-full w-5 h-5 items-center justify-center">
            <Text className="text-white text-xs">{data.unreadCount}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
