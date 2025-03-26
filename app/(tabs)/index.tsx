import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function Index() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const router = useRouter();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔍 Checking auth...');
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
          console.warn('🚨 No token found. Redirecting to login...');
          router.replace('/auth/login');
          return;
        }

        console.log('🔑 Token found:', token);

        const response = await axios.get(`${apiUrl}/api/v1/auth/account`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (response.status !== 200 || !response.data?.data?.user) {
          console.warn('🚨 Invalid response. Redirecting to login...');
          router.replace('/auth/login');
          return;
        }
        console.log('user: ', response.data.data.user);
        setUser({ ...response.data.data.user, accessToken: token });
        console.log('✅ Auth success:', response.data);
      } catch (error) {
        console.error('❌ Error during auth check:', error);
        router.replace('/auth/login');
      } finally {
        setLoading(false); // Chỉ set loading khi xong tất cả
      }
    };

    checkAuth();
    console.log('📌 Local auth call triggered');
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
      </View>
    </SafeAreaView>
  );
}
