import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';
import { Layout } from './components/ui/Layout';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Residents } from './pages/Residents';
import { ResidentDetails } from './pages/ResidentDetails';
import { ResidentAdmission } from './pages/ResidentAdmission';
import { EPrescription } from './pages/EPrescription';
import { Nursing } from './pages/Nursing';
import { Financeiro } from './pages/Financeiro';
import { Inventory } from './pages/Inventory';
import { Maintenance } from './pages/Maintenance';
import { HR } from './pages/HR';
import { Documentation } from './pages/Documentation';
import { Toaster, toast } from 'react-hot-toast';
import React, { useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Role } from './types';

function LoadingBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 overflow-hidden bg-blue-100">
      <div className="h-full bg-blue-600 animate-progress origin-left"></div>
    </div>
  );
}

function ProtectedRoute({ children, allowedRoles, useLayout = true }: { children: React.ReactNode, allowedRoles?: string[], useLayout?: boolean }) {
  const { user, isLoadingAuth } = useAppStore();

  if (isLoadingAuth) {
    return null; // Don't redirect until we know the auth state
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return useLayout ? <Layout>{children}</Layout> : <>{children}</>;
}

export default function App() {
  const { notifications, user, initializeListeners, theme, isLoadingAuth, setAuthLoading, setUser } = useAppStore();
  const prevNotificationsLength = useRef(notifications.length);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Auth Listener
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setAuthLoading(true);
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.exists() ? userDoc.data() : { role: 'saude' as Role };

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            role: userData.role as Role
          });
        } catch (err) {
          console.error('Failed to fetch user role:', err);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: 'User',
            role: 'saude'
          });
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    // Start listening to Firebase real-time snapshot events
    const unsubscribeListeners = initializeListeners();

    return () => {
      unsubscribeAuth();
      unsubscribeListeners();
    };
  }, [initializeListeners, setAuthLoading, setUser]);

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
      {isLoadingAuth && <LoadingBar />}
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
            <Financeiro />
          </ProtectedRoute>
        } />

        <Route path="/inventory" element={
          <ProtectedRoute allowedRoles={['admin', 'financeiro', 'saude', 'manutencao']}>
            <Inventory />
          </ProtectedRoute>
        } />

        <Route path="/maintenance" element={
          <ProtectedRoute allowedRoles={['admin', 'manutencao']}>
            <Maintenance />
          </ProtectedRoute>
        } />

        <Route path="/hr" element={
          <ProtectedRoute allowedRoles={['admin', 'rh']}>
            <HR />
          </ProtectedRoute>
        } />

        <Route path="/docs" element={<Documentation />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
