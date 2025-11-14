import { Target, Sparkles } from 'lucide-react';

export function Vision() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#02FDA9]/10 border border-[#02FDA9]/20 mb-4">
              <Target className="w-4 h-4 text-[#02FDA9]" />
              <span className="text-sm text-[#02FDA9]">Our Vision</span>
            </div>
            <h2 className="text-4xl md:text-6xl mb-6">
              Every Product,
              <br />
              A <span className="bg-gradient-to-r from-[#02FDA9] to-[#26D98E] bg-clip-text text-transparent">Cryptographic Identity</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              We're building a world where authenticity is provable without compromising privacy. 
              Each physical product becomes a privacy-preserving digital asset on Midnight Network.
            </p>
          </div>

          {/* Core Principles */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#02FDA9]/10 to-transparent border border-[#02FDA9]/20">
              <Sparkles className="w-10 h-10 text-[#02FDA9] mb-4" />
              <h3 className="text-2xl mb-3">Prove Authenticity, Not Data</h3>
              <p className="text-gray-400 leading-relaxed">
                Zero-knowledge proofs allow consumers to verify products are genuine without 
                exposing sensitive supply chain information, trade secrets, or manufacturer data.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#26D98E]/10 to-transparent border border-[#26D98E]/20">
              <Sparkles className="w-10 h-10 text-[#26D98E] mb-4" />
              <h3 className="text-2xl mb-3">Privacy-First Verification</h3>
              <p className="text-gray-400 leading-relaxed">
                Built on Midnight Network's privacy layer, VeriChain ensures complete data 
                confidentiality while maintaining cryptographic certainty of product authenticity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vision;
