import { AlertTriangle, Database, Lock, XCircle, Globe } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    'Data is centralized and controlled by opaque vendor systems',
    '"Authenticity labels" can be forged',
    'Brands must expose supplier data to prove legitimacy',
    'Consumers have no trustless way to verify origin or certifications',
    'Global supply chains lack a privacy-preserving authenticity standard',
  ];

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
            <span className="text-red-400">The Problem</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 max-w-3xl mx-auto leading-tight">
            The world loses over <span className="text-red-400">$500B every year</span> to counterfeit goods
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Today's traceability tools (barcodes, QR codes, RFID) fail because:
          </p>
        </div>

        {/* Problems List */}
        <div className="max-w-4xl mx-auto space-y-4 mb-16">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-6 rounded-2xl bg-[#015039]/50 backdrop-blur-sm border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-lg text-gray-300 pt-1">{problem}</p>
            </div>
          ))}
        </div>

        {/* Market Gap */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/30">
          <h3 className="text-3xl text-red-400 mb-6 text-center">The Market Gap</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-[#0C0F0A]/50 border border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-red-400" />
                <h4 className="text-xl text-white">Public Blockchains</h4>
              </div>
              <p className="text-gray-400">Expose supplier details and trade secrets</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C0F0A]/50 border border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-red-400" />
                <h4 className="text-xl text-white">Centralized Systems</h4>
              </div>
              <p className="text-gray-400">Unverifiable and lack cryptographic guarantees</p>
            </div>
          </div>

          <div className="text-center p-6 rounded-2xl bg-red-500/10 border border-red-500/30">
            <Lock className="w-8 h-8 text-red-400 mx-auto mb-4" />
            <p className="text-xl text-gray-300">
              <strong className="text-red-400">No system today</strong> allows enterprises to prove authenticity without revealing trade secrets
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}