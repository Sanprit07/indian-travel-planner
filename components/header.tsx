'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <MapPin className="w-6 h-6" />
          <span>TripSync</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/explore" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Explore
          </Link>
          <Link href="/itinerary" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Plan Trip
          </Link>
          <Link href="/budget" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Budget
          </Link>
          <Link href="/community" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
            Community
          </Link>
        </nav>

        {/* CTA Button */}
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/explore">Start Exploring</Link>
        </Button>
      </div>
    </header>
  );
}
