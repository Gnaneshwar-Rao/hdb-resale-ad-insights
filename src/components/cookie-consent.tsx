"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

const COOKIE_NAME = 'hdb_insights_consent';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // This check runs only on the client, avoiding hydration mismatch
    const consent = document.cookie.split('; ').find(row => row.startsWith(`${COOKIE_NAME}=`));
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    // Set cookie to expire in 1 year
    document.cookie = `${COOKIE_NAME}=true; path=/; max-age=31536000; SameSite=Lax`;
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t p-4 z-50 shadow-lg animate-slide-in-from-bottom">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Cookie className="h-6 w-6 text-primary flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            We use cookies to personalize your experience and provide relevant deal alerts.
          </p>
        </div>
        <Button onClick={acceptCookies} size="sm">
          I Agree
        </Button>
      </div>
    </div>
  );
}
