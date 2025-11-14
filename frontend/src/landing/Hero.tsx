import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center px-6 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#02FDA9]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#26D98E]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#02FDA9]/10 border border-[#02FDA9]/20 mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[#02FDA9] animate-pulse" />
            <span className="text-sm text-[#02FDA9]">Powered by Midnight Network ZK Proofs</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl mb-8 tracking-tight">
            Privacy-Proven
            <br />
            <span className="bg-gradient-to-r from-[#02FDA9] via-[#26D98E] to-[#9CF5B4] bg-clip-text text-transparent">
              Authenticity Layer
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Verify products without revealing private data. Built on zero-knowledge cryptography for 
            complete supply chain transparency and privacy.
          </p>

          {/* CTA Button */}
          <button
            onClick={onGetStarted}
            className="group px-8 py-4 rounded-xl bg-[#02FDA9] text-[#0C0F0A] hover:bg-[#26D98E] transition-all duration-300 inline-flex items-center gap-3 shadow-2xl shadow-[#02FDA9]/40 hover:shadow-[#02FDA9]/60 hover:scale-105"
          >
            <span className="text-lg">Try Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-20 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Shield className="w-8 h-8 text-[#02FDA9] mb-3 mx-auto" />
              <div className="text-sm text-gray-400">Zero-Knowledge Proofs</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Lock className="w-8 h-8 text-[#26D98E] mb-3 mx-auto" />
              <div className="text-sm text-gray-400">Private Supply Chain Data</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Zap className="w-8 h-8 text-[#9CF5B4] mb-3 mx-auto" />
              <div className="text-sm text-gray-400">Instant Verification</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
