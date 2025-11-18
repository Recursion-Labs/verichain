import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, ArrowLeft } from 'lucide-react';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [otpSent, setOtpSent] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.register(email);
      setOtpSent(true);
      setStep('otp');
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.verifyOTP(email, otp);
      navigate('/product', { replace: true });
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  const handleBack = () => {
    setStep('email');
    setOtp('');
    setOtpSent(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-[#0B0F0A] p-8 rounded-3xl border border-white/5">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            {step === 'email' ? 'Create VeriChain Account' : 'Verify Your Email'}
          </h2>
          <p className="text-gray-400 text-sm">
            {step === 'email'
              ? 'Enter your email to create an account'
              : `We've sent a verification code to ${email}`
            }
          </p>
        </div>

        {auth.error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {auth.error}
          </div>
        )}

        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-2">
                <Mail className="w-4 h-4 text-[#02FDA9]" />
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-[#0C0F0A] border border-white/10 focus:border-[#02FDA9]/50 outline-none text-white"
                required
              />
            </div>
            <button
              className="w-full py-3 rounded-xl bg-[#02FDA9] hover:bg-[#26D98E] text-[#0C0F0A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={auth.loading}
            >
              {auth.loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-2">
                Verification Code
              </label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                type="text"
                maxLength={6}
                className="w-full px-4 py-3 rounded-lg bg-[#0C0F0A] border border-white/10 focus:border-[#02FDA9]/50 outline-none text-white text-center text-xl tracking-widest"
                required
              />
            </div>
            <button
              className="w-full py-3 rounded-xl bg-[#02FDA9] hover:bg-[#26D98E] text-[#0C0F0A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={auth.loading || otp.length !== 6}
            >
              {auth.loading ? 'Creating Account...' : 'Verify & Create Account'}
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="w-full py-2 rounded-xl border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Email
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-[#02FDA9] hover:text-[#26D98E] transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
