export { FutureScope } from '../landing/FutureScope';
export { default } from '../landing/FutureScope';
  const features = [
    {
      icon: Network,
      title: 'Multi-Chain Integration',
      description: 'Expand beyond Midnight to support verification across multiple blockchain networks',
    },
    {
      icon: Cpu,
      title: 'AI-Powered Analytics',
      description: 'Advanced pattern recognition to detect counterfeit networks and fraud attempts',
    },
    {
      icon: Globe,
      title: 'Global Supply Chain API',
      description: 'Developer-friendly APIs for seamless integration with existing systems',
    },
    {
      icon: Rocket,
      title: 'Industry Partnerships',
      description: 'Collaborate with luxury brands, pharma companies, and electronics manufacturers',
    },
  ];

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#02FDA9]/10 border border-[#02FDA9]/20 mb-4">
            <Rocket className="w-4 h-4 text-[#02FDA9]" />
            <span className="text-sm text-[#02FDA9]">Roadmap</span>
          </div>
          <h2 className="text-4xl md:text-6xl mb-6">
            Future <span className="text-[#02FDA9]">Scope</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Building the next generation of privacy-preserving supply chain infrastructure
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#02FDA9]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#02FDA9]/20 border border-[#02FDA9]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#02FDA9]/30 transition-all">
                <feature.icon className="w-7 h-7 text-[#02FDA9]" />
              </div>
              <h3 className="text-xl mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#02FDA9]/10 to-[#26D98E]/5 border border-[#02FDA9]/30">
            <h3 className="text-3xl md:text-4xl mb-4">
              Join the <span className="text-[#02FDA9]">Privacy Revolution</span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Be part of the first wave of manufacturers and brands building a transparent, 
              privacy-first supply chain ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
