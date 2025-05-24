import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { ProjectItem } from '@/declarations/projectItem';
import { Task } from '@/declarations/task';
import { useUser } from '@/context/UserContext';

export default function ProjectDetail() {
  const { id } = useLocalSearchParams();
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
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
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/projects/${id}`, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
          withCredentials: true,
        });
        console.log('res:', res.data.data);
        setProject(res.data.data);
      } catch (err) {
        console.error('Failed to fetch project:', err);
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/tasks?projectId=${id}`, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
          withCredentials: true,
        });
        console.log('task', res.data.data.result);
        setTasks(res.data.data.result as Task[]);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };

    fetchProject();
    fetchTasks();
  }, [id]);

  if (!project) {
    return (
      <SafeAreaView>
        <Text>Loading project...</Text>
      </SafeAreaView>
    );
  }

  const statusLabel =
    ['Not started', 'In progress', 'Completed'][project.status] ?? 'Unknown';
  const priorityLabel =
    ['Low', 'Medium', 'High', 'Critical'][project.priority] ?? 'Unknown';

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView className="p-4">
        {project.attachments[0] && (
          <Image
            source={{ uri: project.attachments[0] }}
            className="w-full h-48 rounded-xl mb-4"
          />
        )}

        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {project.name}
        </Text>
        <Text className="text-gray-700 dark:text-gray-300 mb-2">
          {project.description}
        </Text>

        <Text className="text-sm text-gray-600 dark:text-gray-400">
          Department: {project.department}
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-400">
          Manager: {project.manager}
        </Text>

        <Text className="mt-2 text-sm text-blue-500">
          Status: {statusLabel}
        </Text>
        <Text className="text-sm text-orange-500">
          Priority: {priorityLabel}
        </Text>
        <Text className="text-sm text-green-600">
          Revenue: ${project.revenue.toLocaleString()}
        </Text>

        <Text className="mt-4 font-semibold text-lg text-gray-800 dark:text-white">
          Team Members:
        </Text>
        {project.teamMembers.map((m) => (
          <Text
            key={m._id}
            className="text-sm text-gray-600 dark:text-gray-300 ml-2"
          >
            - {m.name}
          </Text>
        ))}

        <Text className="mt-6 font-semibold text-lg text-gray-800 dark:text-white">
          Tasks:
        </Text>
        {tasks.map((task) => (
          <View
            key={task._id}
            className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <Text className="font-semibold text-gray-900 dark:text-white">
              {task.title}
            </Text>
            <Text className="text-sm text-gray-700 dark:text-gray-300">
              {task.description}
            </Text>
            <Text className="text-xs text-gray-500 mt-1">
              Due: {new Date(task.dueDate).toDateString()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
