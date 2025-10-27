import { useState, useEffect, type ReactNode, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext, type User } from './authContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        // In a real app, you would verify the token with the backend
        // For now, we'll just check if it exists
        try {
          // TODO: Replace with actual API call
          // const response = await fetch('/api/auth/loggedin', {
          //   headers: { Authorization: `Bearer ${token}` }
          // });
          // const userData = await response.json();
          // setUser(userData);

          // Mock implementation
          setUser({ _id: '1', username: 'demo' });
        } catch (error) {
          localStorage.removeItem('access_token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password }),
      // });
      // const { token, user } = await response.json();

      // Mock implementation
      const token = 'mock-token';
      const userData = { _id: '1', username };

      localStorage.setItem('access_token', token);
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    // TODO: Call logout endpoint
    // fetch('/api/auth/logout', { method: 'POST' });
  };

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

  // Redirect to login if not authenticated and not on login page
  if (!isAuthenticated && !isLoginPage) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
