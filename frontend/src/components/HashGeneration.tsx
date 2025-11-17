import { useState, useEffect } from 'react';
import { Hash, Loader2, CheckCircle, ChevronRight } from 'lucide-react';

interface HashGenerationProps {
  productData: any;
  onHashGenerated: (hash: string) => void;
}

export function HashGeneration({ productData, onHashGenerated }: HashGenerationProps) {
  const [status, setStatus] = useState<'generating' | 'complete'>('generating');
  const [hash, setHash] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate hash generation
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Generate hash after 2 seconds
    setTimeout(() => {
      const generatedHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`;
      setHash(generatedHash);
      setStatus('complete');
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleProceed = () => {
    onHashGenerated(hash);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-[#015039]/50 backdrop-blur-xl border border-white/10">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">
          <span className="text-[#02FDA9]">Generate Private Commitment</span>
        </h2>
        <p className="text-gray-400">
          Your data is combined into a single Poseidon hash commitment.
        </p>
        <p className="text-sm text-[#26D98E] mt-2">
          This commitment anchors your product privately on Midnight.
        </p>
      </div>

      {/* Terminal-like panel */}
      <div className="mb-8 p-6 rounded-2xl bg-[#0C0F0A] border border-[#02FDA9]/30 font-mono">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-[#02FDA9]">$</span>
            <span>Initiating Poseidon hash function...</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-[#02FDA9]">$</span>
            <span>Processing product data locally...</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-[#02FDA9]">$</span>
            <span>Generating zero-knowledge commitment...</span>
          </div>
          
          {status === 'generating' && (
            <div className="flex items-center gap-2 text-[#26D98E]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Computing hash... {progress}%</span>
            </div>
          )}

          {status === 'complete' && (
            <div className="flex items-center gap-2 text-[#02FDA9]">
              <CheckCircle className="w-4 h-4" />
              <span>Hash generated successfully!</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#02FDA9] via-[#26D98E] to-[#9CF5B4] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Poseidon Symbol Animation */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-4 border-[#02FDA9]/30" />
          <div className="absolute inset-2 rounded-full border-4 border-[#02FDA9]/50" />
          <div className="absolute inset-4 rounded-full border-4 border-[#02FDA9]/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Hash className="w-12 h-12 text-[#02FDA9]" />
          </div>
        </div>
      </div>

      {/* Hash Output */}
      {status === 'complete' && (
        <div className="mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#02FDA9]/20 to-[#26D98E]/20 border border-[#02FDA9]/50">
            <div className="text-gray-400 mb-2">Product Commitment Generated</div>
            <div className="text-sm text-gray-500 mb-3">Commitment Hash (H)</div>
            <div className="text-xl text-[#02FDA9] font-mono break-all mb-4">{hash}</div>
            <p className="text-sm text-[#26D98E]">
              This commitment anchors your product privately on Midnight.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0C0F0A] border border-white/10">
              <div className="text-gray-400 mb-1">Product ID</div>
              <div className="text-white">{productData.productId}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#0C0F0A] border border-white/10">
              <div className="text-gray-400 mb-1">Batch Number</div>
              <div className="text-white">{productData.batchNumber}</div>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      {status === 'complete' && (
        <button
          onClick={handleProceed}
          className="w-full py-4 rounded-xl bg-[#02FDA9] hover:bg-[#26D98E] text-[#0C0F0A] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>Mint veriNFT</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}