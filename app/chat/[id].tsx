import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView>
      {/* header */}
      <View></View>
      <View>
        <Text>hello world</Text>
      </View>
    </SafeAreaView>
  );
}
