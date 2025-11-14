export function FutureScope() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-3">Future Scope & Integrations</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Open integrations with supply chain software, customs, and marketplace registries.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-lg text-[#02FDA9] mb-3">Customs & Trade</div>
            <div className="text-sm text-gray-400">Streamline authenticity checks at borders and in import/export workflows</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-lg text-[#02FDA9] mb-3">Marketplaces</div>
            <div className="text-sm text-gray-400">Enable marketplaces to verify products before listing</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-lg text-[#02FDA9] mb-3">Supply Chain ERP</div>
            <div className="text-sm text-gray-400">Integrate with ERP systems for live supply chain provenance</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FutureScope;
