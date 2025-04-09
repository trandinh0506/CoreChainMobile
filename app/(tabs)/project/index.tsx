import { SafeAreaView } from 'react-native-safe-area-context';
import { ProjectItem } from '@/declarations/projectItem';
import { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import ProjectRenderItem from './projectItem';

const MockData: ProjectItem[] = [
  {
    _id: '1',
    thumbnail: 'https://picsum.photos/200',
    title: 'Project 1',
    description: 'This is a cool project',
    teamMember: ['https://picsum.photos/200', 'https://picsum.photos/200'],
    priority: 'High Priority',
    progress: 0.7,
  },
  {
    _id: '2',
    thumbnail: 'https://picsum.photos/200',
    title: 'Project 2',
    description: 'Another awesome one',
    teamMember: ['https://picsum.photos/200', 'https://picsum.photos/200'],
    priority: 'Medium Priority',
    progress: 0.3,
  },
  {
    _id: '3',
    thumbnail: 'https://picsum.photos/200',
    title: 'Project 3',
    description: 'Another awesome one',
    teamMember: ['https://picsum.photos/200', 'https://picsum.photos/200'],
    priority: 'Medium Priority',
    progress: 0.3,
  },
  {
    _id: '4',
    thumbnail: 'https://picsum.photos/200',
    title: 'Project 4',
    description: 'Another awesome one',
    teamMember: ['https://picsum.photos/200', 'https://picsum.photos/200'],
    priority: 'Medium Priority',
    progress: 0.3,
  },
];

export default function Project() {
  const [data, setData] = useState<ProjectItem[]>([]);

  useEffect(() => {
    setData(MockData);
  }, []);
  console.log(data);
  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="flex-row justify-between items-center px-4 relative my-3">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white">
          Project
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ProjectRenderItem item={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
}
