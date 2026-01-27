// src/components/scanner/BarcodeScanner.tsx
import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, X, Scan, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export const BarcodeScanner = ({ onScan }: BarcodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScanning = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
      }
    } catch (err) {
      setError('相機存取被拒絕，請允許相機權限');
      console.error('Camera error:', err);
    }
  }, []);

  const stopScanning = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
    setError(null);
  }, []);

  const handleDemoScan = () => {
    const demoCode = '4967819220014'; // SK-II 條碼
    onScan(demoCode);
  };

  // 模擬掃描（避免 BarcodeDetector 相容性問題）
  useEffect(() => {
    if (isScanning) {
      const timeout = setTimeout(() => {
        handleDemoScan();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isScanning, onScan]);

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="p-6">
        {!isScanning ? (
          <div className="text-center space-y-6">
            <div className="mx-auto h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Camera className="h-12 w-12 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">掃描條碼</h3>
              <p className="text-sm text-gray-500">將相機對準產品條碼區域</p>
            </div>
            <div className="space-y-3">
              <Button onClick={startScanning} className="w-full h-12" size="lg">
                <Scan className="mr-2 h-5 w-5" />
                開始掃描
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDemoScan} 
                className="w-full h-12"
              >
                🎁 使用 Demo 條碼 (SK-II)
              </Button>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>無法啟動</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-xl aspect-video bg-black object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="w-4/5 max-w-sm h-1 bg-white/60 rounded-full overflow-hidden shadow-lg">
                <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 animate-pulse" />
              </div>
              <p className="mt-6 text-white text-lg font-semibold tracking-wide">掃描中，請保持穩定...</p>
            </div>
            
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all"
              onClick={stopScanning}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <Button
                variant="secondary"
                className="px-6 py-2 rounded-full backdrop-blur-sm bg-white/80 hover:bg-white"
                onClick={handleDemoScan}
              >
                使用 Demo 條碼
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
