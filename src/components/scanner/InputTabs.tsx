import { Scan, Upload, Link } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarcodeScanner } from './BarcodeScanner';
import { ImageUploader } from './ImageUploader';
import { URLInput } from './URLInput';

interface InputTabsProps {
  onScan: (data: string, type: 'barcode' | 'image' | 'url') => void;
}

export const InputTabs = ({ onScan }: InputTabsProps) => {
  return (
    <Tabs defaultValue="scan" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="scan"><Scan className="mr-2 h-4 w-4" /> Scan</TabsTrigger>
        <TabsTrigger value="upload"><Upload className="mr-2 h-4 w-4" /> Upload</TabsTrigger>
        <TabsTrigger value="url"><Link className="mr-2 h-4 w-4" /> URL</TabsTrigger>
      </TabsList>
      <TabsContent value="scan">
        <BarcodeScanner onScan={(code) => onScan(code, 'barcode')} />
      </TabsContent>
      <TabsContent value="upload">
        <ImageUploader onUpload={(data) => onScan(data, 'image')} />
      </TabsContent>
      <TabsContent value="url">
        <URLInput onSubmit={(url) => onScan(url, 'url')} />
      </TabsContent>
    </Tabs>
  );
};
