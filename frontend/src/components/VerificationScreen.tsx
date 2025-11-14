import { useState } from 'react';
import { Search, CheckCircle, XCircle, Hash, Package, Calendar, MapPin, Shield } from 'lucide-react';

export function VerificationScreen() {
  const [productId, setProductId] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'verified' | 'failed' | null>(null);
  const [productDetails, setProductDetails] = useState<any>(null);
  const [verificationSteps, setVerificationSteps] = useState({
    retrieving: false,
    comparing: false,
    verifying: false,
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setVerificationResult(null);
    setVerificationSteps({ retrieving: false, comparing: false, verifying: false });

    // Simulate verification steps
    setTimeout(() => setVerificationSteps(prev => ({ ...prev, retrieving: true })), 300);
    setTimeout(() => setVerificationSteps(prev => ({ ...prev, comparing: true })), 900);
    setTimeout(() => setVerificationSteps(prev => ({ ...prev, verifying: true })), 1500);

    // Simulate verification
    setTimeout(() => {
      const isValid = Math.random() > 0.3; // 70% chance of success for demo
      setVerificationResult(isValid ? 'verified' : 'failed');
      
      if (isValid) {
        setProductDetails({
          productId,
          productName: 'Luxury Watch Model X',
          batchNumber: 'BATCH-2025-Q1-001',
          manufacturingDate: '2025-01-15',
          origin: 'Switzerland',
          category: 'Luxury Goods',
          hash: '0xabcd1234...ef567890',
          nftId: '#042',
        });
      }
      
      setVerifying(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-2xl bg-[#02FDA9]/10 border border-[#02FDA9]/30 mb-6">
            <Shield className="w-12 h-12 text-[#02FDA9]" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">
            Verify Product <span className="text-[#02FDA9]">Authenticity</span>
          </h1>
          <p className="text-xl text-gray-400">
            Enter the Product ID / NFT ID to check if it matches the on-chain commitment
          </p>
        </div>

        {/* Verification Form */}
        <div className="mb-8">
          <form onSubmit={handleVerify} className="p-8 rounded-3xl bg-[#015039]/50 backdrop-blur-xl border border-white/10">
            <div className="mb-6">
              <label className="flex items-center gap-2 text-gray-300 mb-3">
                <Hash className="w-5 h-5 text-[#02FDA9]" />
                Product/NFT ID
              </label>
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full px-4 py-4 rounded-xl bg-[#0C0F0A] border border-white/10 focus:border-[#02FDA9]/50 outline-none transition-colors text-white text-lg"
                placeholder="PRD-2025-001 or #042"
                required
              />
            </div>

            <button
              type="submit"
              disabled={verifying}
              className="w-full py-4 rounded-xl bg-[#02FDA9] hover:bg-[#26D98E] disabled:bg-gray-600 disabled:cursor-not-allowed text-[#0C0F0A] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {verifying ? (
                <>
                  <Search className="w-5 h-5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Verify Authenticity</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Verification Progress */}
        {verifying && (
          <div className="mb-8 p-8 rounded-3xl bg-[#015039]/50 backdrop-blur-xl border border-white/10">
            <h3 className="text-2xl text-[#02FDA9] mb-6">Validating Zero-Knowledge Proof...</h3>
            <div className="space-y-4">
              <div className={`flex items-center gap-3 ${verificationSteps.retrieving ? 'text-[#02FDA9]' : 'text-gray-500'}`}>
                <CheckCircle className="w-5 h-5" />
                <span>Retrieving commitment...</span>
              </div>
              <div className={`flex items-center gap-3 ${verificationSteps.comparing ? 'text-[#02FDA9]' : 'text-gray-500'}`}>
                <CheckCircle className="w-5 h-5" />
                <span>Comparing product hash...</span>
              </div>
              <div className={`flex items-center gap-3 ${verificationSteps.verifying ? 'text-[#02FDA9]' : 'text-gray-500'}`}>
                <CheckCircle className="w-5 h-5" />
                <span>Verifying proof on Midnight...</span>
              </div>
            </div>
          </div>
        )}

        {/* Verification Result */}
        {verificationResult && (
          <div className="mb-8">
            {verificationResult === 'verified' ? (
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#02FDA9]/20 to-[#26D98E]/10 border-2 border-[#02FDA9]/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#02FDA9] flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#0C0F0A]" />
                  </div>
                  <div>
                    <h3 className="text-2xl text-[#02FDA9] mb-1">Authentic Product — Proof Validated</h3>
                    <p className="text-gray-400">This product's identity is valid and cryptographically authenticated</p>
                  </div>
                </div>

                {productDetails && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="p-4 rounded-xl bg-[#0C0F0A]/50 border border-[#02FDA9]/30">
                        <div className="text-gray-400 mb-1">NFT ID</div>
                        <div className="text-white">{productDetails.nftId}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0C0F0A]/50 border border-[#02FDA9]/30">
                        <div className="text-gray-400 mb-1">Minted On</div>
                        <div className="text-white">{productDetails.manufacturingDate}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0C0F0A]/50 border border-[#02FDA9]/30">
                        <div className="text-gray-400 mb-1">Commitment Match</div>
                        <div className="text-[#02FDA9]">✔ Verified</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#0C0F0A]/50 border border-white/10">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                          <Package className="w-4 h-4" />
                          <span>Product Name</span>
                        </div>
                        <div className="text-white">{productDetails.productName}</div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0C0F0A]/50 border border-white/10">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                          <Hash className="w-4 h-4" />
                          <span>Batch Number</span>
                        </div>
                        <div className="text-white">{productDetails.batchNumber}</div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0C0F0A]/50 border border-white/10">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>Manufacturing Date</span>
                        </div>
                        <div className="text-white">{productDetails.manufacturingDate}</div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0C0F0A]/50 border border-white/10">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>Origin</span>
                        </div>
                        <div className="text-white">{productDetails.origin}</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0C0F0A]/50 border border-white/10">
                      <div className="text-gray-400 mb-2">Cryptographic Hash</div>
                      <div className="text-white font-mono text-sm break-all">{productDetails.hash}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#02FDA9]/10 border border-[#02FDA9]/30">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-[#02FDA9] mt-1" />
                        <div>
                          <div className="text-[#02FDA9] mb-1">Verified Using: Midnight ZK Runtime</div>
                          <div className="text-sm text-gray-400">
                            This product's authenticity has been cryptographically proven without exposing sensitive supply chain data.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-gradient-to-br from-red-500/20 to-orange-500/10 border-2 border-red-500/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl text-red-400 mb-1">Invalid Proof — Unverified Source</h3>
                    <p className="text-gray-400">The submitted product hash does not match any registered commitment</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="w-4 h-4" />
                    <span>Commitment Not Found</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="w-4 h-4" />
                    <span>Proof Rejected</span>
                  </div>
                  <p className="text-gray-300 mt-4">
                    <strong>Warning:</strong> This product may be tampered or counterfeit.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* How Verification Works */}
        <div className="p-8 rounded-3xl bg-[#015039]/50 backdrop-blur-xl border border-white/10">
          <h3 className="text-2xl mb-6">How Verification Works</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#02FDA9]/20 border border-[#02FDA9] flex items-center justify-center flex-shrink-0">
                <span className="text-[#02FDA9]">1</span>
              </div>
              <div>
                <div className="text-white mb-1">Enter Product ID</div>
                <div className="text-sm text-gray-400">Input the unique identifier from your product</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#02FDA9]/20 border border-[#02FDA9] flex items-center justify-center flex-shrink-0">
                <span className="text-[#02FDA9]">2</span>
              </div>
              <div>
                <div className="text-white mb-1">Zero-Knowledge Proof</div>
                <div className="text-sm text-gray-400">System generates a ZK proof to verify authenticity without revealing data</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#02FDA9]/20 border border-[#02FDA9] flex items-center justify-center flex-shrink-0">
                <span className="text-[#02FDA9]">3</span>
              </div>
              <div>
                <div className="text-white mb-1">Instant Result</div>
                <div className="text-sm text-gray-400">Get verification status in under 2 seconds with full privacy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}