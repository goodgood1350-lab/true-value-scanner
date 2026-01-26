import { useState } from 'react';
import { Link, Check, Copy } from 'lucide-react';

export function URLInput({ onSubmit }: { onSubmit?: (url: string) => void }) {
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit?.(url.trim());
      setSubmitted(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-background rounded-lg border shadow-sm">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Link className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Product URL</h3>
        <p className="text-sm text-muted-foreground">Enter image URL from any website</p>
      </div>

      {submitted ? (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-foreground font-semibold text-lg mb-2 truncate max-w-full">{url}</p>
            <p className="text-sm text-emerald-700">URL submitted successfully!</p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setUrl('');
            }}
            className="w-full h-12 bg-background border rounded-xl text-sm font-medium hover:bg-accent flex items-center justify-center gap-2"
          >
            Add Another URL
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/product-image.jpg"
              className="w-full px-4 py-3 border border-input rounded-xl bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-14"
              required
            />
            <button
              type="button"
              onClick={copyToClipboard}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-accent rounded-lg"
              title="Copy URL"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <button
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Link className="w-5 h-5" />
            Analyze URL
          </button>
        </form>
      )}
    </div>
  );
}
