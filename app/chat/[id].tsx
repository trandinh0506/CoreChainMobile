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
import io, { Socket } from 'socket.io-client';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useSocket } from '@/context/SocketContext';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [content, setContent] = useState('');
  // const [socket, setSocket] =
  //   useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const socket: Socket | null = useSocket('/chat');

  useEffect(() => {
    if (!socket) {
      return;
    }
    // const newSocket = io('http://192.168.88.206:3001/chat');
    socket.on('connect', () => {
      console.log('connected');
    });
    // socket.emit(
    //   'getConversationByUserIdAndOtherId',
    //   {
    //     userId: '67de08c7566eaca13ea2874f',
    //     otherId: '67de2f8bce28bf57cc92dd1e',
    //   },
    //   (val: any) => {
    //     console.log('got conversation', val);
    //   }
    // );
    socket.emit(
      'sendMessage',
      {
        conversationId: '67de1d4b6e62ff32e8817d0a',
        senderId: '67de08c7566eaca13ea2874f',
        content: 'hello world',
      },
      (val: any) => {
        console.log('acknowledgement from server', val);
      }
    );
    // return () => {
    //   newSocket.close();
    // };
  }, []);

  return (
    <SafeAreaView
      className={`flex-1 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-3 py-2">
        {/* Back & User Name */}
        <View className="flex-row items-center">
          <Pressable className="p-3" onPress={() => router.push('/')}>
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
      <ScrollView className="flex-1 px-3">
        <Text className={theme === 'dark' ? 'text-white' : 'text-black'}>
          Hello world
        </Text>
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
            <Pressable className="p-1">
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
