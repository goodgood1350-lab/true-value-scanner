import { useState } from 'react';
import { Scan, Upload, Link } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function InputTabs() {
  const [activeTab, setActiveTab] = useState('scan');

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tab Headers */}
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-slate-50 to-blue-50 border rounded-2xl p-1 shadow-lg mb-8">
          <TabsTrigger 
            value="scan" 
            className="rounded-xl py-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white shadow-md transition-all"
          >
            <Scan className="w-5 h-5 mr-2" />
            Scan
          </TabsTrigger>
          
          <TabsTrigger 
            value="upload" 
            className="rounded-xl py-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white shadow-md transition-all"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload
          </TabsTrigger>
          
          <TabsTrigger 
            value="url" 
            className="rounded-xl py-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white shadow-md transition-all"
          >
            <Link className="w-5 h-5 mr-2" />
            URL
          </TabsTrigger>
        </TabsList>

        {/* Scan Tab */}
        <TabsContent value="scan" className="p-0">
          <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border shadow-xl">
            <div className="text-center mb-8">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Scan className="w-14 h-14 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Barcode Scanner
              </h2>
              <p className="text-xl text-gray-600">Scan product barcodes instantly</p>
            </div>
            <div className="w-48 h-48 bg-white/70 backdrop-blur-sm rounded-3xl mx-auto border-4 border-dashed border-blue-300 flex items-center justify-center shadow-2xl animate-pulse">
              <Scan className="w-20 h-20 text-blue-500 animate-spin" />
            </div>
            <p className="text-center mt-6 text-blue-600 font-semibold text-lg">Ready to scan! 👆</p>
          </div>
        </TabsContent>

        {/* Upload Tab */}
        <TabsContent value="upload" className="p-0">
          <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border shadow-xl">
            <div className="text-center mb-8">
              <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Upload className="w-14 h-14 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Image Upload
              </h2>
              <p className="text-xl text-gray-600">Drag & drop product photos</p>
            </div>
            <div className="w-64 h-64 bg-white/70 backdrop-blur-sm border-4 border-dashed border-purple-300 rounded-3xl mx-auto flex items-center justify-center hover:border-purple-400 transition-all duration-300 shadow-xl">
              <Upload className="w-24 h-24 text-purple-400" />
            </div>
            <p className="text-center mt-6 text-purple-600 font-semibold text-lg">Supports JPG, PNG, WEBP</p>
          </div>
        </TabsContent>

        {/* URL Tab */}
        <TabsContent value="url" className="p-0">
          <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border shadow-xl">
            <div className="text-center mb-8">
              <div className="w-28 h-28 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Link className="w-14 h-14 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                Product URL
              </h2>
              <p className="text-xl text-gray-600">Paste image URL from any store</p>
            </div>
            <div className="max-w-2xl mx-auto p-8 bg-white/70 backdrop-blur-sm border-2 border-dashed border-emerald-300 rounded-3xl hover:border-emerald-400 transition-all duration-300 shadow-xl">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl mb-6 font-mono text-lg font-semibold shadow-lg">
                https://example.com/product-image.jpg
              </div>
              <p className="text-center text-emerald-600 font-semibold text-lg">Ready to analyze any URL</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
