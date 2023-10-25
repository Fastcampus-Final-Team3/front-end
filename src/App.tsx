import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Wall from './pages/Wall';
import Login from './pages/login';
import ProtectedRoute from './pages/ProtectedRoute';

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
      <Route
        path="/wall/:wallId"
        element={
          <ProtectedRoute>
            <Wall />
          </ProtectedRoute>
        }
      />
      {/* <Route path="/space/personal" element={<Space />} /> */}
      {/* <Route path="/category" element={<Category />} /> */}
      {/* <Route path="wall/temp" element={<WallAllPage />} /> */}
      {/* <Route path="wall/:wallId" element={<WallAllPage />} /> */}
    </Routes>
  );
}
