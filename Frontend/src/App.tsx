import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailConfirmation from './pages/EmailConfirmation';
import Dashboard from './pages/Dashboard';
import Areas from './pages/Areas';
import Exercise from './pages/Exercise';
import Progress from './pages/Progress';
import Help from './pages/Help';
import AdminPanel from './pages/admin/AdminPanel';
import CreateExercise from './pages/admin/CreateExercise';
import EditExercise from './pages/admin/EditExercise';
import NotFound from './pages/NotFound';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Admin route component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  return isAuthenticated && user?.role === 'teacher' ? <>{children}</> : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-base-light">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/email-confirmation" element={<EmailConfirmation />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/areas" element={
              <ProtectedRoute>
                <Areas />
              </ProtectedRoute>
            } />
            <Route path="/exercise/:id" element={
              <ProtectedRoute>
                <Exercise />
              </ProtectedRoute>
            } />
            <Route path="/exercise" element={
              <ProtectedRoute>
                <Exercise />
              </ProtectedRoute>
            } />
            <Route path="/progress" element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            } />
            <Route path="/admin/exercise/create" element={
              <AdminRoute>
                <CreateExercise />
              </AdminRoute>
            } />
            <Route path="/admin/exercise/edit/:id" element={
              <AdminRoute>
                <EditExercise />
              </AdminRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;