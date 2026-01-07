"use server";

import { resaleData, towns, type ResaleData } from './data';

// Simulate network delay to mimic real-world API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getTowns(): Promise<string[]> {
  await delay(50);
  return towns;
}

export async function getResaleDataForTown(town: string): Promise<ResaleData[]> {
  await delay(450); // Simulate BigQuery latency
  return resaleData
    .filter(d => d.town === town)
    .sort((a, b) => new Date(b.month).getTime() - new Date(a.month).getTime())
    .slice(0, 50); // Paginate for performance
}

export async function getAveragePriceForTown(town: string): Promise<number | null> {
  await delay(300); // Simulate BigQuery latency
  const townData = resaleData.filter(d => d.town === town);
  if (townData.length === 0) return null;
  
  const total = townData.reduce((sum, item) => sum + item.resale_price, 0);
  return Math.round(total / townData.length);
}

export async function getListingById(id: string): Promise<ResaleData | undefined> {
  await delay(150);
  return resaleData.find(d => d.id === id);
}
