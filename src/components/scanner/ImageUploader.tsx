import { useState } from 'react';
import { Upload, Image, CheckCircle } from 'lucide-react';

export function ImageUploader({ onUpload }: { onUpload?: (file: File) => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        onUpload?.(droppedFile);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        onUpload?.(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-background rounded-lg border shadow-sm">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Image className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Product Image</h3>
        <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
      </div>

      {uploadedImage ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <img src={uploadedImage} alt="Uploaded" className="w-32 h-32 object-cover rounded-xl mx-auto mb-2 shadow-md" />
            <p className="text-sm text-green-700 font-medium">Image uploaded successfully!</p>
          </div>
        </div>
      ) : (
        <div 
          className={`relative p-8 border-2 border-dashed rounded-2xl transition-all duration-200 ${
            dragActive 
              ? 'border-blue-400 bg-blue-50 shadow-lg scale-105' 
              : 'border-muted hover:border-primary/50'
          }`}
          onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-center">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-1">Drop your image here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-xs font-medium cursor-pointer hover:bg-primary/90">
              Choose File
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
