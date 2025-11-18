export interface HourData {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  wind_mph: number;
  humidity: number;
  feelslike_c: number;
  chance_of_rain: number;
  chance_of_snow: number;
}

export interface ForecastDay {
  hour: HourData[];
}
