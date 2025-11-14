import { useState } from 'react';
import { Package, Hash, Coins, ArrowLeft } from 'lucide-react';
import { ProductRegistration } from './ProductRegistration';
import { HashGeneration } from './HashGeneration';
import { NFTMint } from './NFTMint';

type DashboardView = 'overview' | 'register' | 'hash' | 'mint';

export function ManufacturerDashboard() {
  const [activeView, setActiveView] = useState<DashboardView>('register');
  const [productData, setProductData] = useState<any>(null);
  const [generatedHash, setGeneratedHash] = useState<string>('');

  const handleProductSubmit = (data: any) => {
    setProductData(data);
    setActiveView('hash');
  };

  const handleHashGenerated = (hash: string) => {
    setGeneratedHash(hash);
    setActiveView('mint');
  };

  const handleMintComplete = () => {
    setActiveView('register');
    setProductData(null);
    setGeneratedHash('');
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl mb-4">
            Product <span className="text-[#02FDA9]">Registration</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Register products and mint veriNFTs with zero-knowledge proofs
          </p>
        </div>

        {/* Content */}
        {activeView === 'register' && <ProductRegistration onSubmit={handleProductSubmit} />}
        {activeView === 'hash' && productData && (
          <HashGeneration productData={productData} onHashGenerated={handleHashGenerated} />
        )}
        {activeView === 'mint' && productData && generatedHash && (
          <NFTMint productData={productData} hash={generatedHash} onComplete={handleMintComplete} />
        )}
      </div>
    </div>
  );
}