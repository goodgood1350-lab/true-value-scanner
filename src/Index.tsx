import { Sparkles } from 'lucide-react';
import { InputTabs } from './components/scanner/InputTabs';

const Index = () => {
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
        <p className="text-lg text-indigo-600 font-semibold mt-2">
          Scan → Analyze → Save
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-indigo-100 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">💰</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cost Per Use</h3>
            <p className="text-gray-600">Real value beyond the price tag</p>
          </div>
          
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-indigo-100 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">🌿</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Clean Ingredients</h3>
            <p className="text-gray-600">Health & safety analysis</p>
          </div>
          
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-indigo-100 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-white">📈</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Resale Value</h3>
            <p className="text-gray-600">Second-hand market prices</p>
          </div>
        </div>

        {/* Scanner Interface */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
          <InputTabs />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-3xl shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to discover true value?</h2>
          <p className="text-lg opacity-90 mb-6">Every scan makes you a smarter shopper</p>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-300">
            <span>🇭🇰 Made for Hong Kong</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
