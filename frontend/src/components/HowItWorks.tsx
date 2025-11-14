export { HowItWorks } from '../landing/HowItWorks';
export { default } from '../landing/HowItWorks';
// wrapper: re-export landing HowItWorks
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#02FDA9]/10 border border-[#02FDA9]/20 mb-4">
            <Cog className="w-4 h-4 text-[#02FDA9]" />
            <span className="text-sm text-[#02FDA9]">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-6xl mb-6">
            Simple <span className="text-[#02FDA9]">4-Step Process</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From product registration to consumer verification in seconds
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-[#02FDA9] via-[#26D98E] to-[#02FDA9]" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-center">
                  {/* Icon */}
                  <div className="relative inline-block mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mx-auto`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#02FDA9] flex items-center justify-center text-sm text-[#0C0F0A] shadow-lg">
                      {i + 1}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}