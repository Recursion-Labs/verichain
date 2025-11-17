import { Gem, Pill, Leaf, Package } from 'lucide-react';

export function UseCases() {
  const cases = [
    {
      icon: Gem,
      title: 'Luxury Goods',
      description: 'Protect high-value items like watches, handbags, and jewelry from counterfeiting.',
      stats: '$450B annual counterfeit market',
      color: 'from-[#9CF5B4] to-[#02FDA9]',
    },
    {
      icon: Pill,
      title: 'Pharmaceuticals',
      description: 'Ensure medication authenticity and prevent dangerous fake drugs from entering supply chains.',
      stats: '10-30% of drugs in developing countries are counterfeit',
      color: 'from-[#26D98E] to-[#006747]',
    },
    {
      icon: Leaf,
      title: 'Agriculture & Food',
      description: 'Verify organic certifications, origin claims, and quality standards for food products.',
      stats: '$40B food fraud market annually',
      color: 'from-[#02FDA9] to-[#24DC97]',
    },
    {
      icon: Package,
      title: 'Electronics',
      description: 'Combat fake components and ensure warranty validity for consumer electronics.',
      stats: '$169B electronics counterfeit market',
      color: 'from-[#18705C] to-[#26D98E]',
    },
  ];

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4">
            Use <span className="text-[#02FDA9]">Cases</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            VeriChain protects critical industries from counterfeiting and fraud
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {cases.map((useCase, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-[#015039]/50 backdrop-blur-sm border border-white/10 hover:border-[#02FDA9]/30 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-6`}>
                <useCase.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl text-white mb-3">{useCase.title}</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">{useCase.description}</p>

              <div className="pt-4 border-t border-white/10">
                <div className={`text-sm bg-gradient-to-r ${useCase.color} bg-clip-text text-transparent`}>
                  {useCase.stats}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}