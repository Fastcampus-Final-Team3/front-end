import { Route, Routes } from 'react-router-dom';
import Wall from './pages/Wall';
import Login from './pages/login';
import ProtectedRoute from './pages/ProtectedRoute';
import Space from './pages/Space';
import Category from './pages/Category';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/wall/:wallId" element={<Wall />} />
      <Route
        path="/space/:spaceId"
        element={
          <ProtectedRoute>
            <Space />
          </ProtectedRoute>
        }
      />
      <Route
        path="/category"
        element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        }
      />
      <Route path="/notFound" element={<NotFound />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
