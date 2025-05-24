import { ProjectItem } from '@/declarations/projectItem';
import { useRouter } from 'expo-router';
import { View, Text, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'date-fns';

interface Props {
  item: ProjectItem;
}

export default function ProjectRenderItem({ item }: Props) {
  const router = useRouter();

  const cover = item.attachments?.[0];

  const formattedRevenue = `$${item.revenue.toLocaleString()}`;
  const formattedDates = `${format(
    new Date(item.startDate),
    'MMM dd'
  )} → ${format(new Date(item.endDate), 'MMM dd, yyyy')}`;

  const statusLabel =
    ['Not started', 'In progress', 'Completed'][item.status] ?? 'Unknown';
  const priorityLabel =
    ['Low', 'Medium', 'High', 'Critical'][item.priority] ?? 'Unknown';

  return (
    <Pressable
      className="rounded-xl m-2 overflow-hidden shadow-md"
      onPress={() => {
        router.push(`/project/${item._id}`);
      }}
    >
      <LinearGradient
        colors={['#ffffff', '#f0f0f0']}
        className="p-4 dark:bg-gray-800"
      >
        {/* Cover Image */}
        {cover && (
          <Image
            source={{ uri: cover }}
            className="w-full h-40 rounded-lg mb-4"
            resizeMode="cover"
          />
        )}

        {/* Title + Description */}
        <Text className="text-lg font-bold text-gray-800 dark:text-white mb-1">
          {item.name}
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {item.description}
        </Text>

        {/* Dates */}
        <Text className="text-xs text-gray-500 mb-1">{formattedDates}</Text>

        {/* Revenue, Priority & Status */}
        <View className="flex-row justify-between items-center mt-2 flex-wrap">
          <Text className="text-sm font-semibold text-green-600">
            Revenue: {formattedRevenue}
          </Text>
          <Text className="text-sm font-semibold text-orange-500">
            Priority: {priorityLabel}
          </Text>
          <Text className="text-sm font-semibold text-blue-500">
            Status: {statusLabel}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
