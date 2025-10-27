import { Routes, Route } from 'react-router';
import { AuthProvider } from './AuthProvider/AuthProvider.tsx';
import { Home } from './Home/Home';
import { Welcome } from './Welcome/Welcome';
import { Login } from './Login/Login';
import { NotFound } from './NotFound/NotFound';

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Home />}>
          <Route index element={<Welcome />} />
          <Route path="training" element={<div>Training (Coming Soon)</div>} />
          <Route path="users" element={<div>Users (Coming Soon)</div>} />
          <Route
            path="swagger"
            element={<div>API Reference (Coming Soon)</div>}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};
