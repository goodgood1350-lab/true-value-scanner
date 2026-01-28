import React, { useState } from 'react';
import { Sparkles, Scan, Upload, Link as LinkIcon } from 'lucide-react';
import { BarcodeScanner } from './components/scanner/BarcodeScanner';
import { ImageUploader } from './components/scanner/ImageUploader';
import { URLInput } from './components/scanner/URLInput';
import { ResultsCard } from './components/ResultsCard';
import { useProductAnalysis } from './hooks/useProductAnalysis';

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scan' | 'upload' | 'url'>('scan');
  const { analysis, isLoading, error, analyze, reset } = useProductAnalysis();

  const handleBarcodeScan = (barcode: string) => {
    analyze(barcode, 'barcode');
  };

  const handleImageUpload = (file?: File) => {
    // For demo hook we pass the filename; replace with actual file upload or base64 if your backend requires it.
    if (!file) return;
    analyze(file.name, 'image');
  };

  const handleUrlSubmit = (url?: string) => {
    if (!url) return;
    analyze(url, 'url');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <Sparkles className="w-12 h-12 text-white animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 drop-shadow-lg">
          True Value Scanner
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Smart beauty product analysis for Hong Kong shoppers 🇭🇰
        </p>
        <p className="text-lg text-indigo-600 font-semibold mt-2">Scan → Analyze → Save</p>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        {/* Tabs */}
        {!analysis && (
          <div className="w-full bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('scan')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition ${
                    activeTab === 'scan'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                      : 'bg-white/50 text-gray-700 border'
                  }`}
                >
                  <Scan className="w-4 h-4" /> Scan
                </button>

                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition ${
                    activeTab === 'upload'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                      : 'bg-white/50 text-gray-700 border'
                  }`}
                >
                  <Upload className="w-4 h-4" /> Upload
                </button>

                <button
                  onClick={() => setActiveTab('url')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition ${
                    activeTab === 'url'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                      : 'bg-white/50 text-gray-700 border'
                  }`}
                >
                  <LinkIcon className="w-4 h-4" /> URL
                </button>
              </div>

              <div className="text-sm text-muted-foreground">
                {isLoading ? 'Analyzing...' : error ? <span className="text-destructive">{error}</span> : 'Ready'}
              </div>
            </div>

            {/* Active Panel */}
            <div>
              {activeTab === 'scan' && (
                <div className="max-w-2xl mx-auto">
                  <BarcodeScanner onScan={handleBarcodeScan} />
                </div>
              )}

              {activeTab === 'upload' && (
                <div className="max-w-2xl mx-auto">
                  <ImageUploader onUpload={handleImageUpload} />
                </div>
              )}

              {activeTab === 'url' && (
                <div className="max-w-2xl mx-auto">
                  <URLInput onSubmit={handleUrlSubmit} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {analysis && (
          <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8">
            <ResultsCard data={analysis} onReset={() => reset()} />
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-6 p-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-3xl shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to discover true value?</h2>
          <p className="text-lg opacity-90 mb-4">Every scan makes you a smarter shopper</p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-300">
            <span>🇭🇰 Made for Hong Kong</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
