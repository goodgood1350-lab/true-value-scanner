import { useState, useCallback } from 'react';
import { Camera, Zap, Square } from 'lucide-react';

interface BarcodeScannerProps {
  onScan?: (code: string) => void;
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const startScan = useCallback(async () => {
    try {
      // Demo mode for Codespaces/iPad - no real camera needed
      console.log('True Value Scanner: Demo mode active');
      
      const mockCodes: string[] = [
        '0123456789052', // UPC-A Milk
        '1234567890123', // UPC-A Cereal  
        '4901234567894'  // EAN-13 Example
      ];
      
      const randomCode = mockCodes[Math.floor(Math.random() * mockCodes.length)];
      
      setIsScanning(true);
      setTimeout(() => {
        setScanResult(randomCode);
        setIsScanning(false);
        onScan?.(randomCode);
      }, 1500);
      
    } catch (error) {
      console.log('Demo scanner fallback');
      const randomCode = '0123456789052';
      setIsScanning(true);
      setTimeout(() => {
        setScanResult(randomCode);
        setIsScanning(false);
        onScan?.(randomCode);
      }, 1000);
    }
  }, [onScan]);

  const resetScan = () => {
    setScanResult('');
    setIsScanning(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-background rounded-lg border shadow-sm">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          {isScanning ? <Zap className="w-10 h-10 text-white animate-pulse" /> : <Camera className="w-10 h-10 text-white" />}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Scan Product Barcode</h3>
        <p className="text-sm text-muted-foreground">Tap to scan (Demo Mode)</p>
      </div>

      {isScanning ? (
        <div className="space-y-4">
          <div className="relative">
            <div className="w-full h-64 bg-gradient-to-b from-green-500/10 to-transparent rounded-xl border-4 border-dashed border-green-400 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-1 bg-green-400 rounded-full animate-[scan_2s_infinite]"></div>
              </div>
            </div>
            <p className="text-center mt-3 text-sm font-medium text-green-600">Scanning...</p>
          </div>
          <button
            onClick={resetScan}
            className="flex-1 h-12 bg-background border rounded-xl text-sm font-medium hover:bg-accent"
          >
            <Square className="w-4 h-4 mr-2 inline" />
            Cancel
          </button>
        </div>
      ) : scanResult ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-800 mb-1 tracking-wide">{scanResult}</p>
            <p className="text-sm text-green-700">Scanned successfully!</p>
          </div>
          <button
            onClick={resetScan}
            className="w-full h-12 bg-background border rounded-xl text-sm font-medium hover:bg-accent"
          >
            Scan Again
          </button>
        </div>
      ) : (
        <button
          onClick={startScan}
          className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Camera className="w-5 h-5" />
          Start Scanning
        </button>
      )}
    </div>
  );
}
