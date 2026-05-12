'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { MapPin, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary hover:text-primary/80 transition-colors">
            <MapPin className="w-5 h-5" />
            <span className="hidden sm:inline">TripSync</span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary hover:text-primary/80 transition-colors duration-200">
          <div className="p-1.5 bg-gradient-primary-secondary rounded-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span className="hidden sm:inline text-foreground">TripSync</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: '/explore', label: 'Explore' },
            { href: '/itinerary', label: 'Plan Trip' },
            { href: '/budget', label: 'Budget' },
            { href: '/community', label: 'Community' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary-secondary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full hover:bg-muted transition-colors duration-200"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* CTA Button - Desktop */}
          <Button asChild className="hidden sm:inline-flex bg-gradient-primary-secondary hover:opacity-90 transition-opacity duration-200 text-primary-foreground">
            <Link href="/explore">Explore</Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-full hover:bg-muted transition-colors duration-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/90 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {[
              { href: '/explore', label: 'Explore' },
              { href: '/itinerary', label: 'Plan Trip' },
              { href: '/budget', label: 'Budget' },
              { href: '/community', label: 'Community' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 px-2 py-2"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="w-full bg-gradient-primary-secondary hover:opacity-90 transition-opacity duration-200 text-primary-foreground mt-2">
              <Link href="/explore">Start Exploring</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
