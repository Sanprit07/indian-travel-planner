'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { destinations } from '@/lib/destination-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Download, MapPin, Calendar, Users } from 'lucide-react';

interface ItineraryItem {
  id: string;
  day: number;
  destination: string;
  activity: string;
}

interface ItineraryPlan {
  title: string;
  destinations: string[];
  duration: number;
  travelers: number;
  items: ItineraryItem[];
}

export default function ItineraryPage() {
  const [plan, setPlan] = useState<ItineraryPlan>({
    title: 'My Trip',
    destinations: [],
    duration: 7,
    travelers: 1,
    items: []
  });

  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDay, setSelectedDay] = useState(1);
  const [activity, setActivity] = useState('');

  const addDestination = (destId: string) => {
    const dest = destinations.find(d => d.id === destId);
    if (dest && !plan.destinations.includes(destId)) {
      setPlan(prev => ({
        ...prev,
        destinations: [...prev.destinations, destId]
      }));
    }
  };

  const removeDestination = (destId: string) => {
    setPlan(prev => ({
      ...prev,
      destinations: prev.destinations.filter(d => d !== destId),
      items: prev.items.filter(item => {
        const dest = destinations.find(d => d.id === destId);
        return dest?.name !== item.destination;
      })
    }));
  };

  const addActivity = () => {
    if (activity.trim() && selectedDestination) {
      const dest = destinations.find(d => d.id === selectedDestination);
      if (dest) {
        const newItem: ItineraryItem = {
          id: Date.now().toString(),
          day: selectedDay,
          destination: dest.name,
          activity: activity
        };
        setPlan(prev => ({
          ...prev,
          items: [...prev.items, newItem]
        }));
        setActivity('');
      }
    }
  };

  const removeActivity = (itemId: string) => {
    setPlan(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const getActivitiesByDay = (day: number) => {
    return plan.items.filter(item => item.day === day);
  };

  const downloadItinerary = () => {
    const content = `
TripSync Itinerary: ${plan.title}
=====================================

Duration: ${plan.duration} days
Number of Travelers: ${plan.travelers}
Destinations: ${plan.destinations.map(d => destinations.find(dest => dest.id === d)?.name).join(', ')}

Daily Itinerary:
${Array.from({ length: plan.duration }, (_, i) => {
  const day = i + 1;
  const dayActivities = getActivitiesByDay(day);
  return `
Day ${day}:
${dayActivities.length > 0 
  ? dayActivities.map(item => `  - ${item.destination}: ${item.activity}`).join('\n')
  : '  - No activities planned'
}`;
}).join('\n')}

Plan your trip at TripSync!
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${plan.title.replace(/\s+/g, '-')}-itinerary.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Plan Your Itinerary</h1>
            <p className="text-muted-foreground">
              Create a personalized trip plan with daily activities and destinations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Planning Tools */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Trip Name</label>
                    <Input
                      value={plan.title}
                      onChange={(e) => setPlan(prev => ({ ...prev, title: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Duration (days)</label>
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={plan.duration}
                      onChange={(e) => setPlan(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Number of Travelers</label>
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      value={plan.travelers}
                      onChange={(e) => setPlan(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                      className="mt-1"
                    />
                  </div>

                  <Button onClick={downloadItinerary} className="w-full bg-primary">
                    <Download className="w-4 h-4 mr-2" />
                    Download Itinerary
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Select Destinations */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Destinations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Add Destination</label>
                    <select
                      value={selectedDestination}
                      onChange={(e) => setSelectedDestination(e.target.value)}
                      className="w-full px-3 py-2 mt-1 border border-border rounded-md bg-background text-foreground"
                    >
                      <option value="">Choose a destination...</option>
                      {destinations.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.name} - {d.region}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    onClick={() => {
                      addDestination(selectedDestination);
                      setSelectedDestination('');
                    }}
                    disabled={!selectedDestination}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Destination
                  </Button>

                  {plan.destinations.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium text-foreground mb-3">Selected Destinations:</h4>
                      <div className="flex flex-wrap gap-2">
                        {plan.destinations.map(destId => {
                          const dest = destinations.find(d => d.id === destId);
                          return (
                            <Badge key={destId} className="pr-1">
                              {dest?.name}
                              <button
                                onClick={() => removeDestination(destId)}
                                className="ml-2 hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Add Activities */}
              {plan.destinations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Add Activities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground">Destination</label>
                        <select
                          value={selectedDestination}
                          onChange={(e) => setSelectedDestination(e.target.value)}
                          className="w-full px-3 py-2 mt-1 border border-border rounded-md bg-background text-foreground"
                        >
                          <option value="">Choose destination...</option>
                          {plan.destinations.map(destId => {
                            const dest = destinations.find(d => d.id === destId);
                            return (
                              <option key={destId} value={destId}>
                                {dest?.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground">Day</label>
                        <select
                          value={selectedDay}
                          onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                          className="w-full px-3 py-2 mt-1 border border-border rounded-md bg-background text-foreground"
                        >
                          {Array.from({ length: plan.duration }, (_, i) => i + 1).map(day => (
                            <option key={day} value={day}>
                              Day {day}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Activity</label>
                      <Input
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        placeholder="e.g., Visit Taj Mahal, Explore local markets"
                        className="mt-1"
                        onKeyPress={(e) => e.key === 'Enter' && addActivity()}
                      />
                    </div>

                    <Button
                      onClick={addActivity}
                      disabled={!activity.trim() || !selectedDestination}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Activity
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Itinerary Timeline */}
              {plan.items.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Itinerary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Array.from({ length: plan.duration }, (_, i) => i + 1).map(day => {
                      const dayActivities = getActivitiesByDay(day);
                      return (
                        <div key={day}>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            Day {day}
                          </h4>
                          <div className="space-y-2 ml-6 border-l-2 border-primary/30 pl-4">
                            {dayActivities.length > 0 ? (
                              dayActivities.map(item => (
                                <div key={item.id} className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/30">
                                  <div>
                                    <p className="font-medium text-foreground">{item.destination}</p>
                                    <p className="text-sm text-muted-foreground">{item.activity}</p>
                                  </div>
                                  <button
                                    onClick={() => removeActivity(item.id)}
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground italic">No activities planned</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
