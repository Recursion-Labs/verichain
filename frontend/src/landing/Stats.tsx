import { TrendingUp } from 'lucide-react';

export function Stats() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Market Opportunity */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
            <TrendingUp className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400">Market Opportunity</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-3">
            The <span className="text-[#02FDA9]">$3 Trillion</span> Problem
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Global counterfeiting and supply chain fraud cost businesses and consumers trillions annually
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#02FDA9]/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative p-8 rounded-3xl bg-[#015039]/30 border border-white/10 backdrop-blur-sm">
              <div className="text-5xl md:text-6xl bg-gradient-to-r from-[#02FDA9] to-[#26D98E] bg-clip-text text-transparent mb-3">
                $3T
              </div>
              <div className="text-gray-400">Annual Global Impact</div>
              <div className="text-sm text-gray-500 mt-2">of counterfeit goods & supply chain fraud</div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#26D98E]/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative p-8 rounded-3xl bg-[#015039]/30 border border-white/10 backdrop-blur-sm">
              <div className="text-5xl md:text-6xl bg-gradient-to-r from-[#26D98E] to-[#9CF5B4] bg-clip-text text-transparent mb-3">
                70%
              </div>
              <div className="text-gray-400">Manufacturers Affected</div>
              <div className="text-sm text-gray-500 mt-2">struggle with supply chain transparency</div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9CF5B4]/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative p-8 rounded-3xl bg-[#015039]/30 border border-white/10 backdrop-blur-sm">
              <div className="text-5xl md:text-6xl bg-gradient-to-r from-[#9CF5B4] to-[#02FDA9] bg-clip-text text-transparent mb-3">
                100%
              </div>
              <div className="text-gray-400">Privacy Preserved</div>
              <div className="text-sm text-gray-500 mt-2">with zero-knowledge verification</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
