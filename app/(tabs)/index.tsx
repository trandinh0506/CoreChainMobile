import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@/context/UserContext';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import StatCard from '@/components/StatCard';

type Greeting = {
  label: string;
  icon: JSX.Element;
};

export default function Index() {
  const { user, isUserLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [totalProject, setTotalProject] = useState<number | null>(null);
  const [totalTask, setTotalTask] = useState<number | null>(null);
  const [greeting, setGreeting] = useState<Greeting | null>(null);
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
  }, [user, isUserLoaded]);

  useEffect(() => {
    if (!user) return;
    const test = async () => {
      const responseProject = await axios.get(`${apiUrl}/api/v1/projects`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
        withCredentials: true,
      });
      setTotalProject(responseProject.data.data.meta.total);
      const responseTask = await axios.get(`${apiUrl}/api/v1/tasks`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
        withCredentials: true,
      });
      setTotalTask(responseTask.data.data.meta.total);
    };
    test();
  }, []);

  // Greeting logic
  useEffect(() => {
    const getGreeting = (): Greeting => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        return {
          label: 'Morning',
          icon: <Ionicons name="sunny-outline" size={36} color="orange" />,
        };
      } else if (hour >= 12 && hour < 18) {
        return {
          label: 'Afternoon',
          icon: <Ionicons name="partly-sunny-outline" size={36} color="gold" />,
        };
      } else {
        return {
          label: 'Evening',
          icon: <Ionicons name="cloudy-night-outline" size={36} color="gray" />,
        };
      }
    };

    setGreeting(getGreeting());
  }, []);

  const getFormattedDate = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View className="flex-row items-center p-4">
        {greeting?.icon}
        <Text className="ml-2 text-lg font-medium">
          Good {greeting?.label}, {user?.name ?? 'there'}!
        </Text>
      </View>
      <View className="py-3">
        <Text className="text-2xl text-gray-500 px-4">{getFormattedDate}</Text>
      </View>
      <View className="py-3">
        <View className="px-4">
          <StatCard
            title="Total Projects"
            subtitle="Active projects in the system"
            value={totalProject ?? 0}
            bgColor="bg-purple-400"
          />
          <StatCard
            title="Total Tasks"
            subtitle="Tasks across all projects"
            value={totalTask ?? 0}
            bgColor="bg-gray-400"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
