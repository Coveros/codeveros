import { Routes, Route } from 'react-router';
import { AuthProvider } from './AuthProvider/AuthProvider.tsx';
import { Home } from './Home/Home';
import { WelcomePage } from './WelcomePage/WelcomePage';
import { LoginPage } from './LoginPage/LoginPage.tsx';
import { NotFound } from './NotFound/NotFound';
import { UsersPage } from './UsersPage/UsersPage';
import { TrainingPage } from './TrainingPage/TrainingPage.tsx';
import { SwaggerPage } from './Swagger/SwaggerPage.tsx';

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Home />}>
          <Route index element={<WelcomePage />} />
          <Route path="training" element={<TrainingPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="swagger" element={<SwaggerPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};
