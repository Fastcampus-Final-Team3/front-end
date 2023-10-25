import { useUserStore } from '@/store';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <div>{children}</div>;
}
