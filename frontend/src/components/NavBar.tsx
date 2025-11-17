import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Github } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function NavBar({ currentView, setCurrentView }: { currentView: string; setCurrentView: (s: any) => void }) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0C0F0A]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#02FDA9] to-[#26D98E] flex items-center justify-center shadow-lg shadow-[#02FDA9]/30">
              <span className="text-[#0C0F0A] font-bold text-lg">V</span>
            </div>
            <div>
              <span className="text-2xl tracking-tight">VeriChain</span>
              <div className="text-xs text-[#02FDA9] -mt-1">Midnight Network</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/" onClick={() => setCurrentView('landing')} className={`px-4 py-2 rounded-lg transition-all ${currentView === 'landing' ? 'text-[#02FDA9] bg-[#02FDA9]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              Home
            </Link>
            <Link to="/product" onClick={() => setCurrentView('dashboard')} className={`px-4 py-2 rounded-lg transition-all ${currentView === 'dashboard' ? 'text-[#02FDA9] bg-[#02FDA9]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              Register
            </Link>
            <Link to="/verify" onClick={() => setCurrentView('verify')} className={`px-4 py-2 rounded-lg transition-all ${currentView === 'verify' ? 'text-[#02FDA9] bg-[#02FDA9]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              Verify
            </Link>

            <div className="w-px h-6 bg-white/10 mx-2" />

            <Link to="/verify" className="px-6 py-2.5 rounded-xl bg-[#02FDA9] text-[#0C0F0A] hover:bg-[#26D98E] transition-all duration-300 shadow-lg shadow-[#02FDA9]/30 hover:shadow-[#02FDA9]/50">
              Try Now
            </Link>

            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg text-gray-400 hover:text-[#02FDA9] hover:bg-white/5 transition-all">
              <Github className="w-5 h-5" />
            </a>

            {user ? (
              <button onClick={() => logout()} className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">Logout</button>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">Login</Link>
                <Link to="/register" className="px-4 py-2 rounded-lg text-[#02FDA9] hover:bg-[#02FDA9]/10">Sign up</Link>
              </>
            )}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-400 hover:text-[#02FDA9] p-2">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="space-y-1">
              <Link onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }} className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${currentView === 'landing' ? 'text-[#02FDA9] bg-[#02FDA9]/10' : 'text-gray-400 hover:bg-white/5'}`}>Home</Link>
              <Link onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }} className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${currentView === 'dashboard' ? 'text-[#02FDA9] bg-[#02FDA9]/10' : 'text-gray-400 hover:bg-white/5'}`}>Register</Link>
              <Link onClick={() => { setCurrentView('verify'); setMobileMenuOpen(false); }} className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${currentView === 'verify' ? 'text-[#02FDA9] bg-[#02FDA9]/10' : 'text-gray-400 hover:bg-white/5'}`}>Verify</Link>
              <Link onClick={() => { setCurrentView('verify'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 rounded-lg bg-[#02FDA9] text-[#0C0F0A] hover:bg-[#26D98E] transition-all mt-2">Try Now</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
