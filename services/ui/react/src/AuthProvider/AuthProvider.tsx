import {
  useState,
  useEffect,
  type ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext, type User } from './authContext';
import { useCheckLoggedIn, useLogin, useLogout } from '../api/authApi';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  // Check if user is logged in on mount
  const { data: loggedInUser, isLoading, error } = useCheckLoggedIn();

  const loginMutation = useLogin();
  const logoutMutation = useLogout();

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
      logout,
      isAuthenticated,
      isLoading,
    }),
    [user, login, logout, isAuthenticated, isLoading],
  );

  // Show loading state while checking auth
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect if not authenticated and not on login page
  if (!isAuthenticated && !isLoginPage) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
