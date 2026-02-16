
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home';
import Register from './src/pages/Register';
import Login from './src/pages/Login';

import DashboardLayout from './src/layouts/DashboardLayout';
import DashboardHome from './src/components/dashboard/DashboardHome';
import MyPlan from './src/components/dashboard/MyPlan';
import ModalitiesView from './src/components/dashboard/Modalities';
import PaymentsView from './src/components/dashboard/Payments';
import ProfileView from './src/components/dashboard/Profile';

import AdminLayout from './src/layouts/AdminLayout';
import AdminDashboard from './src/components/admin/AdminDashboard';
import StudentsList from './src/components/admin/StudentsList';
import PaymentsManager from './src/components/admin/PaymentsManager';
import PlansManager from './src/components/admin/PlansManager';
import ModalityDetails from './src/pages/ModalityDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modalidades/:id" element={<ModalityDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="plan" element={<MyPlan />} />
          <Route path="modalities" element={<ModalitiesView />} />
          <Route path="payments" element={<PaymentsView />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="payments" element={<PaymentsManager />} />
          <Route path="plans" element={<PlansManager />} />
          <Route path="settings" element={<div className="p-8 text-white">Configurações (Em breve)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
