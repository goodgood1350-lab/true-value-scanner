import { useState, useRef, useCallback } from 'react';
import { Camera, X, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export const BarcodeScanner = ({ onScan }: BarcodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startScanning = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
      }
    } catch (err) {
      setError('Camera access denied. Please enable camera permissions.');
      console.error('Camera error:', err);
    }
  }, []);

  const stopScanning = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  }, []);

  const handleDemoScan = () => {
    // Demo barcode for SK-II essence
    onScan('4967819220014');
    stopScanning();
  };

  return (
    <Card>
      <CardContent className="p-4">
        {!isScanning ? (
          <div className="text-center space-y-4">
            <div className="mx-auto h-32 w-32 rounded-full bg-muted flex items-center justify-center">
              <Camera className="h-16 w-16 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Scan Barcode</h3>
              <p className="text-sm text-muted-foreground">Point your camera at a product barcode</p>
            </div>
            <div className="space-y-2">
              <Button onClick={startScanning} className="w-full">
                <Scan className="mr-2 h-4 w-4" /> Start Scanning
              </Button>
              <Button variant="outline" onClick={handleDemoScan} className="w-full">
                Use Demo Barcode
              </Button>
            </div>
            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}
          </div>
        ) : (
          <div className="relative">
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
            <div className="absolute top-4 right-4">
              <Button variant="destructive" size="icon" onClick={stopScanning}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <Button variant="secondary" onClick={handleDemoScan}>
                Use Demo Barcode
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
