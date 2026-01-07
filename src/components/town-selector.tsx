"use client";

import { useEffect, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getTowns } from '@/lib/actions';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const INTENT_COOKIE_NAME = 'intent_town';
const CONSENT_COOKIE_NAME = 'hdb_insights_consent';

const getCookieValue = (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

export function TownSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [towns, setTowns] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const selectedTown = searchParams.get('town')?.toUpperCase() || '';

  useEffect(() => {
    getTowns().then(setTowns);
  }, []);

  const handleTownChange = (newTown: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('town', newTown);
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });

    const consent = getCookieValue(CONSENT_COOKIE_NAME);
    if (consent === 'true') {
        try {
            const currentIntentRaw = getCookieValue(INTENT_COOKIE_NAME);
            const currentIntent = currentIntentRaw ? JSON.parse(decodeURIComponent(currentIntentRaw)) : {};
            currentIntent[newTown] = (currentIntent[newTown] || 0) + 1;
            setCookie(INTENT_COOKIE_NAME, encodeURIComponent(JSON.stringify(currentIntent)), 30);
        } catch (e) {
            console.error("Failed to update intent cookie", e);
            const newIntent = {[newTown]: 1};
            setCookie(INTENT_COOKIE_NAME, encodeURIComponent(JSON.stringify(newIntent)), 30);
        }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="town-select" className="text-lg font-headline">
        Find Your Town
      </Label>
      <Select onValueChange={handleTownChange} value={selectedTown} disabled={isPending}>
        <SelectTrigger id="town-select" className="w-full md:w-[320px] bg-card">
          <SelectValue placeholder="Select a town to see price trends..." />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                {towns.map(town => (
                    <SelectItem key={town} value={town}>{town}</SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
