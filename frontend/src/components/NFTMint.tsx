import { useState, useEffect } from 'react';
import { Coins, Calendar, Hash, CheckCircle, ChevronRight } from 'lucide-react';

interface NFTMintProps {
  productData: any;
  hash: string;
  onComplete: () => void;
}

export function NFTMint({ productData, hash, onComplete }: NFTMintProps) {
  const [minting, setMinting] = useState(true);
  const [nftId, setNftId] = useState('');

  useEffect(() => {
    // Simulate NFT minting
    setTimeout(() => {
      setNftId(`#${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`);
      setMinting(false);
    }, 3000);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-[#015039]/50 backdrop-blur-xl border border-white/10">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">
          {minting ? (
            <>Minting <span className="text-[#02FDA9]">veriNFT</span>...</>
          ) : (
            <>Product NFT Minted <span className="text-[#02FDA9]">Successfully</span></>
          )}
        </h2>
        <p className="text-gray-400">
          {minting ? 'Creating your privacy-preserving NFT on Midnight Network' : 'Your product is now cryptographically verified'}
        </p>
      </div>

      {/* NFT Card */}
      <div className="relative mb-8">
        <div className={`relative p-8 rounded-3xl border-2 overflow-hidden ${
          minting 
            ? 'bg-[#0C0F0A]/50 border-[#02FDA9]/30' 
            : 'bg-gradient-to-br from-[#02FDA9]/20 to-[#26D98E]/20 border-[#02FDA9]/50'
        }`}>
          {/* NFT Icon */}
          <div className="relative flex justify-center mb-8">
            <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${
              minting 
                ? 'from-gray-700 to-gray-800' 
                : 'from-[#02FDA9] to-[#26D98E]'
            } flex items-center justify-center shadow-lg`}>
              <Coins className={`w-16 h-16 ${minting ? 'text-gray-500' : 'text-white'}`} />
            </div>
          </div>

          {/* NFT Details */}
          <div className="relative space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[#02FDA9] mb-1">veriNFT</div>
                {!minting && (
                  <div className="text-4xl text-[#02FDA9]">
                    NFT {nftId}
                  </div>
                )}
              </div>
              {!minting && (
                <div className="flex flex-col items-end gap-2">
                  <CheckCircle className="w-8 h-8 text-[#02FDA9]" />
                  <span className="text-xs text-[#02FDA9] px-2 py-1 rounded-full bg-[#02FDA9]/20 border border-[#02FDA9]">
                    Active & Verifiable
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>Minted On</span>
                </div>
                <div className="text-white">
                  {minting ? '...' : new Date().toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Hash className="w-4 h-4" />
                  <span>Network</span>
                </div>
                <div className="text-white">
                  {minting ? '...' : 'Midnight'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      {!minting && (
        <div className="mb-8">
          <div className="p-6 rounded-2xl bg-[#0C0F0A]/50 border border-white/10 mb-4">
            <h4 className="text-lg text-white mb-4">NFT Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400 mb-1">NFT ID</div>
                <div className="text-white">{nftId}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Timestamp</div>
                <div className="text-white">{new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0C0F0A] border border-white/10">
              <div className="text-gray-400 mb-1">Product ID</div>
              <div className="text-white">{productData.productId}</div>
            </div>
            <div className="p-4 rounded-xl bg-[#0C0F0A] border border-white/10">
              <div className="text-gray-400 mb-1">Commitment Hash</div>
              <div className="text-white font-mono text-sm truncate">{hash}</div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {!minting && (
        <div className="mb-8 p-6 rounded-2xl bg-[#02FDA9]/10 border border-[#02FDA9]/30">
          <div className="flex items-start gap-3">
            <div className="text-3xl">🎉</div>
            <div>
              <div className="text-[#02FDA9] mb-2">Congratulations!</div>
              <div className="text-gray-400">
                Your product has been registered on the blockchain with full privacy guarantees.
                Consumers can now verify its authenticity using zero-knowledge proofs.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      {!minting && (
        <button
          onClick={onComplete}
          className="w-full py-4 rounded-xl bg-[#02FDA9] hover:bg-[#26D98E] text-[#0C0F0A] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>Go to Verification Demo</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}