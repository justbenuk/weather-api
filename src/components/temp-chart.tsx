'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { ForecastDay, HourData } from "@/types/forcast-types";

// This component expects the raw forecastday array as a prop
export default function TempChart({ forecastData }: { forecastData: ForecastDay[] }) {
  // 1. Validate and access the hour data
  if (!forecastData || forecastData.length === 0 || !forecastData[0].hour) {
    return <Card className="p-4"><p>No chart data available.</p></Card>;
  }

  // 2. Map and format the data for Recharts
  const chartData = forecastData[0].hour.map((hourData: HourData) => ({
    // Use the time without the date part for the X-axis label
    hour: hourData.time.split(' ')[1],
    // Use the temperature in Celsius
    temp: hourData.temp_c,
  }));

  return (
    <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">24-Hour Temperature Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" opacity={0.1} />
            <XAxis
              dataKey="hour"
              stroke="#888"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#888"
              style={{ fontSize: '12px' }}
              label={{
                value: 'Temp (°C)',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#888' }
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)'
              }}
              formatter={(value) => [`${value}°C`, 'Temperature']}
            />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              activeDot={{ r: 8 }}
              strokeWidth={3}
              dot={{ r: 3, fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
