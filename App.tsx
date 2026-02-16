
import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Exercises from './pages/Exercises';
import CrossFit from './pages/CrossFit';
import Trainers from './pages/Trainers';
import Shop from './pages/Shop';
// import Dashboard from './pages/Dashboard'; // Legacy dashboard removed/replaced
import Login from './pages/Login';
import Register from './pages/Register';
import JoinNow from './pages/JoinNow';
import Payment from './pages/Payment'; // Public payment page (maybe for drop-ins?)
import Community from './pages/Community';
import ForgotPassword from './pages/ForgotPassword';
import Scheduling from './pages/Scheduling';
import MartialArtDetail from './pages/MartialArtDetail';
import DanceDetail from './pages/DanceDetail';

import { AnimatePresence, motion } from 'framer-motion';
import PageTransition from './components/PageTransition';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import StudentLayout from './components/StudentLayout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Students from './pages/admin/Students';
import Plans from './pages/admin/Plans';
import AdminPayments from './pages/admin/Payments';

// Student Pages
import Dashboard from './pages/Dashboard';
import StudentPayments from './pages/student/Payments';
import StudentProfile from './pages/student/Profile';
import DashboardRedirect from './pages/DashboardRedirect';
import SetupAdmin from './pages/SetupAdmin'; // Temp tool

const MainLayout: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        isLoggedIn={!!user}
        onLogin={() => { }} // Navbar might use Link to /login now, check implementation
        onLogout={signOut}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public Routes Wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<PageTransition><Home isLoggedIn={false} /></PageTransition>} />
          <Route path="/exercises" element={<PageTransition><Exercises isLoggedIn={false} /></PageTransition>} />
          <Route path="/crossfit" element={<PageTransition><CrossFit isLoggedIn={false} /></PageTransition>} />
          <Route path="/trainers" element={<PageTransition><Trainers isLoggedIn={false} /></PageTransition>} />
          <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/setup-admin" element={<SetupAdmin />} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
          <Route path="/join" element={<PageTransition><JoinNow /></PageTransition>} />
          <Route path="/payment" element={<PageTransition><Payment /></PageTransition>} />
          <Route path="/community" element={<PageTransition><Community isLoggedIn={false} /></PageTransition>} />
          <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
          <Route path="/scheduling" element={<PageTransition><Scheduling /></PageTransition>} />
          <Route path="/martial-arts/:slug" element={<PageTransition><MartialArtDetail /></PageTransition>} />
          <Route path="/dances/:slug" element={<PageTransition><DanceDetail /></PageTransition>} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="plans" element={<Plans />} />
            <Route path="payments" element={<AdminPayments />} />
          </Route>
        </Route>

        {/* Protected Student Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="payments" element={<StudentPayments />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>
        </Route>

      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
