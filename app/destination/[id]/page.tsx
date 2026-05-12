'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { INDIA_DESTINATIONS } from '@/lib/india-destinations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Calendar, DollarSign, Utensils, MapPinIcon, ArrowRight, Check } from 'lucide-react';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const COST_TIERS = [
  { name: 'Budget', key: 'budget', color: 'from-green-600 to-emerald-500', icon: '🏖️' },
  { name: 'Mid-Range', key: 'mid', color: 'from-blue-600 to-cyan-500', icon: '🏨' },
  { name: 'Luxury', key: 'luxury', color: 'from-purple-600 to-pink-500', icon: '⭐' },
];

export default function DestinationDetailPage({ params }: Props) {
  const { id } = use(params);
  const destination = INDIA_DESTINATIONS.find(d => d.id === id);
  const [selectedTier, setSelectedTier] = useState<'budget' | 'mid' | 'luxury'>('budget');
  const [days, setDays] = useState(5);

  if (!destination) {
    notFound();
  }

  const costData = destination.costPerDay[selectedTier];
  const totalCost = costData.total * days;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section with Image */}
        <section className="relative h-96 md:h-[480px] bg-muted overflow-hidden">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=400&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <div className="container mx-auto max-w-6xl">
              <div className="flex items-center gap-3 mb-6">
                <Badge className="bg-gradient-primary-secondary text-white hover:opacity-90 shadow-premium">
                  <Star className="h-3.5 w-3.5 mr-1.5 fill-current" />
                  {destination.rating}
                </Badge>
                <Badge variant="outline" className="glass text-white border-white/40 text-sm font-medium">
                  {destination.reviews} reviews
                </Badge>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-balance text-white tracking-tight leading-tight">{destination.name}</h1>
              <div className="flex items-center gap-2.5 text-lg text-white/90 font-light">
                <MapPin className="h-5 w-5 text-accent" />
                {destination.state}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Info */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <Card className="border border-border/50 bg-card hover:shadow-premium-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">About This Destination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground text-lg leading-relaxed font-light">{destination.description}</p>
                </CardContent>
              </Card>

              {/* Best Time to Visit */}
              <Card className="border border-border/50 bg-card hover:shadow-premium-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                    <div className="p-2.5 bg-primary/10 rounded-lg">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    Best Time to Visit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground text-lg font-light">{destination.bestTime}</p>
                </CardContent>
              </Card>

              {/* Top Attractions */}
              <Card className="border border-border/50 bg-card hover:shadow-premium-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                    <div className="p-2.5 bg-primary/10 rounded-lg">
                      <MapPinIcon className="h-6 w-6 text-primary" />
                    </div>
                    Top Attractions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.attractions.map((attraction, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors duration-200">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5 font-bold" />
                        <span className="text-foreground font-medium">{attraction}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Local Food */}
              <Card className="border border-border/50 bg-card hover:shadow-premium-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                    <div className="p-2.5 bg-primary/10 rounded-lg">
                      <Utensils className="h-6 w-6 text-primary" />
                    </div>
                    Must Try Food
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.food.map((food, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors duration-200">
                        <span className="text-2xl">🍽️</span>
                        <span className="text-foreground font-medium">{food}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experiences */}
              <Card className="border border-border/50 bg-card hover:shadow-premium-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Experiences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {destination.experiences.map((exp, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-muted/40 hover:bg-muted/60 transition-colors duration-200 rounded-lg">
                        <span className="text-xl">✨</span>
                        <span className="text-foreground font-medium">{exp}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Hotels */}
              {destination.hotels && destination.hotels.length > 0 && (
                <Card className="border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🏨 Hotels
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {destination.hotels.map((hotel, i) => (
                        <div key={i} className="p-3 bg-muted/50 rounded-md text-foreground">
                          {hotel}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Resorts */}
              {destination.resorts && destination.resorts.length > 0 && (
                <Card className="border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🏝️ Resorts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {destination.resorts.map((resort, i) => (
                        <div key={i} className="p-3 bg-muted/50 rounded-md text-foreground">
                          {resort}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Lounges */}
              {destination.lounges && destination.lounges.length > 0 && (
                <Card className="border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🍹 Lounges & Bars
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {destination.lounges.map((lounge, i) => (
                        <div key={i} className="p-3 bg-muted/50 rounded-md text-foreground">
                          {lounge}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Restaurants */}
              {destination.restaurants && destination.restaurants.length > 0 && (
                <Card className="border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🍽️ Restaurants
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {destination.restaurants.map((restaurant, i) => (
                        <div key={i} className="p-3 bg-muted/50 rounded-md text-foreground">
                          {restaurant}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Cost Tiers */}
            <div className="lg:col-span-1 space-y-6">
              {/* Cost Tier Selector */}
              <div className="sticky top-24 space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Daily Costs</h3>

                {/* Tier Cards */}
                <div className="space-y-3">
                  {COST_TIERS.map(tier => (
                    <button
                      key={tier.key}
                      onClick={() => setSelectedTier(tier.key as 'budget' | 'mid' | 'luxury')}
                      className={`w-full text-left transition-all duration-300 p-4 rounded-lg border-2 ${
                        selectedTier === tier.key
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg">{tier.icon}</span>
                        <span className="font-semibold text-foreground">{tier.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Click to view details</div>
                    </button>
                  ))}
                </div>

                {/* Selected Tier Details */}
                <Card className={`border-0 bg-gradient-to-br ${COST_TIERS.find(t => t.key === selectedTier)?.color || 'from-blue-600'}`}>
                  <CardContent className="p-6 text-white">
                    <p className="text-sm text-white/80 mb-4">Daily Breakdown</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between pb-2 border-b border-white/20">
                        <span>🏨 Accommodation</span>
                        <span className="font-semibold">₹{costData.accommodation}</span>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b border-white/20">
                        <span>🍽️ Food</span>
                        <span className="font-semibold">₹{costData.food}</span>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b border-white/20">
                        <span>🚌 Transport</span>
                        <span className="font-semibold">₹{costData.transport}</span>
                      </div>
                      <div className="flex items-center justify-between pb-2 border-b border-white/20">
                        <span>🎫 Activities</span>
                        <span className="font-semibold">₹{costData.activities}</span>
                      </div>
                    </div>

                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-sm text-white/80 mb-1">Total Per Day</p>
                      <p className="text-3xl font-bold">₹{costData.total}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Multi-Day Calculator */}
                <Card className="border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Plan Your Trip</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Number of Days</label>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => setDays(Math.max(1, days - 1))}
                          className="p-2 border border-input rounded-md hover:bg-muted"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={days}
                          onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                          className="flex-1 px-3 py-2 border border-input rounded-md text-center"
                        />
                        <button
                          onClick={() => setDays(Math.min(30, days + 1))}
                          className="p-2 border border-input rounded-md hover:bg-muted"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Total Cost Estimate</p>
                      <p className="text-3xl font-bold text-foreground">
                        ₹{totalCost.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">for {days} {days === 1 ? 'day' : 'days'}</p>
                    </div>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link href="/itinerary">
                        Start Planning
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Rating and Reviews */}
                <Card className="border-0">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(destination.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                        />
                      ))}
                    </div>
                    <p className="font-semibold text-foreground">{destination.rating}/5</p>
                    <p className="text-sm text-muted-foreground">{destination.reviews} reviews</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Similar Destinations */}
          <div className="mt-16 pt-12 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-8">Explore More from {destination.state}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INDIA_DESTINATIONS.filter(d => d.state === destination.state && d.id !== destination.id).slice(0, 3).map(similar => (
                <Link key={similar.id} href={`/destination/${similar.id}`}>
                  <Card className="overflow-hidden hover-lift transition-all duration-300 h-full hover:shadow-xl border-0">
                    <div className="relative h-40 bg-muted overflow-hidden">
                      <Image
                        src={similar.image}
                        alt={similar.name}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-3">
                        <p className="text-white font-semibold">{similar.name}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="text-sm font-semibold">₹{similar.costPerDay.budget.total}/day</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium">{similar.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
