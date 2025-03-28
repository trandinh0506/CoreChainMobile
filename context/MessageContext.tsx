// MessageContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from '@/declarations/message';

// For storing messages by conversation ID
type MessagesByConversation = {
  [conversationId: string]: Message[];
};

interface MessageContextValue {
  messages: MessagesByConversation;
  addMessage: (message: Message) => void;
  saveConversation: (conversationId: string, messages: Message[]) => void; // ✅ Thêm hàm mới
  loadMessages: () => Promise<void>;
  clearMessages: () => Promise<void>;
}

const MessageContext = createContext<MessageContextValue | undefined>(
  undefined
);

// Storage key for AsyncStorage
const STORAGE_KEY = 'messages';

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<MessagesByConversation>({});

  /**
   * Load messages from AsyncStorage into state.
   */
  const loadMessages = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setMessages(parsed);
      }
    } catch (error) {
      console.error('Failed to load messages from storage', error);
    }
  }, []);

  /**
   * Save the current state of messages to AsyncStorage.
   */
  const saveMessages = useCallback(
    async (newMessages: MessagesByConversation) => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
      } catch (error) {
        console.error('Failed to save messages to storage', error);
      }
    },
    []
  );

  /**
   * Add a new message to the appropriate conversation array.
   */
  const addMessage = useCallback(
    (message: Message) => {
      setMessages((prev) => {
        const conversationMessages = prev[message.conversationId] || [];
        const updated = {
          ...prev,
          [message.conversationId]: [message, ...conversationMessages],
        };
        // Save to AsyncStorage
        saveMessages(updated);
        return updated;
      });
    },
    [saveMessages]
  );
  // save messages in convsersation from server
  const saveConversation = useCallback(
    (conversationId: string, newMessages: Message[]) => {
      setMessages((prev) => {
        const updated = { ...prev, [conversationId]: newMessages };
        saveMessages(updated);
        return updated;
      });
    },
    [saveMessages]
  );
  /**
   * Clear all messages (for debugging, logout, etc.).
   */
  const clearMessages = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setMessages({});
    } catch (error) {
      console.error('Failed to clear messages', error);
    }
  }, []);

  /**
   * Load messages from AsyncStorage on mount.
   */
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const value: MessageContextValue = {
    messages,
    addMessage,
    loadMessages,
    saveConversation,
    clearMessages,
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

/**
 * Custom hook to consume the MessageContext.
 */
export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
