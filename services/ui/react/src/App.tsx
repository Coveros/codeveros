import { Routes, Route } from 'react-router';
import { AuthProvider } from './Providers/AuthProvider/AuthProvider';
import { Home } from './Pages/Home/Home';
import { WelcomePage } from './Pages/WelcomePage/WelcomePage';
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { NotFound } from './Components/NotFound';
import { UsersPage } from './Pages/UsersPage/UsersPage.tsx';
import { TrainingPage } from './Pages/TrainingPage/TrainingPage';
import { SwaggerPage } from './Pages/Swagger/SwaggerPage';

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
