'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { DestinationCard } from '@/components/destination-card';
import { INDIA_DESTINATIONS } from '@/lib/india-destinations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, MapPin, DollarSign, Users, Compass, Clock, Star, Calendar } from 'lucide-react';

const featuredDestinations = INDIA_DESTINATIONS.slice(0, 6);
const regions = [
  { name: 'North', color: 'from-blue-600 to-cyan-500', icon: '⛰️', destinations: 12 },
  { name: 'South', color: 'from-green-600 to-emerald-500', icon: '🏝️', destinations: 10 },
  { name: 'East', color: 'from-purple-600 to-pink-500', icon: '🌅', destinations: 8 },
  { name: 'West', color: 'from-orange-600 to-yellow-500', icon: '🏜️', destinations: 11 },
  { name: 'Northeast', color: 'from-teal-600 to-cyan-500', icon: '🌿', destinations: 7 },
  { name: 'Central', color: 'from-red-600 to-orange-500', icon: '🏛️', destinations: 9 },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section with Background */}
        <section 
          className="relative py-24 md:py-40 lg:py-48 px-4 overflow-hidden"
          style={{
            backgroundImage: 'url(/images/hero-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center space-y-10">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="glass px-5 py-2.5 rounded-full text-white text-sm font-medium tracking-wide">
                    Discover India&apos;s Hidden Gems
                  </span>
                </div>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white text-balance leading-tight tracking-tight">
                Your Next
                <br />
                <span className="bg-gradient-primary-secondary bg-clip-text text-transparent">Adventure Awaits</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/85 text-balance max-w-3xl mx-auto leading-relaxed font-light">
                Discover 100+ breathtaking destinations, create personalized itineraries with real-time budgeting, and connect with fellow travelers across India.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-12">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-bold text-base h-14 px-10 rounded-xl shadow-lg">
                  <Link href="/explore">
                    <Compass className="mr-2.5 h-5 w-5" />
                    Explore Destinations
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 transition-colors duration-200 text-white font-bold text-base h-14 px-10 rounded-xl shadow-lg">
                  <Link href="/itinerary">
                    <Calendar className="mr-2.5 h-5 w-5" />
                    Plan Your Trip
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 md:gap-12 pt-16 border-t border-white/20">
                {[
                  { number: '100+', label: 'Destinations', icon: '🗺️' },
                  { number: '30', label: 'Indian States', icon: '🌏' },
                  { number: '∞', label: 'Experiences', icon: '✨' },
                ].map((stat, i) => (
                  <div key={i} className="text-white space-y-2">
                    <div className="text-3xl">{stat.icon}</div>
                    <div className="text-4xl md:text-5xl font-bold tracking-tight">{stat.number}</div>
                    <div className="text-sm text-white/70 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Destinations */}
        <section className="py-24 md:py-48 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-24">
              <div className="space-y-6 max-w-3xl">
                <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">Featured Destinations</h2>
                <p className="text-xl text-muted-foreground font-normal leading-relaxed">
                  Discover some of India&apos;s most iconic and breathtaking destinations, each offering unique experiences and unforgettable memories.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {featuredDestinations.map((destination) => (
                <Link key={destination.id} href={`/destination/${destination.id}`}>
                  <Card className="overflow-hidden hover-lift h-full border-0 bg-card hover:shadow-premium-xl transition-all duration-300">
                    <div className="relative h-56 bg-muted overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-gradient-primary-secondary text-white rounded-full p-2 shadow-premium">
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                    <CardHeader className="pb-3 pt-6">
                      <CardTitle className="text-2xl text-foreground font-bold">{destination.name}</CardTitle>
                      <CardDescription className="text-sm flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {destination.state}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{destination.description}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="text-sm font-semibold text-foreground">₹{destination.costPerDay.budget.total}/day</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 text-accent fill-accent" />
                          <span className="text-sm font-semibold">{destination.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-14">
              <Button asChild size="lg" className="bg-gradient-primary-secondary hover:opacity-90 transition-opacity duration-200 text-primary-foreground font-semibold h-12 px-8 rounded-lg">
                <Link href="/explore">
                  View All Destinations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Regions */}
        <section className="py-24 md:py-48 px-4 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-24">
              <div className="space-y-6 max-w-3xl">
                <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">Explore by Region</h2>
                <p className="text-xl text-muted-foreground font-normal">
                  Discover destinations organized by India&apos;s diverse and culturally rich regions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {regions.map((region, index) => (
                <button
                  key={index}
                  onClick={() => {
                    window.location.href = `/explore?region=${region.name}`;
                  }}
                  className={`relative h-48 rounded-xl overflow-hidden group cursor-pointer hover-lift transition-all duration-300`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${region.color} opacity-85 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center space-y-3">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{region.icon}</span>
                    <h3 className="text-2xl font-bold tracking-tight">{region.name}</h3>
                    <p className="text-sm text-white/80 font-medium">{region.destinations} destinations</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 md:py-48 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-24">
              <div className="space-y-6 max-w-3xl">
                <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">Why Choose TripSync?</h2>
                <p className="text-xl text-muted-foreground font-normal">
                  Everything you need for an exceptional travel experience across India.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {[
                {
                  icon: <MapPin className="h-10 w-10" />,
                  title: 'Comprehensive Coverage',
                  description: '100+ destinations across all 30 Indian states and union territories'
                },
                {
                  icon: <DollarSign className="h-10 w-10" />,
                  title: 'Smart Budget Planning',
                  description: 'Get real-time cost estimates with budget, mid-range & luxury options'
                },
                {
                  icon: <Calendar className="h-10 w-10" />,
                  title: 'Smart Itineraries',
                  description: 'Create and customize multi-destination trips with cost tracking'
                },
                {
                  icon: <Users className="h-10 w-10" />,
                  title: 'Community Reviews',
                  description: 'Connect with travelers and discover authentic local experiences'
                },
              ].map((feature, index) => (
                <Card key={index} className="border border-border/50 bg-card hover-lift hover:shadow-premium-lg transition-all duration-300">
                  <CardHeader>
                    <div className="text-primary mb-4 p-3 bg-primary/10 rounded-lg w-fit">{feature.icon}</div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-40 px-4 bg-gradient-primary-secondary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="space-y-10">
              <h2 className="text-5xl md:text-6xl font-bold text-white text-balance tracking-tight leading-tight">
                Ready to Start Your Adventure?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
                Join thousands of travelers discovering India&apos;s most beautiful destinations with smart planning tools and a supportive community.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 transition-all duration-200 font-bold text-base h-14 px-10 rounded-lg w-full sm:w-auto">
                  <Link href="/explore">
                    Explore Now
                    <ArrowRight className="ml-2.5 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="glass text-white hover:bg-white/20 transition-all duration-200 font-bold text-base h-14 px-10 rounded-lg w-full sm:w-auto">
                  <Link href="/budget">View Budget Options</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground/5 text-foreground py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">TripSync</h4>
              <p className="text-sm text-muted-foreground">Your trusted companion for exploring India</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/explore" className="hover:text-primary transition">Explore</Link></li>
                <li><Link href="/itinerary" className="hover:text-primary transition">Plan Trip</Link></li>
                <li><Link href="/budget" className="hover:text-primary transition">Budget</Link></li>
                <li><Link href="/community" className="hover:text-primary transition">Community</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Popular</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/destination/jaipur" className="hover:text-primary transition">Jaipur</Link></li>
                <li><Link href="/destination/agra" className="hover:text-primary transition">Agra</Link></li>
                <li><Link href="/destination/manali" className="hover:text-primary transition">Manali</Link></li>
                <li><Link href="/destination/kochi" className="hover:text-primary transition">Kochi</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition">Facebook</a></li>
                <li><a href="#" className="hover:text-primary transition">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 TripSync. All rights reserved. | Your journey begins here.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
