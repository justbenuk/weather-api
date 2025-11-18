'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForecastDay } from "@/types/forcast-types";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HourlyForecast({ forecastData }: { forecastData: ForecastDay[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentHourRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to current hour on mount
    if (currentHourRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentElement = currentHourRef.current;

      // Calculate position to center the current hour
      const scrollPosition = currentElement.offsetLeft - (container.offsetWidth / 2) + (currentElement.offsetWidth / 2);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  if (!forecastData || forecastData.length === 0 || !forecastData[0].hour) {
    return <Card className="p-4"><p>No hourly forecast data available.</p></Card>;
  }

  const hourlyData = forecastData[0].hour;

  // Get current hour to highlight it
  const now = new Date();
  const currentHour = now.getHours();

  return (
    <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Hourly Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={scrollContainerRef} className="overflow-x-auto pb-2 scroll-smooth">
          <div className="flex gap-4 min-w-max">
            {hourlyData.map((hour, idx) => {
              const hourTime = hour.time.split(' ')[1];
              const hourNumber = parseInt(hourTime.split(':')[0]);
              const isCurrentHour = hourNumber === currentHour;
              const isPrecipitation = hour.chance_of_rain > 30 || hour.chance_of_snow > 30;

              return (
                <div
                  key={idx}
                  ref={isCurrentHour ? currentHourRef : null}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all min-w-[100px] ${
                    isCurrentHour
                      ? 'bg-gradient-to-b from-blue-500/20 to-purple-500/20 border-blue-500/50 ring-2 ring-blue-500/30'
                      : 'bg-gradient-to-b from-blue-500/5 to-purple-500/5 border-white/20 hover:border-blue-500/30'
                  }`}
                >
                  {/* Time */}
                  <div className={`font-semibold text-sm ${isCurrentHour ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                    {isCurrentHour ? 'Now' : hourTime}
                  </div>

                  {/* Weather Icon */}
                  <div className="relative">
                    <Image
                      src={`https:${hour.condition.icon}`}
                      alt={hour.condition.text}
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  </div>

                  {/* Temperature */}
                  <div className={`text-2xl font-bold ${isCurrentHour ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                    {Math.round(hour.temp_c)}&deg;
                  </div>

                  {/* Feels Like */}
                  <div className="text-xs text-muted-foreground">
                    Feels {Math.round(hour.feelslike_c)}&deg;
                  </div>

                  {/* Precipitation Chance */}
                  {isPrecipitation && (
                    <div className="flex items-center gap-1 text-xs text-blue-500 dark:text-blue-400">
                      <span>💧</span>
                      <span>{Math.max(hour.chance_of_rain, hour.chance_of_snow)}%</span>
                    </div>
                  )}

                  {/* Wind */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>💨</span>
                    <span>{Math.round(hour.wind_mph)} mph</span>
                  </div>

                  {/* Humidity */}
                  <div className="text-xs text-muted-foreground">
                    {hour.humidity}% humidity
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
