import { SafeAreaView } from 'react-native-safe-area-context';
import { ProjectItem } from '@/declarations/projectItem';
import { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import ProjectRenderItem from './projectItem';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';

export default function Project() {
  const [data, setData] = useState<ProjectItem[]>([]);
  const { user, isUserLoaded } = useUser();
  const router = useRouter();

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    if (!isUserLoaded) return;
    if (!user) {
      router.replace('/auth/login');
      return;
    }
  }, [user, isUserLoaded]);

  useEffect(() => {
    if (!user) return;

    const getProjects = async () => {
      const responseProject = await axios.get(`${apiUrl}/api/v1/projects`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
        withCredentials: true,
      });
      console.log('project data:', responseProject.data.data.projects);
      setData(responseProject.data.data.projects as ProjectItem[]);
    };
    getProjects();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="flex-row justify-between items-center px-4 relative my-3">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Project
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ProjectRenderItem item={item} />}
      />
    </SafeAreaView>
  );
}
