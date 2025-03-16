import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ConversationItem } from '@/declarations/conversationItem';
import ConversationRenderItem from './conversationItem';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/hooks/useTheme';
export default function Index() {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const { theme } = useTheme();
  useEffect(() => {
    setConversations([
      {
        id: 'conv-123',
        avatar: 'https://picsum.photos/200',
        name: 'Killan James',
        timestamp: '4:30 PM',
        latestMessage: 'Typing...',
        isTyping: true,
        unreadCount: 2,
      },
      {
        id: 'conv-12332',
        avatar: 'https://picsum.photos/200',
        name: 'Killan James',
        timestamp: '4:30 PM',
        latestMessage: 'Hello',
        isTyping: false,
        unreadCount: 2,
      },
      {
        id: 'conv-123312',
        avatar: 'https://picsum.photos/200',
        name: 'Killan James',
        timestamp: '4:30 PM',
        latestMessage: 'Typing...',
        isTyping: true,
        unreadCount: 2,
      },
    ]);
  }, []);

  return (
    <SafeAreaView
      className={`flex-1 pl-2 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
    >
      {/* header */}
      <View className="flex-row justify-between items-center px-4 relative">
        <Text
          className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          Messages
        </Text>
      </View>
      {/* search */}
      <View className="my-5 mx-3">
        <Searchbar placeholder="Search..." value="" style={{ height: 50 }} />
      </View>
      {conversations?.length !== 0 ? (
        <>
          <ConversationRenderItem data={conversations[0]} />
          <View>
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <FlatList
                data={conversations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ConversationRenderItem data={item} />
                )}
              />
            </Animated.View>
          </View>
        </>
      ) : (
        <View>
          <Text>No more conversations here!</Text>
        </View>
      )}
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}
