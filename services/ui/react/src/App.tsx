import { Routes, Route } from 'react-router';
import { AuthProvider } from './AuthProvider/AuthProvider.tsx';
import { Home } from './Home/Home';
import { Welcome } from './Welcome/Welcome';
import { Login } from './Login/Login';
import { NotFound } from './NotFound/NotFound';
import { Users } from './Users/Users';
import { Training } from './Training/Training';
import { Swagger } from './Swagger/Swagger';

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Home />}>
          <Route index element={<Welcome />} />
          <Route path="training" element={<Training />} />
          <Route path="users" element={<Users />} />
          <Route path="swagger" element={<Swagger />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};
