import {
  useState,
  useEffect,
  type ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext, type User } from './authContext';
import {
  useCheckLoggedIn,
  useLogin,
  useLogout,
  useRegister,
} from '../api/authApi';
import type { Registration } from '../types/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  // Check if user is logged in on mount
  const { data: loggedInUser, isLoading, error } = useCheckLoggedIn();

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const isLoggingIn = loginMutation.isPending;
  const isRegistering = registerMutation.isPending;

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && loggedInUser) {
      setUser(loggedInUser);
    } else if (error) {
      localStorage.removeItem('access_token');
      setUser(null);
    }
  }, [loggedInUser, error]);

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      try {
        const response = await loginMutation.mutateAsync({
          username,
          password,
        });
        localStorage.setItem('access_token', response.token);
        setUser(response.user);
        return true;
      } catch (error) {
        console.error('Login failed:', error);
        return false;
      }
    },
    [loginMutation],
  );

  const register = useCallback(
    async (registration: Registration): Promise<boolean> => {
      try {
        const response = await registerMutation.mutateAsync(registration);
        localStorage.setItem('access_token', response.token);
        setUser(response.user);
        return true;
      } catch (error) {
        console.error('Registration failed:', error);
        return false;
      }
    },
    [registerMutation],
  );

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    setUser(null);
    logoutMutation.mutate();
  }, [logoutMutation]);

  const isLoginPage = location.pathname === '/login';
  const isAuthenticated = !!user;

  const contextValue = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      isAuthenticated,
      isLoading,
      isLoggingIn,
      isRegistering,
    }),
    [
      user,
      login,
      register,
      logout,
      isAuthenticated,
      isLoading,
      isLoggingIn,
      isRegistering,
    ],
  );

  if (isLoading) {
    return <></>;
  }

  // Redirect if not authenticated and not on login page
  if (!isAuthenticated && !isLoginPage) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect if authenticated and on login page
  if (isAuthenticated && isLoginPage) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
