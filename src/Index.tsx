import { Sparkles, Shield, TrendingUp } from 'lucide-react';
import { InputTabs } from '@/components/scanner/InputTabs';
import { ResultsCard } from '@/components/scanner/ResultsCard';
import { useProductAnalysis } from '@/hooks/useProductAnalysis';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const { analysis, isLoading, error, analyze, reset } = useProductAnalysis();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Header */}
      <header className="p-4">
        <Card className="glass">
          <CardContent className="p-4 flex items-center justify-between">
            <Sparkles className="h-6 w-6 text-primary" />
            <div className="text-center">
              <h1 className="font-bold text-xl">True-Value Scanner</h1>
              <p className="text-xs text-muted-foreground">Smart Beauty Shopping</p>
            </div>
            <Shield className="h-6 w-6 text-success" />
          </CardContent>
        </Card>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6">
        {!analysis && !isLoading && (
          <>
            {/* Hero Section */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold gradient-text">Know Your True Cost</h2>
              <p className="text-muted-foreground">Scan any beauty product to reveal its real value through AI-powered analysis</p>
            </div>

            {/* Feature Pills */}
            <div className="flex justify-center gap-2">
              <Badge variant="secondary" className="gap-1"><TrendingUp className="h-3 w-3" /> Cost Per Use</Badge>
              <Badge variant="secondary" className="gap-1"><Leaf className="h-3 w-3" /> ESG Rating</Badge>
              <Badge variant="secondary" className="gap-1">💰 Resale Value</Badge>
            </div>

            {/* Input Methods */}
            <InputTabs onScan={analyze} />

            {/* Error Message */}
            {error && (
              <Card className="border-destructive">
                <CardContent className="p-4 text-destructive">{error}</CardContent>
              </Card>
            )}
          </>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card className="glass">
            <CardContent className="p-6 space-y-4 text-center">
              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <h3 className="font-semibold">Analyzing Product</h3>
              <p className="text-sm text-muted-foreground">Calculating true value metrics...</p>
              <div className="space-y-2">
                <Progress value={33} className="animate-pulse-slow" />
                <Progress value={66} className="animate-pulse-slow delay-300" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {analysis && !isLoading && (
          <ResultsCard data={analysis} onReset={reset} />
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-muted-foreground">
        Made for Hong Kong's smart beauty shoppers 🇭🇰
      </footer>
    </div>
  );
};

export default Index;
