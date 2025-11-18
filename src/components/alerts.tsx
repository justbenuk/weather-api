import { AlertProps } from "@/types/alert-types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"


export default function Alerts({ alerts }: { alerts: AlertProps[] }) {
  if (alerts.length === 0 || !alerts) {
    return (
      <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-white/20 shadow-2xl">
        <CardHeader className="leading-tight">
          <CardTitle className="text-2xl font-medium flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Weather Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          <p className="text-muted-foreground">No active alerts for this area</p>
        </CardContent>
      </Card>
    )
  }


  return (
    <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-red-500/50 shadow-2xl">
      <CardHeader className="leading-tight">
        <CardTitle className="text-2xl font-medium text-red-500 flex items-center gap-2">
          <span>⚠️</span>
          <span>Weather Alerts</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {alerts.map((alert: AlertProps, idx: number) => {
          return (
            <div key={idx} className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-1">{alert.event}</h3>
              <p className="text-sm text-muted-foreground">{alert.headline}</p>
            </div>
          )
        }
        )}
      </CardContent>
    </Card>
  )
}

