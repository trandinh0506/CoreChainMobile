import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { User } from '@/declarations/user';

export default function Index() {
  const { user, isUserLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  useEffect(() => {
    const checkAuth = async () => {
      if (!isUserLoaded) return;
      if (!user) {
        router.replace('/auth/login');
        return;
      }
      try {
        const response = await axios.get(`${apiUrl}/api/v1/auth/account`, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
          withCredentials: true,
        });
        console.log({ response });
      } catch (error) {
        console.error('auth error:', error);
        router.replace('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [user]);

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>hello {user?.name ?? 'world'}!</Text>
      </View>
    </SafeAreaView>
  );
}
