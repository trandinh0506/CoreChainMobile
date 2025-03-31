import { useUser } from '@/context/UserContext';
import { useTheme } from '@/hooks/useTheme';

import { Text, View, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const { user } = useUser();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      className={`flex-1 p-5 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'
      }`}
    >
      {/* Avatar */}
      <Pressable
        className="items-start"
        onPress={() => console.log('Change avatar')}
      >
        <Image
          source={{ uri: 'https://picsum.photos/200' }}
          className="w-36 h-36 rounded-full"
        />
      </Pressable>

      {/* Username */}
      <Text
        className={`text-2xl font-bold mt-4 text-left ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}
      >
        {user?.name ?? 'Guest'}
      </Text>
    </SafeAreaView>
  );
}
