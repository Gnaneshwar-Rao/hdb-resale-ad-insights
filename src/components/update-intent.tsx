"use client";

import { useEffect } from 'react';

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

export function UpdateIntent({ town }: { town: string }) {
  useEffect(() => {
    if (!town) return;

    const consent = getCookieValue(CONSENT_COOKIE_NAME);
    if (consent === 'true') {
        try {
            const currentIntentRaw = getCookieValue(INTENT_COOKIE_NAME);
            const currentIntent = currentIntentRaw ? JSON.parse(decodeURIComponent(currentIntentRaw)) : {};
            currentIntent[town] = (currentIntent[town] || 0) + 1;
            setCookie(INTENT_COOKIE_NAME, encodeURIComponent(JSON.stringify(currentIntent)), 30);
        } catch (e) {
            console.error("Failed to update intent cookie on listing page", e);
            const newIntent = {[town]: 1};
            setCookie(INTENT_COOKIE_NAME, encodeURIComponent(JSON.stringify(newIntent)), 30);
        }
    }
  }, [town]);

  return null;
}
