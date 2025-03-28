import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { User } from '@/declarations/user';

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  saveUser: (user: User | null) => Promise<void>;
};

const UserKey = 'user';

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Hàm lưu user vào AsyncStorage
  const saveUser = async (newUser: User | null) => {
    try {
      if (newUser) {
        await AsyncStorage.setItem(UserKey, JSON.stringify(newUser));
      } else {
        await AsyncStorage.removeItem(UserKey);
      }
      setUser(newUser);
    } catch (error) {
      console.error('Lỗi khi lưu user:', error);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem(UserKey);
        if (userData) {
          const parsedUser: User = JSON.parse(userData);
          setUser(parsedUser);
        } else {
          router.replace('/auth/login');
        }
      } catch (error) {
        console.error('Lỗi khi load user:', error);
        router.replace('/auth/login');
      }
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, saveUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export default UserContext;
