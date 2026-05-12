'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { INDIA_DESTINATIONS } from '@/lib/india-destinations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Search, Star, Calendar } from 'lucide-react';

const COST_RANGES = [
  { label: 'Budget (₹0-500)', min: 0, max: 500 },
  { label: 'Mid-Range (₹500-1000)', min: 500, max: 1000 },
  { label: 'Luxury (₹1000+)', min: 1000, max: Infinity },
];

const STATES = Array.from(new Set(INDIA_DESTINATIONS.map(d => d.state))).sort();

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCostRange, setSelectedCostRange] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating');

  const filteredDestinations = useMemo(() => {
    let results = INDIA_DESTINATIONS;

    // Search filter
    if (searchTerm) {
      results = results.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // State filter
    if (selectedState) {
      results = results.filter(d => d.state === selectedState);
    }

    // Cost range filter
    if (selectedCostRange) {
      const range = COST_RANGES.find(r => r.label === selectedCostRange);
      if (range) {
        results = results.filter(d => {
          const cost = d.costPerDay.budget.total;
          return cost >= range.min && cost < range.max;
        });
      }
    }

    // Rating filter
    if (minRating > 0) {
      results = results.filter(d => d.rating >= minRating);
    }

    // Sort
    results.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.costPerDay.budget.total - b.costPerDay.budget.total;
        case 'price-high':
          return b.costPerDay.budget.total - a.costPerDay.budget.total;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    return results;
  }, [searchTerm, selectedState, selectedCostRange, minRating, sortBy]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-primary-secondary py-20 md:py-28 px-4 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl font-bold text-white text-balance tracking-tight leading-tight">
                Discover India&apos;s <br />
                <span className="text-white/90">Best Destinations</span>
              </h1>
              <p className="text-xl text-white/85 max-w-3xl font-light leading-relaxed">
                Browse {INDIA_DESTINATIONS.length}+ curated destinations across all Indian states. Find your perfect getaway with advanced filters and personalized recommendations.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6 bg-card p-7 rounded-xl border border-border/50 shadow-premium">
                <div>
                  <h3 className="font-bold text-lg text-foreground">Refine Search</h3>
                </div>

                {/* Search */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Search Destination</label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-input border-border/50 text-sm"
                    />
                  </div>
                </div>

                {/* State Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border/50 bg-input text-sm font-medium transition-colors focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All States</option>
                    {STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* Budget Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Budget Range</label>
                  <select
                    value={selectedCostRange}
                    onChange={(e) => setSelectedCostRange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border/50 bg-input text-sm font-medium transition-colors focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Budgets</option>
                    {COST_RANGES.map(range => (
                      <option key={range.label} value={range.label}>{range.label}</option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Minimum Rating</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={minRating}
                      onChange={(e) => setMinRating(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <span className="text-sm font-semibold min-w-12 text-center">
                      {minRating > 0 && `${minRating.toFixed(1)}★`}
                      {minRating === 0 && 'Any'}
                    </span>
                  </div>
                </div>

                {/* Sort */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border/50 bg-input text-sm font-medium transition-colors focus:ring-2 focus:ring-primary"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedState || selectedCostRange || minRating > 0) && (
                  <Button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedState('');
                      setSelectedCostRange('');
                      setMinRating(0);
                    }}
                    variant="outline"
                    className="w-full border-border/50 hover:bg-muted text-sm font-medium transition-colors"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-foreground">
                  {filteredDestinations.length} Destination{filteredDestinations.length !== 1 ? 's' : ''} Found
                </h2>
              </div>

              {filteredDestinations.length === 0 ? (
                <Card className="border border-border/50 bg-card/50">
                  <CardContent className="py-16 text-center">
                    <div className="text-6xl mb-6">🗺️</div>
                    <p className="text-muted-foreground text-lg mb-6 font-light">No destinations found matching your filters.</p>
                    <Button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedState('');
                        setSelectedCostRange('');
                        setMinRating(0);
                      }}
                      className="bg-gradient-primary-secondary hover:opacity-90 text-primary-foreground font-semibold"
                    >
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredDestinations.map(destination => (
                    <Link key={destination.id} href={`/destination/${destination.id}`}>
                      <Card className="overflow-hidden hover-lift transition-all duration-300 h-full hover:shadow-premium-xl border border-border/50 cursor-pointer bg-card">
                        <div className="relative h-64 bg-muted overflow-hidden">
                          <Image
                            src={destination.image}
                            alt={destination.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&h=300&fit=crop';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                          
                          {/* Tags */}
                          <div className="absolute top-4 right-4 flex gap-2">
                            <Badge className="bg-gradient-primary-secondary text-white hover:opacity-90 shadow-premium">
                              <Star className="h-3 w-3 mr-1.5 fill-current" />
                              {destination.rating}
                            </Badge>
                          </div>

                          {/* Title Overlay */}
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-2xl font-bold text-white text-balance leading-tight mb-1">{destination.name}</h3>
                            <p className="text-sm text-white/85 flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-primary" />
                              {destination.state}
                            </p>
                          </div>
                        </div>

                        <CardContent className="p-5 space-y-4">
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{destination.description}</p>
                          
                          {/* Price and Info */}
                          <div className="flex items-center justify-between pt-3 border-t border-border/50">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-primary" />
                              <span className="text-sm font-semibold text-foreground">₹{destination.costPerDay.budget.total}/day</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                              <Calendar className="h-3.5 w-3.5" />
                              {destination.bestTime.split(',')[0]}
                            </div>
                          </div>

                          {/* Reviews */}
                          <div className="text-xs text-muted-foreground font-medium">
                            {destination.reviews} traveler{destination.reviews !== 1 ? 's' : ''} reviewed
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
