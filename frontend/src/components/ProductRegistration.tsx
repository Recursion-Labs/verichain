import { useState } from 'react';
import { Package, MapPin, Calendar, Hash, ChevronRight, FileCheck } from 'lucide-react';

interface ProductRegistrationProps {
  onSubmit: (data: any) => void;
}

export function ProductRegistration({ onSubmit }: ProductRegistrationProps) {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    batchNumber: '',
    certificationHash: '',
    manufacturingDate: '',
    origin: '',
    category: 'luxury',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="p-8 rounded-3xl bg-[#015039]/50 backdrop-blur-xl border border-white/10">
        <div className="mb-8">
          <h2 className="text-3xl mb-2">
            Register a New <span className="text-[#02FDA9]">Product</span>
          </h2>
          <p className="text-gray-400 mb-2">
            Convert physical items into privacy-preserving digital identities.
          </p>
          <p className="text-sm text-[#26D98E]">
            Your input stays private — only cryptographic commitments are published.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product ID */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-3">
              <Hash className="w-5 h-5 text-[#02FDA9]" />
              Product ID
            </label>
            <p className="text-sm text-gray-500 mb-2">Unique identifier for the product</p>
            <input
              type="text"
              value={formData.productId}
              onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0C0F0A] border border-white/10 focus:border-[#02FDA9]/50 outline-none transition-colors text-white"
              placeholder="PRD-2025-001"
              required
            />
          </div>

          {/* Batch Number */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-3">
              <Package className="w-5 h-5 text-[#02FDA9]" />
              Batch Number
            </label>
            <p className="text-sm text-gray-500 mb-2">Manufacturing batch or lot reference</p>
            <input
              type="text"
              value={formData.batchNumber}
              onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0C0F0A] border border-white/10 focus:border-[#02FDA9]/50 outline-none transition-colors text-white"
              placeholder="BATCH-2025-Q1-001"
              required
            />
          </div>

          {/* Certification Hash */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-3">
              <FileCheck className="w-5 h-5 text-[#02FDA9]" />
              Certification Hash
            </label>
            <p className="text-sm text-gray-500 mb-2">Regulatory or compliance certificate hash</p>
            <input
              type="text"
              value={formData.certificationHash}
              onChange={(e) => setFormData({ ...formData, certificationHash: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0C0F0A] border border-white/10 focus:border-[#02FDA9]/50 outline-none transition-colors text-white"
              placeholder="0xabcd1234..."
              required
            />
          </div>

          {/* Origin / Location Code */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-3">
              <MapPin className="w-5 h-5 text-[#02FDA9]" />
              Origin / Location Code
            </label>
            <p className="text-sm text-gray-500 mb-2">Manufacturing origin or region</p>
            <input
              type="text"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0C0F0A] border border-white/10 focus:border-[#02FDA9]/50 outline-none transition-colors text-white"
              placeholder="Switzerland"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#02FDA9] hover:bg-[#26D98E] text-[#0C0F0A] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Generate Private Commitment</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          <p className="text-center text-sm text-gray-500">
            Your data is combined into a single Poseidon hash. No raw information is ever revealed.
          </p>
        </form>
      </div>
    </div>
  );
}