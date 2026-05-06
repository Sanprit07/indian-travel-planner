'use client';

import { use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { getDestinationById } from '@/lib/destination-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, DollarSign, Star, Utensils, Activity, AlertCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DestinationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const destination = getDestinationById(id);

  if (!destination) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-destructive mb-4">
                <AlertCircle className="w-5 h-5" />
                <p className="font-medium">Destination not found</p>
              </div>
              <Button asChild className="w-full">
                <Link href="/explore">Back to Explore</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-6 -ml-2">
            <Link href="/explore">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Explore
            </Link>
          </Button>

          {/* Hero Section */}
          <div className="mb-8 rounded-lg overflow-hidden border border-border h-96 bg-muted">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title and Meta */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{destination.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{destination.region}</Badge>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4 my-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-secondary fill-secondary mt-0.5" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{destination.rating}</div>
                      <div className="text-sm text-muted-foreground">{destination.reviews} reviews</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-lg font-semibold text-foreground">{destination.duration}</div>
                      <div className="text-sm text-muted-foreground">Ideal stay</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <div className="text-lg font-semibold text-foreground">
                        ₹{destination.budget.low.toLocaleString()}-{destination.budget.high.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Per day</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About {destination.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 leading-relaxed mb-4">{destination.description}</p>
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Best Time to Visit</h4>
                  <p className="text-foreground/70">{destination.bestTime}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Travel Experience</h4>
                  <p className="text-foreground/70">{destination.experience}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attractions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Top Attractions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {destination.attractions.map((attraction, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground">{attraction}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activities */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Things to Do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {destination.activities.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-foreground">{activity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Food & Cuisine */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-accent" />
                Local Cuisine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {destination.food.map((dish, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-foreground">{dish}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-primary text-primary-foreground mb-8">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Ready to visit {destination.name}?</h3>
                  <p className="text-primary-foreground/90">
                    Plan your personalized itinerary and start your adventure
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 whitespace-nowrap"
                >
                  <Link href="/itinerary">Plan Trip</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
