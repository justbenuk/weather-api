import { fetchWatherAction } from "@/actions/weather-actions";
import Alerts from "@/components/alerts";
import Condition from "@/components/condition";
import Location from "@/components/location";
import MapOuter from "@/components/map";
import SearchForm from "@/components/search-form";
import TempChart from "@/components/temp-chart";
import ToggleTheme from "@/components/toggle-theme";
import HourlyForecast from "@/components/hourly-forecast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default async function Home({ searchParams }: { searchParams: { search: string } }) {

  const { search } = await searchParams

  const data = await fetchWatherAction({ search: search })

  const currentDate = new Date().toLocaleDateString('en-gb', { dateStyle: 'full' })

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Full-screen map as background */}
      <div className="absolute inset-0 z-0">
        <MapOuter location={data.location} />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="container mx-auto p-4 lg:p-6 space-y-4">
          {/* Header with search */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {currentDate}
              </h1>
              <Location location={data.location} />
            </div>
            <div className="flex flex-row gap-3 items-center w-full sm:w-auto">
              <SearchForm />
              <ToggleTheme />
            </div>
          </div>

          {/* Main weather grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Current weather - hero card */}
            <div className="lg:col-span-2">
              <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Current Weather</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Main temperature display */}
                    <div className="flex flex-col items-center justify-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                      <Condition condition={data.current.condition} />
                      <div className="text-center">
                        <h2 className="text-7xl font-bold">{data.current.temp_c}&deg;</h2>
                        <p className="text-xl text-muted-foreground mt-2">Feels like {data.current.feelslike_c}&deg;</p>
                      </div>
                    </div>

                    {/* Weather metrics grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/10 hover:border-blue-500/30 transition-all">
                        <div className="text-3xl mb-2">💨</div>
                        <div className="text-sm text-muted-foreground mb-1">Wind Speed</div>
                        <div className="text-3xl font-bold">{data.current.wind_mph}</div>
                        <div className="text-xs text-muted-foreground">mph</div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/10 hover:border-cyan-500/30 transition-all">
                        <div className="text-3xl mb-2">💧</div>
                        <div className="text-sm text-muted-foreground mb-1">Humidity</div>
                        <div className="text-3xl font-bold">{data.current.humidity}</div>
                        <div className="text-xs text-muted-foreground">%</div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/10 hover:border-purple-500/30 transition-all">
                        <div className="text-3xl mb-2">🌡️</div>
                        <div className="text-sm text-muted-foreground mb-1">Pressure</div>
                        <div className="text-3xl font-bold">{data.current.pressure_mb}</div>
                        <div className="text-xs text-muted-foreground">mb</div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/10 hover:border-indigo-500/30 transition-all">
                        <div className="text-3xl mb-2">👁️</div>
                        <div className="text-sm text-muted-foreground mb-1">Visibility</div>
                        <div className="text-3xl font-bold">{data.current.vis_km}</div>
                        <div className="text-xs text-muted-foreground">km</div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/10 hover:border-orange-500/30 transition-all">
                        <div className="text-3xl mb-2">☀️</div>
                        <div className="text-sm text-muted-foreground mb-1">UV Index</div>
                        <div className="text-3xl font-bold">{data.current.uv}</div>
                        <div className="text-xs text-muted-foreground">index</div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-500/10 hover:border-teal-500/30 transition-all">
                        <div className="text-3xl mb-2">🌧️</div>
                        <div className="text-sm text-muted-foreground mb-1">Precipitation</div>
                        <div className="text-3xl font-bold">{data.current.precip_mm}</div>
                        <div className="text-xs text-muted-foreground">mm</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts sidebar */}
            <div className="space-y-4">
              <Alerts alerts={data.alerts.alert} />
            </div>

            {/* Hourly Forecast - full width */}
            <div className="lg:col-span-3">
              <HourlyForecast forecastData={data.forecast.forecastday} />
            </div>

            {/* Temperature chart - full width */}
            <div className="lg:col-span-3">
              <TempChart forecastData={data.forecast.forecastday} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
