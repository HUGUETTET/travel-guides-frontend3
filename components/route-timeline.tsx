"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Route } from "@/lib/sanity"
import { Calendar, MapPin, Clock, DollarSign } from "lucide-react"

interface RouteTimelineProps {
  route: Route
}

export function RouteTimeline({ route }: RouteTimelineProps) {
  return (
    <div className="space-y-8">
      {route.stops.map((stop, index) => (
        <div key={stop._key}>
          {/* Stop Section */}
          <div id={`stop-${index}`} className="scroll-mt-20">
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{stop.destination}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4" />
                        {stop.country}
                      </CardDescription>
                    </div>
                  </div>
                  {stop.arrivalDate && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(stop.arrivalDate).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {stop.description && <p className="text-muted-foreground leading-relaxed">{stop.description}</p>}

                {stop.highlights && stop.highlights.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Highlights</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {stop.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {stop.activities && stop.activities.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Activities</h4>
                    <div className="flex flex-wrap gap-2">
                      {stop.activities.map((activity, i) => (
                        <Badge key={i} variant="secondary">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {stop.accommodation && (
                  <div>
                    <h4 className="font-semibold mb-1">Accommodation</h4>
                    <p className="text-sm text-muted-foreground">{stop.accommodation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Transportation Section */}
          {index < route.stops.length - 1 && route.transportation[index] && (
            <div id={`transport-${index}`} className="scroll-mt-20 my-6 ml-5">
              <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
                <CardContent className="py-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{route.transportation[index].emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold capitalize">{route.transportation[index].method}</h4>
                        {route.transportation[index].duration && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {route.transportation[index].duration}
                          </Badge>
                        )}
                        {route.transportation[index].cost && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {route.transportation[index].cost}
                          </Badge>
                        )}
                      </div>
                      {route.transportation[index].description && (
                        <p className="text-sm text-muted-foreground">{route.transportation[index].description}</p>
                      )}
                      {route.transportation[index].tips && (
                        <p className="text-sm text-blue-700 mt-2">💡 {route.transportation[index].tips}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
