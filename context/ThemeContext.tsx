import { createContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Định nghĩa type cho context
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Tạo context với giá trị mặc định
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemTheme = useColorScheme() as 'light' | 'dark'; // Chỉ nhận "light" | "dark"
  const [theme, setTheme] = useState<'light' | 'dark'>(systemTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
