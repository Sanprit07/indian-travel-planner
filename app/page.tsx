'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { DestinationCard } from '@/components/destination-card';
import { destinations } from '@/lib/destination-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, MapPin, DollarSign, Users, Calendar } from 'lucide-react';

const featuredDestinations = destinations.slice(0, 6);

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 lg:py-32 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
                Plan Your Perfect <span className="text-primary">Indian Adventure</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Discover hidden gems, plan personalized itineraries, and connect with fellow travelers across India. Everything you need for your perfect trip.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/explore">Explore Destinations</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/itinerary">Plan Your Trip</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose TripSync?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to plan unforgettable journeys across India
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-center mb-2">1000+ Destinations</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Discover curated destinations across all regions of India
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-center mb-2">Smart Itineraries</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Create personalized itineraries based on your interests
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-center mb-2">Budget Planner</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Plan your trip with detailed budget breakdowns
                  </p>
                </CardContent>
              </Card>

              {/* Feature 4 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-center mb-2">Community Insights</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Connect with travelers and get authentic reviews
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Destinations */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Destinations</h2>
              </div>
              <p className="text-muted-foreground">
                Explore our top-rated destinations loved by travelers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>

            <div className="flex justify-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/explore">
                  View All Destinations
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Explore?</h2>
            <p className="text-lg text-primary-foreground/90">
              Start planning your next adventure with TripSync. Discover destinations, create itineraries, and connect with fellow travelers.
            </p>
            <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="/explore">Begin Your Journey</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                TripSync
              </h4>
              <p className="text-sm text-muted-foreground">
                Your companion for exploring India
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/explore" className="hover:text-foreground">Destinations</Link></li>
                <li><Link href="/itinerary" className="hover:text-foreground">Plan Trip</Link></li>
                <li><Link href="/budget" className="hover:text-foreground">Budget</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/community" className="hover:text-foreground">Reviews</Link></li>
                <li><Link href="/community" className="hover:text-foreground">Forums</Link></li>
                <li><Link href="/community" className="hover:text-foreground">Tips</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 TripSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
