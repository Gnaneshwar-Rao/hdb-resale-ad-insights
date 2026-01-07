import { Suspense } from 'react';
import { AdBanner } from '@/components/ad-banner';
import { PriceTrends } from '@/components/price-trends';
import { PriceTrendsSkeleton } from '@/components/price-trends-skeleton';
import { TownSelector } from '@/components/town-selector';

export default function HomePage({
  searchParams,
}: {
  searchParams: { town?: string };
}) {
  const selectedTown = searchParams.town?.toUpperCase() || 'ANG MO KIO';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight font-headline text-foreground">
            HDB Resale Market Insights
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore historical resale prices, identify trends, and find your next
            home with our data-driven portal.
          </p>
        </div>
        
        <div className="sticky top-[65px] z-30 py-4 bg-background/95 backdrop-blur-sm -mx-4 px-4">
            <AdBanner />
        </div>

        <div className="animate-fade-in-delay">
          <TownSelector />
        </div>
        
        <Suspense fallback={<PriceTrendsSkeleton />}>
          <PriceTrends town={selectedTown} />
        </Suspense>
      </div>
    </div>
  );
}
