// ./context/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

/**
 * Kiểu dữ liệu UserContext
 */
type UserContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

/**
 * Tạo Context
 */
const UserContext = createContext<UserContextType>({} as UserContextType);

/**
 * Provider bọc toàn bộ ứng dụng
 */
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export default UserContext;
