
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Exercises from './pages/Exercises';
import CrossFit from './pages/CrossFit';
import Trainers from './pages/Trainers';
import Shop from './pages/Shop';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import JoinNow from './pages/JoinNow';
import Payment from './pages/Payment';
import Community from './pages/Community';
import ForgotPassword from './pages/ForgotPassword';
import Scheduling from './pages/Scheduling';

import { AnimatePresence, motion } from 'framer-motion';
import PageTransition from './components/PageTransition';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Routes location={location}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/exercises" element={<PageTransition><Exercises isLoggedIn={isLoggedIn} /></PageTransition>} />
              <Route path="/crossfit" element={<PageTransition><CrossFit isLoggedIn={isLoggedIn} /></PageTransition>} />
              <Route path="/trainers" element={<PageTransition><Trainers isLoggedIn={isLoggedIn} /></PageTransition>} />
              <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
              <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
              <Route path="/login" element={<PageTransition><Login onLogin={handleLogin} /></PageTransition>} />
              <Route path="/join" element={<PageTransition><JoinNow /></PageTransition>} />
              <Route path="/payment" element={<PageTransition><Payment /></PageTransition>} />
              <Route path="/community" element={<PageTransition><Community isLoggedIn={isLoggedIn} /></PageTransition>} />
              <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
              <Route path="/scheduling" element={<PageTransition><Scheduling /></PageTransition>} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

const Root = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

export default Root;
