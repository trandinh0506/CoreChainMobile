import { ProjectItem } from '@/declarations/projectItem';
import { useRouter } from 'expo-router';
import { View, Text, Image, Pressable } from 'react-native';

interface Props {
  item: ProjectItem;
}

export default function ProjectRenderItem({ item }: Props) {
  const router = useRouter();
  return (
    <Pressable
      className="bg-white dark:bg-gray-800 rounded-xl p-4 m-2 shadow-md"
      onPress={() => {
        // @ts-ignore
        router.push(`/project/${item._id}`);
      }}
    >
      {/* thumbnail & priority */}
      <View className="flex-row justify-between items-center mb-2">
        <Image
          source={{ uri: item.thumbnail }}
          className="w-16 h-16 rounded-lg"
        />
        <Text
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            item.priority === 'High Priority'
              ? 'bg-red-500 text-white'
              : item.priority === 'Medium Priority'
              ? 'bg-yellow-400 text-black'
              : 'bg-green-500 text-white'
          }`}
        >
          {item.priority}
        </Text>
      </View>

      {/* title & desc */}
      <View className="mb-2">
        <Text className="text-lg font-bold text-gray-900 dark:text-white">
          {item.title}
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-300">
          {item.description}
        </Text>
      </View>

      {/* team member & progress */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row">
          {item.teamMember.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              className="w-8 h-8 rounded-full -ml-1 border-2 border-white"
            />
          ))}
        </View>

        {/* custom progress bar */}
        <View className="w-2/3 ml-2 h-3 bg-gray-300 rounded-full overflow-hidden">
          <View
            className="bg-green-500 h-full"
            style={{ width: `${Math.floor(item.progress * 100)}%` }}
          />
        </View>
      </View>
    </Pressable>
  );
}
