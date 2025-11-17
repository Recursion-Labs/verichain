import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Hero } from './landing/Hero';
import { Stats } from './landing/Stats';
import { Vision } from './landing/Vision';
import { HowItWorks } from './landing/HowItWorks';
import { FutureScope } from './landing/FutureScope';
import { Footer } from './landing/Footer';
import ProductPage from './pages/ProductPage';
import VerifyPage from './pages/VerifyPage';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import { RequireAuth } from './components/RequireAuth';

function InnerApp() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'verify'>('landing');

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0C0F0A] text-white overflow-x-hidden">
      <NavBar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(2, 253, 169, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(2, 253, 169, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#006747]/3 to-transparent" />
      </div>


      <div className="pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero onGetStarted={() => { setCurrentView('dashboard'); navigate('/product'); }} />
                <Stats />
                <Vision />
                <HowItWorks />
                <FutureScope />
                <Footer />
              </>
            }
          />

          <Route path="/product" element={<RequireAuth><ProductPage /></RequireAuth>} />
          <Route path="/verify" element={<VerifyPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </BrowserRouter>
  );
}
