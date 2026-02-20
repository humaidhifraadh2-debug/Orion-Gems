import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string) => {
        // Mock login
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            firstName: 'Isabella',
            lastName: 'Ross',
            email: email,
          },
        });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'orion-auth-storage',
    }
  )
);
