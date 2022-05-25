import type { WeatherForecastItem } from '@types';

export interface DailyWeatherProps {
  route: {
    params: { forecast: WeatherForecastItem };
  };
}
