import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, Text, useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const netInfo = useNetInfo();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ flex: 1 }}>
      <SafeAreaProvider>
        {Platform.OS === 'ios' ? <StatusBar
          backgroundColor={colorScheme === "light" ? "#fff" : "#fff"}
          barStyle={colorScheme === "light" ? "dark-content" : "dark-content"}
        /> : null}
        
        {netInfo.isConnected ? (
          <>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </>
        ) : (
          <Text>İnternet Yok</Text>
        )}
      </SafeAreaProvider>
    </KeyboardAvoidingView>
  );
}
