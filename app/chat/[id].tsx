import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useSocket } from '@/context/SocketContext';
import { useUser } from '@/context/UserContext';
import { useMessages } from '@/context/MessageContext';
import { useTheme } from '@/hooks/useTheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Message } from '@/declarations/message';

export default function ChatScreen() {
  const { id, chatName } = useLocalSearchParams<{
    id: string;
    chatName?: string;
  }>();
  const router = useRouter();
  const { theme } = useTheme();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [content, setContent] = useState('');
  const { user } = useUser();
  if (!user) {
    router.replace('/auth/login');
    return;
  }
  const { messages, addMessage, loadMessages, saveConversation } =
    useMessages();
  const socket = useSocket('/chat');

  // Load messages from storage on mount
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // If no messages for current conversation, emit event to load messages from server
  useEffect(() => {
    if (!id) return;
    if (!messages[id]) {
      socket?.emit('getMessages', { conversationId: id }, (data: Message[]) => {
        saveConversation(id, data);
      });
    }
  }, [id, messages, socket, saveConversation]);

  // Listen for new messages from server and update context
  useEffect(() => {
    const handleNewMessage = (msg: Message) => {
      if (msg.conversationId === id) {
        addMessage(msg);
      }
    };

    socket?.on('newMessage', handleNewMessage);
    return () => {
      socket?.off('newMessage', handleNewMessage);
    };
  }, [socket, id, addMessage]);

  // Retrieve messages for current conversation
  const conversationMessages: Message[] = messages[id] || [];

  const handleSendMessage = () => {
    if (!content) return;
    socket?.emit(
      'sendMessage',
      {
        conversationId: id,
        senderId: user._id,
        content,
      },
      (ack: Message) => {
        addMessage(ack);
        setContent('');
      }
    );
  };

  return (
    <SafeAreaView
      className={`flex-1 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-3 py-2">
        <View className="flex-row items-center">
          <Pressable className="p-3" onPress={() => router.replace('/chat')}>
            <Ionicons name="arrow-back-sharp" size={28} color="blue" />
          </Pressable>
          <Text
            className={`text-2xl ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            {chatName}
          </Text>
        </View>
        <Pressable className="p-3">
          <MaterialIcons name="info" size={28} color="blue" />
        </Pressable>
      </View>

      {/* Chat Content */}
      <View style={{ flex: 1, padding: 12, paddingBottom: 80 }}>
        <FlatList
          data={conversationMessages.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const isSent = item.senderId === user._id;
            return (
              <View
                style={{
                  marginBottom: 8,
                  maxWidth: '80%',
                  padding: 12,
                  borderRadius: 8,
                  alignSelf: isSent ? 'flex-end' : 'flex-start',
                  backgroundColor:
                    theme === 'dark'
                      ? isSent
                        ? '#2F855A'
                        : '#2D3748'
                      : isSent
                      ? '#A0EED0'
                      : '#FFFFFF',
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: theme === 'dark' ? 'white' : 'black',
                  }}
                >
                  {item.content}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'gray',
                    marginTop: 4,
                    alignSelf: 'flex-end',
                  }}
                >
                  {new Date(item.createdAt).toLocaleTimeString()}
                </Text>
              </View>
            );
          }}
          inverted
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        />
      </View>

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
              placeholderTextColor={theme === 'dark' ? 'white' : 'gray'}
              style={{
                flex: 1,
                paddingVertical: 8,
                color: theme === 'dark' ? 'white' : 'black',
              }}
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
