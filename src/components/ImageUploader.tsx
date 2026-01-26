import { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ImageUploaderProps {
  onUpload: (imageData: string) => void;
}

export const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = useCallback(async (file: File) => {
    setIsProcessing(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      
      // Simulate AI processing delay
      setTimeout(() => {
        setIsProcessing(false);
        onUpload(dataUrl);
      }, 1500);
    };
    reader.readAsDataURL(file);
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  }, [processImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <Card>
      <CardContent className="p-4">
        {!preview ? (
          <label 
            className={`flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-1">Upload Product Image</h3>
              <p className="text-sm text-muted-foreground mb-2">Drag & drop or tap to select</p>
              <p className="text-xs text-muted-foreground">Supports JPG, PNG, WEBP</p>
            </div>
          </label>
        ) : (
          <div className="relative">
            <img src={preview} alt="Preview" className="w-full h-64 object-contain rounded-lg" />
            {isProcessing && (
              <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="text-sm font-medium">Analyzing image...</p>
              </div>
            )}
            {!isProcessing && (
              <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={clearPreview}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
