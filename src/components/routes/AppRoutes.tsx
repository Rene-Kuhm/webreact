import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { routes } from '@/routes/routes';

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ path, element: Element, isPublic }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute isPublic={isPublic}>
                <Element />
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
}
