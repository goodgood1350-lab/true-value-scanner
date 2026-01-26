import { useState } from 'react';
import { Scan, Upload, Link } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ✅ MOCK COMPONENTS - NO IMPORT ERRORS
const BarcodeScanner = () => (
  <div className="p-8 text-center">
    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
      <Scan className="w-12 h-12 text-white" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">Barcode Scanner</h3>
    <p className="text-gray-600 mb-6">Scan product barcodes instantly</p>
    <div className="w-32 h-32 bg-green-100 rounded-2xl mx-auto flex items-center justify-center animate-pulse">
      <Scan className="w-8 h-8 text-green-600" />
    </div>
    <p className="text-sm text-green-700 mt-3 font-medium">Ready to scan!</p>
  </div>
);

const ImageUploader = () => (
  <div className="p-8 text-center">
    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
      <Upload className="w-12 h-12 text-white" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">Upload Product Image</h3>
    <p className="text-gray-600 mb-6">Drag & drop or click to upload</p>
    <div className="w-40 h-40 bg-gray-100 border-4 border-dashed border-gray-300 rounded-2xl mx-auto flex items-center justify-center hover:border-purple-400 transition-all duration-200">
      <Upload className="w-12 h-12 text-gray-400" />
    </div>
    <p className="text-sm text-muted-foreground mt-3">Supports JPG, PNG, WEBP</p>
  </div>
);

const URLInput = () => (
  <div className="p-8 text-center">
    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
      <Link className="w-12 h-12 text-white" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">Product URL</h3>
    <p className="text-gray-600 mb-6">Enter image URL from any store</p>
    <div className="max-w-md mx-auto p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl hover:border-emerald-400 transition-all duration-200">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl mb-4">
        https://example.com/product.jpg
      </div>
      <p className="text-sm text-muted-foreground">Paste URL and analyze instantly</p>
    </div>
  </div>
);

export function InputTabs() {
  const [activeTab, setActiveTab] = useState('scan');

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 p-1 rounded-2xl shadow-lg backdrop-blur-sm">
          <TabsTrigger 
            value="scan" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl py-3 font-semibold transition-all duration-200"
          >
            <Scan className="w-5 h-5 mr-2" />
            Scan
          </TabsTrigger>
          <TabsTrigger 
            value="upload" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl py-3 font-semibold transition-all duration-200"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger 
            value="url" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-xl py-3 font-semibold transition-all duration-200"
          >
            <Link className="w-5 h-5 mr-2" />
            URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="mt-6 p-1 rounded-2xl">
          <BarcodeScanner />
        </TabsContent>
        <TabsContent value="upload" className="mt-6 p-1 rounded-2xl">
          <ImageUploader />
        </TabsContent>
        <TabsContent value="url" className="mt-6 p-1 rounded-2xl">
          <URLInput />
        </TabsContent>
      </Tabs>
    </div>
  );
}
