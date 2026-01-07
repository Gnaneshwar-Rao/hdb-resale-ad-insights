import Link from 'next/link';
import { Building2 } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg font-headline">HDB Insights</span>
        </Link>
      </div>
    </header>
  );
}
