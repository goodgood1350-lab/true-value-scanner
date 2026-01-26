import { useState } from 'react';
import { Camera, Zap } from 'lucide-react';

// 1. 明確定義介面
interface BarcodeScannerProps {
  onScan?: (code: string) => void;
}

// 2. 使用 React.FC 或直接在參數處標註類型
export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');

  const startScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const code = '0123456789052';
      setScanResult(code);
      setIsScanning(false);
      
      // 3. 呼叫前進行安全檢查
      if (onScan) {
        onScan(code);
      }
    }, 1500);
  };

  const resetScan = () => {
    setScanResult('');
    setIsScanning(false);
  };

  // ... 其餘 UI 邏輯保持不變 ...
  if (isScanning) {
    return (
      <div className="p-6 text-center">
        <div className="w-64 h-64 mx-auto mb-4 bg-green-100 rounded-xl border-4 border-green-400 animate-pulse flex items-center justify-center">
          <Zap className="w-12 h-12 text-green-600 animate-spin" />
        </div>
        <p className="text-lg font-semibold text-green-700">Scanning...</p>
        <button onClick={resetScan} className="mt-4 px-6 py-2 bg-gray-200 rounded-lg">
          Cancel
        </button>
      </div>
    );
  }

  if (scanResult) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <Zap className="w-8 h-8 text-green-600" />
        </div>
        <p className="text-2xl font-bold text-gray-800 mb-2">{scanResult}</p>
        <p className="text-green-700 mb-4">Scanned successfully!</p>
        <button onClick={resetScan} className="px-6 py-2 bg-blue-500 text-white rounded-lg">
          Scan Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 text-center">
      <div className="w-20 h-20 bg-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
        <Camera className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Scan Product Barcode</h3>
      <p className="text-gray-500 text-sm mb-6">Click to test scanner</p>
      <button 
        onClick={startScan} 
        className="w-full max-w-sm px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700"
      >
        Start Scanning
      </button>
    </div>
  );
}
