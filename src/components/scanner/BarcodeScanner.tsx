// src/components/BarcodeScanner.tsx
import { useState, useRef, useCallback } from 'react';
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
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // 安全存取：確保 streamRef.current 不為 null 再賦值
        streamRef.current = stream;
        setIsScanning(true);
      }
    } catch (err: any) {
      setError('相機存取被拒絕，請在瀏覽器設定中允許相機權限。');
      console.error('相機錯誤:', err);
    }
  }, []);

  const stopScanning = useCallback(() => {
    if (streamRef.current) {
      // 安全停止所有軌道
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  }, []);

  const handleDemoScan = () => {
    // 模擬 SK-II 條碼
    const demoCode = '4967819220014';
    onScan(demoCode);
    stopScanning();
  };

  // 清理效果：組件卸載時停止相機
  useCallback(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        {!isScanning ? (
          <div className="text-center space-y-6">
            <div className="mx-auto h-32 w-32 rounded-full bg-muted flex items-center justify-center">
              <Camera className="h-16 w-16 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">掃描條碼</h3>
              <p className="text-sm text-muted-foreground mb-4">
                將相機對準產品條碼
              </p>
            </div>
            <div className="space-y-3">
              <Button onClick={startScanning} className="w-full" size="lg">
                <Scan className="mr-2 h-5 w-5" /> 開始掃描
              </Button>
              <Button variant="outline" onClick={handleDemoScan} className="w-full">
                使用 Demo 條碼（SK-II）
              </Button>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>錯誤</AlertTitle>
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
              className="w-full rounded-lg aspect-video bg-black"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <div className="w-3/4 h-1 bg-white/50 relative overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-white animate-scan" />
              </div>
              <p className="mt-4 text-white font-medium">掃描中...</p>
            </div>
            <div className="absolute top-4 right-4">
              <Button variant="destructive" size="icon" onClick={stopScanning}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <Button variant="secondary" onClick={handleDemoScan}>
                使用 Demo 條碼
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
