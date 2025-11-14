import { Shield, Lock, Zap, Check, Sparkles } from 'lucide-react';

export function SolutionSection() {
  const visionPoints = [
    'It was manufactured by an authorized source',
    'It passed certification steps',
    'It hasn\'t been tampered with',
    'Its provenance exists — privately',
  ];

  const features = [
    {
      icon: Shield,
      title: 'Private Product Registration',
      description: 'All details remain local; only hash commitments go on-chain.',
    },
    {
      icon: Check,
      title: 'ZK-Based Authenticity Verification',
      description: 'Consumers verify trustlessly without data exposure.',
    },
    {
      icon: Sparkles,
      title: 'NFT Minting',
      description: 'Each product becomes a unique digital authenticity badge.',
    },
    {
      icon: Lock,
      title: 'Tamper Detection',
      description: 'Any mismatched claim immediately invalidates the proof.',
    },
  ];

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4">
            Our <span className="text-[#02FDA9]">Vision</span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-4">
            Every real-world product becomes a privacy-preserving digital asset
          </p>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            With VeriChain, each item receives a ZK-powered NFT that proves:
          </p>
        </div>

        {/* Vision Points */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4 mb-12">
          {visionPoints.map((point, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl bg-[#02FDA9]/10 border border-[#02FDA9]/30"
            >
              <Check className="w-5 h-5 text-[#02FDA9] flex-shrink-0" />
              <span className="text-gray-300">{point}</span>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="text-center mb-16 p-8 rounded-3xl bg-gradient-to-r from-[#02FDA9]/20 to-[#26D98E]/10 border border-[#02FDA9]/50">
          <p className="text-3xl text-[#02FDA9]">
            Prove authenticity, not the data behind it.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h3 className="text-3xl text-center mb-10">
            Key <span className="text-[#02FDA9]">Features</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#015039]/50 backdrop-blur-sm border border-white/10 hover:border-[#02FDA9]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#02FDA9]/20 border border-[#02FDA9] flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-[#02FDA9]" />
                </div>
                <h4 className="text-xl text-white mb-3">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}