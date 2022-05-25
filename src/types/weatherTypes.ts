interface Coordinates {
  lat: number;
  lon: number;
}

interface TemperatureInfo {
  average: number;
  average_max: number;
  average_min: number;
  record_max: number;
  record_min: number;
}

interface City {
  coord: Coordinates;
  country: string;
  id: number;
  name: string;
}

interface WeatherForecastItem {
  dt: number;
  humidity: number;
  pressure: number;
  temp: TemperatureInfo;
  wind_speed: number;
}

interface WeatherForecast {
  city: City;
  cod: number;
  list: WeatherForecastItem[];
  message: number;
}

export type {
  Coordinates,
  TemperatureInfo,
  WeatherForecast,
  WeatherForecastItem,
};
