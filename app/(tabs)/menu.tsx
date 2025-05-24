import { useUser } from '@/context/UserContext';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { Text, View, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMessages } from '@/context/MessageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Menu() {
  const { user, setUser } = useUser();
  const { theme } = useTheme();
  const router = useRouter();
  const { clearMessages } = useMessages();

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const handleLogout = async () => {
    clearMessages();
    setUser(null);
    await AsyncStorage.clear();
    await axios.post(`${apiUrl}/api/v1/auth/logout`);
    router.replace('/auth/login');
  };
  return (
    <SafeAreaView
      className={`flex-1 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}
    >
      {/* user profile */}
      <Pressable
        onPress={() => {
          // @ts-ignore: Unreachable code error
          router.push('/profile');
        }}
      >
        <View
          className={`flex-row mx-2 my-4 mt-4 p-3 justify-left align-middle rounded-2xl shadow-md 
          ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          {/* avatar */}
          <Image
            source={{ uri: 'https://picsum.photos/200' }}
            className="w-12 h-12 rounded-full mr-2"
          />
          {/* user name */}
          <Text
            className={`text-4xl text-center ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            {user?.name}
          </Text>
        </View>
      </Pressable>
      {/* my contract */}
      <View className="w-full px-4 mb-4 shadow-md">
        {/* Logout Button */}
        <Pressable
          className={`px-4 py-3 rounded-2xl w-full max-w-md mx-auto text-center 
      ${
        theme === 'dark'
          ? 'bg-gray-800 active:bg-gray-900'
          : 'bg-white active:bg-gray-100'
      }`}
          onPress={() => console.log('Logout pressed')}
        >
          <Text
            className={`text-${
              theme === 'dark' ? 'white' : 'black'
            } text-lg font-bold text-center`}
          >
            View my contract
          </Text>
        </Pressable>
      </View>
      {/* feedback */}
      <View className="w-full px-4 mb-4 shadow-md">
        {/* Logout Button */}
        <Pressable
          className={`px-4 py-3 rounded-2xl w-full max-w-md mx-auto text-center 
      ${
        theme === 'dark'
          ? 'bg-gray-800 active:bg-gray-900'
          : 'bg-white active:bg-gray-100'
      }`}
          onPress={() => console.log('Logout pressed')}
        >
          <Text
            className={`text-${
              theme === 'dark' ? 'white' : 'black'
            } text-lg font-bold text-center`}
          >
            Send a feedback
          </Text>
        </Pressable>
      </View>
      {/* feedback */}
      <View className="w-full px-4 mb-4 shadow-md">
        {/* Logout Button */}
        <Pressable
          className={`px-4 py-3 rounded-2xl w-full max-w-md mx-auto text-center 
      ${
        theme === 'dark'
          ? 'bg-gray-800 active:bg-gray-900'
          : 'bg-white active:bg-gray-100'
      }`}
          onPress={() => console.log('Logout pressed')}
        >
          <Text
            className={`text-${
              theme === 'dark' ? 'white' : 'black'
            } text-lg font-bold text-center`}
          >
            Create salary advance request
          </Text>
        </Pressable>
      </View>
      {/* logout */}
      <View className="w-full px-4">
        {/* Logout Button */}
        <Pressable
          className={`px-4 py-3 rounded-2xl w-full max-w-md mx-auto text-center 
      ${
        theme === 'dark'
          ? 'bg-red-600 active:bg-red-700'
          : 'bg-red-500 active:bg-red-600'
      }`}
          onPress={handleLogout}
        >
          <Text className="text-white text-lg font-bold text-center">
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
