import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useUser } from '@/context/UserContext';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();

  async function handleLogin() {
    try {
      // Gọi API đăng nhập
      const res = await fetch('http://192.168.88.206:3001/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // gửi kèm cookie (nếu server set httpOnly cookie)
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) {
        // Xử lý lỗi (hiển thị toast, alert, ...)
        return;
      }

      const data = (await res.json()).data;
      console.log(data);
      // data.accessToken, data.user, ...
      if (data.access_token) {
        await AsyncStorage.setItem('accessToken', data.access_token);
        setUser({ ...data.user, accessToken: data.access_token });
        router.replace('/');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
      {/* Khung Login */}
      <View className="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <Text className="text-3xl font-bold text-center text-gray-700 dark:text-white">
          LOGIN
        </Text>

        {/* Email */}
        <View className="mt-6">
          <Text className="text-gray-700 dark:text-gray-200">Email</Text>
          <TextInput
            className="mt-2 border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        {/* Password */}
        <View className="mt-4">
          <Text className="text-gray-700 dark:text-gray-200">Password</Text>
          <TextInput
            className="mt-2 border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
        </View>

        {/* Nút LOGIN */}
        <TouchableOpacity
          onPress={handleLogin}
          className="mt-6 bg-purple-500 py-3 rounded-md active:bg-purple-600"
        >
          <Text className="text-white text-center text-lg font-semibold">
            LOGIN
          </Text>
        </TouchableOpacity>

        {/* Link Register */}
        <Text className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{' '}
          <Text
            className="text-purple-500 dark:text-purple-400 font-medium"
            onPress={() => router.push('/')}
          >
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
}
