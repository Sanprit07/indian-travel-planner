'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { DestinationCard } from '@/components/destination-card';
import { destinations, getAllRegions, searchDestinations } from '@/lib/destination-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, X } from 'lucide-react';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [maxBudget, setMaxBudget] = useState<number>(50000);

  const regions = getAllRegions();

  // Filter and search destinations
  const filteredDestinations = useMemo(() => {
    let results = destinations;

    // Apply search
    if (searchQuery) {
      results = searchDestinations(searchQuery);
    }

    // Apply region filter
    if (selectedRegion) {
      results = results.filter(d => d.region === selectedRegion);
    }

    // Apply budget filter
    results = results.filter(d => d.budget.low <= maxBudget);

    return results;
  }, [searchQuery, selectedRegion, maxBudget]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Explore Destinations</h1>
            <p className="text-muted-foreground">
              Discover {filteredDestinations.length} amazing destinations across India
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <Card className="p-6 space-y-6 sticky top-20">
                <div>
                  <h3 className="font-semibold mb-3 text-foreground">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search destinations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Region Filter */}
                <div>
                  <h3 className="font-semibold mb-3 text-foreground">Region</h3>
                  <div className="space-y-2">
                    <Button
                      variant={selectedRegion === null ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setSelectedRegion(null)}
                    >
                      All Regions
                    </Button>
                    {regions.map((region) => (
                      <Button
                        key={region}
                        variant={selectedRegion === region ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setSelectedRegion(region)}
                      >
                        {region}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Budget Filter */}
                <div>
                  <h3 className="font-semibold mb-3 text-foreground">Budget Per Day</h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="5000"
                      max="50000"
                      step="5000"
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-sm text-muted-foreground">
                      Up to ₹{maxBudget.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchQuery || selectedRegion || maxBudget !== 50000) && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedRegion(null);
                      setMaxBudget(50000);
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </Card>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-3">
              {filteredDestinations.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredDestinations.map((destination) => (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    No destinations found. Try adjusting your filters.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
