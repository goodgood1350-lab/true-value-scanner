import { useState } from 'react';
import { Scan, Upload, Link } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function InputTabs() {
  const [activeTab, setActiveTab] = useState('scan');

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-1 shadow-lg">
          <TabsTrigger value="scan" className="rounded-xl py-3 font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            <Scan className="w-4 h-4 mr-1" /> Scan
          </TabsTrigger>
          <TabsTrigger value="upload" className="rounded-xl py-3 font-semibold data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <Upload className="w-4 h-4 mr-1" /> Upload
          </TabsTrigger>
          <TabsTrigger value="url" className="rounded-xl py-3 font-semibold data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            <Link className="w-4 h-4 mr-1" /> URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="mt-8 p-8 border rounded-2xl bg-gradient-to-br from-blue-50">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
              <Scan className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Barcode Scanner Ready</h3>
            <p className="text-gray-600 mb-8">Click "Start Scanning" to test</p>
            <div className="w-32 h-32 bg-green-100 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
              <Scan className="w-12 h-12 text-green-600 animate-pulse" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="mt-8 p-8 border rounded-2xl bg-gradient-to-br from-purple-50">
          <div className="text-center">
            <div className="w-24 h-24 bg-purple-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
              <Upload className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Image Upload Ready</h3>
            <p className="text-gray-600 mb-8">Drag & drop product photos</p>
            <div className="w-48 h-48 bg-white border-4 border-dashed border-purple-300 rounded-3xl mx-auto flex items-center justify-center shadow-xl hover:border-purple-400 transition-all">
              <Upload className="w-16 h-16 text-purple-400" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="url" className="mt-8 p-8 border rounded-2xl bg-gradient-to-br from-emerald-50">
          <div className="text-center">
            <div className="w-24 h-24 bg-emerald-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
              <Link className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Product URL Ready</h3>
            <p className="text-gray-600 mb-8">Paste any product image URL</p>
            <div className="max-w-lg mx-auto p-8 bg-white border-2 border-dashed border-emerald-300 rounded-2xl hover:border-emerald-400 transition-all">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl mb-4 font-mono text-sm">
                https://example.com/product.jpg
              </div>
              <p className="text-gray-500">Ready to analyze</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
