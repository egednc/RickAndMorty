import Dropdown from '@/components/dropdown/Dropdown';
import { Image, Platform, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Dropdown />
      
       </View>
    </SafeAreaView>
  );
}


