import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { TextInput } from 'react-native-paper';

export default function Index() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      console.log({ token });
      if (!token) {
        setLoading(false);
        router.replace('/auth/login');
      }
      if (token) {
        // call api to check valid token
        setLoading(false);
      }
    };
    checkAuth();
    console.log('local auth call');
  }, [router]);
  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }
  console.log({ user });
  return (
    <SafeAreaView>
      <View>
        <Text>hello {user?.name ?? 'world'}!</Text>
        <TextInput value={text} onChangeText={setText} />
      </View>
    </SafeAreaView>
  );
}
