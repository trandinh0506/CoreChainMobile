import { View, Text } from 'react-native';
type props = {
  title: string;
  subtitle: string;
  value: number;
  bgColor: string;
};
function StatCard({ title, subtitle, value, bgColor }: props) {
  return (
    <View className={`rounded-2xl p-4 w-full mb-4 ${bgColor}`}>
      <Text className="text-white text-base font-semibold">{title}</Text>
      <Text className="text-white text-sm mb-2">{subtitle}</Text>
      <Text className="text-white text-4xl font-bold">{value}</Text>
    </View>
  );
}

export default StatCard;
