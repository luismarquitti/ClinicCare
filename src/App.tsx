import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Residents } from './pages/Residents';
import { ResidentDetails } from './pages/ResidentDetails';
import { ResidentAdmission } from './pages/ResidentAdmission';
import { EPrescription } from './pages/EPrescription';
import { Nursing } from './pages/Nursing';
import { Financial } from './pages/Financial';
import { Maintenance } from './pages/Maintenance';
import { Documentation } from './pages/Documentation';
import { Toaster, toast } from 'react-hot-toast';
import React, { useEffect, useRef } from 'react';

function ProtectedRoute({ children, allowedRoles, useLayout = true }: { children: React.ReactNode, allowedRoles?: string[], useLayout?: boolean }) {
  const user = useAppStore(state => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return useLayout ? <Layout>{children}</Layout> : <>{children}</>;
}

export default function App() {
  const { notifications, user } = useAppStore();
  const prevNotificationsLength = useRef(notifications.length);

  useEffect(() => {
    if (notifications.length > prevNotificationsLength.current) {
      const newNotification = notifications[0]; // The newest is at the beginning
      if (user && (newNotification.targetRole === 'all' || newNotification.targetRole === user.role)) {
        toast(newNotification.message, {
          icon: newNotification.type === 'warning' ? '⚠️' : newNotification.type === 'success' ? '✅' : 'ℹ️',
          duration: 5000,
        });
      }
    }
    prevNotificationsLength.current = notifications.length;
  }, [notifications, user]);

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/residents" element={
          <ProtectedRoute allowedRoles={['admin', 'saude']}>
            <Residents />
          </ProtectedRoute>
        } />

        <Route path="/residents/new" element={
          <ProtectedRoute allowedRoles={['admin', 'saude']} useLayout={false}>
            <ResidentAdmission />
          </ProtectedRoute>
        } />

        <Route path="/residents/:id" element={
          <ProtectedRoute allowedRoles={['admin', 'saude']}>
            <ResidentDetails />
          </ProtectedRoute>
        } />

        <Route path="/eprescription/:id" element={
          <ProtectedRoute allowedRoles={['admin', 'saude']} useLayout={false}>
            <EPrescription />
          </ProtectedRoute>
        } />

        <Route path="/nursing" element={
          <ProtectedRoute allowedRoles={['admin', 'saude']}>
            <Nursing />
          </ProtectedRoute>
        } />
        
        <Route path="/financial" element={
          <ProtectedRoute allowedRoles={['admin', 'financeiro']}>
            <Financial />
          </ProtectedRoute>
        } />
        
        <Route path="/maintenance" element={
          <ProtectedRoute allowedRoles={['admin', 'manutencao']}>
            <Maintenance />
          </ProtectedRoute>
        } />

        <Route path="/docs" element={<Documentation />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
