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

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      className={`flex-1 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-3 py-2">
        {/* Back & User Name */}
        <View className="flex-row items-center">
          <Pressable className="p-3" onPress={() => router.back()}>
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

      {/* Nội dung chat */}
      <ScrollView className="flex-1 px-3">
        <Text className={theme === 'dark' ? 'text-white' : 'text-black'}>
          Hello world
        </Text>
      </ScrollView>

      {/* Footer Chat */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="absolute bottom-0 left-0 right-0 bg-black px-3 py-2 flex-row items-center">
          {/* Icon thêm */}
          <Pressable className="p-2">
            <Ionicons name="add-circle" size={24} color="blue" />
          </Pressable>

          {/* Icon camera */}
          <Pressable className="p-2">
            <Entypo name="camera" size={24} color="blue" />
          </Pressable>

          {/* Icon hình ảnh */}
          <Pressable className="p-2">
            <MaterialIcons name="image" size={24} color="blue" />
          </Pressable>

          {/* Icon micro */}
          <Pressable className="p-2">
            <FontAwesome name="microphone" size={24} color="blue" />
          </Pressable>

          {/* Ô nhập tin nhắn */}
          <View className="flex-1 mx-2 bg-gray-700 rounded-full flex-row items-center px-3">
            <TextInput
              placeholder="Nhắn tin"
              placeholderTextColor="white"
              className="flex-1 text-white py-2"
            />
            <Pressable>
              <Ionicons name="happy" size={24} color="blue" />
            </Pressable>
          </View>

          {/* Icon like */}
          <Pressable className="p-2">
            <FontAwesome name="thumbs-up" size={28} color="blue" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
