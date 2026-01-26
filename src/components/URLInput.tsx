import { useState } from 'react';
import { Link, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface URLInputProps {
  onSubmit: (url: string) => void;
}

export const URLInput = ({ onSubmit }: URLInputProps) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError('Please enter a product URL');
      return;
    }

    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    
    // Simulate URL processing
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(url);
      setUrl('');
    }, 1500);
  };

  const handleDemoURL = () => {
    const demoUrl = 'https://www.sephora.hk/products/sk-ii-facial-treatment-essence';
    setUrl(demoUrl);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(demoUrl);
      setUrl('');
    }, 1500);
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Paste Product URL</h3>
          <p className="text-sm text-muted-foreground">From Sephora, Watsons, or any beauty retailer</p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input 
            type="url"
            placeholder="https://example.com/product"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </form>

        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}

        <Button variant="outline" onClick={handleDemoURL} className="w-full" disabled={isLoading}>
          Try demo: SK-II Facial Treatment Essence
        </Button>
      </CardContent>
    </Card>
  );
};
