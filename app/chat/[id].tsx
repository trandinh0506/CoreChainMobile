import { useTheme } from '@/hooks/useTheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useSocket } from '@/context/SocketContext';
import { useUser } from '@/context/UserContext';
import { Message } from '@/declarations/message';

interface Props {
  data: Message[];
}
export default function ChatScreen({ data }: Props) {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [content, setContent] = useState('');
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>(data);
  const socket: Socket | null = useSocket('/chat');

  const handleSendMessage = () => {
    if (!content) return;
    socket?.emit(
      'sendMessage',
      {
        conversationId: id as string,
        senderId: user._id,
        content,
      },
      (val: any) => {
        console.log('acknowledgement from server', val);
        setContent('');
      }
    );
  };
  useEffect(() => {
    console.log('new message on');
    socket?.on('newMessage', (msg: Message) => {
      setMessages((prev) => [msg, ...prev]);
    });
    return () => {
      socket?.off('newMessage');
    };
  }, []);
  return (
    <SafeAreaView
      className={`flex-1 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-3 py-2">
        {/* Back & User Name */}
        <View className="flex-row items-center">
          <Pressable className="p-3" onPress={() => router.replace('/chat')}>
            <Ionicons name="arrow-back-sharp" size={28} color="blue" />
          </Pressable>
          <Text
            className={`text-2xl ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            user name
          </Text>
        </View>

        {/* Info Icon */}
        <Pressable className="p-3">
          <MaterialIcons name="info" size={28} color="blue" />
        </Pressable>
      </View>
      {/* chat content */}
      <ScrollView className="flex-1 p-3">
        {messages.map((message) => {
          const isSent = message.senderId === user._id;
          return (
            <View
              key={message._id}
              className={`mb-2 max-w-[80%] p-3 rounded-lg ${
                isSent ? 'bg-green-200 self-end' : 'bg-white self-start'
              }`}
            >
              <Text
                className={`text-base ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                {message.content}
              </Text>
              <Text className="text-xs text-gray-500 mt-1 self-end">
                {new Date(message.createdAt).toLocaleTimeString()}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      {/* Footer Chat */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View
          className={`absolute bottom-0 left-0 right-0 flex-row items-center ${
            theme === 'dark' ? 'bg-black' : 'bg-white'
          }`}
        >
          {isInputFocused ? (
            <Pressable className="p-1">
              <SimpleLineIcons name="arrow-right" size={24} color="blue" />
            </Pressable>
          ) : (
            <>
              <Pressable className="p-2">
                <Ionicons name="add-circle" size={24} color="blue" />
              </Pressable>
              <Pressable className="p-2">
                <Entypo name="camera" size={24} color="blue" />
              </Pressable>
              <Pressable className="p-2">
                <MaterialIcons name="image" size={24} color="blue" />
              </Pressable>
              <Pressable className="p-2">
                <FontAwesome name="microphone" size={24} color="blue" />
              </Pressable>
            </>
          )}

          <View
            className={`flex-1 mx-2 rounded-full flex-row items-center px-3 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            <TextInput
              placeholder="Nhập tin nhắn..."
              placeholderTextColor={`${theme === 'dark' ? 'white' : 'gray'}`}
              className={`flex-1 py-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              value={content}
              onChangeText={setContent}
            />
          </View>
          {content ? (
            <Pressable onPress={handleSendMessage} className="p-1">
              <Ionicons name="send" size={24} color="blue" />
            </Pressable>
          ) : (
            <Pressable className="p-1">
              <FontAwesome name="thumbs-up" size={28} color="blue" />
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
