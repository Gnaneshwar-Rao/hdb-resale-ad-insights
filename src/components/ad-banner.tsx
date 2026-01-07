"use client";

import { useState, useEffect } from 'react';
import { getAveragePriceForTown } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BadgeDollarSign, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const INTENT_COOKIE_NAME = 'intent_town';
const CONSENT_COOKIE_NAME = 'hdb_insights_consent';

const getCookieValue = (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

export function AdBanner() {
  const [topTown, setTopTown] = useState<string | null>(null);
  const [avgPrice, setAvgPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = getCookieValue(CONSENT_COOKIE_NAME) === 'true';
    setHasConsent(consent);

    if (consent) {
      const intentCookie = getCookieValue(INTENT_COOKIE_NAME);
      if (intentCookie) {
        try {
          const intentData = JSON.parse(decodeURIComponent(intentCookie));
          const top = Object.keys(intentData).reduce((a, b) => (intentData[a] > intentData[b] ? a : b), '');
          if (top) {
            setTopTown(top);
          } else {
            setIsLoading(false);
          }
        } catch (e) {
          console.error('Failed to parse intent cookie', e);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (topTown) {
      setIsLoading(true);
      getAveragePriceForTown(topTown).then(price => {
        setAvgPrice(price);
        setIsLoading(false);
      });
    }
  }, [topTown]);

  if (hasConsent === null) {
    return <Skeleton className="h-24 w-full" />;
  }

  if (!hasConsent) {
    return null;
  }
  
  if (isLoading) {
    return <Skeleton className="h-24 w-full rounded-lg" />;
  }

  if (!topTown || avgPrice === null) {
    return (
      <Alert className="bg-secondary">
        <TrendingUp className="h-4 w-4" />
        <AlertTitle className="font-headline">Welcome to HDB Insights!</AlertTitle>
        <AlertDescription>
          Start browsing towns to get personalized deal alerts right here.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-primary/50 bg-accent/30 transition-all duration-300 ease-in-out">
      <BadgeDollarSign className="h-4 w-4 text-primary" />
      <AlertTitle className="font-headline text-primary-foreground">Hot Deal Alert!</AlertTitle>
      <AlertDescription>
        Looking in <span className="font-bold">{topTown}</span>? The latest average price is{' '}
        <span className="font-bold">${avgPrice.toLocaleString()}!</span>
      </AlertDescription>
    </Alert>
  );
}
