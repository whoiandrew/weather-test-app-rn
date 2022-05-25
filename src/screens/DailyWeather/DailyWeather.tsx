import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { DailyWeatherProps } from './DailyWeather.types';

const DailyWeather: React.FC<DailyWeatherProps> = ({
  route: {
    params: { forecast },
  },
}) => {
  const forecastLocaleDate = new Date(forecast.dt * 1000).toLocaleDateString();

  return (
    <SafeAreaView>
      <Text>Date: {forecastLocaleDate}</Text>
      <Text>Humidity: {forecast.humidity}</Text>
      <Text>Pressure: {forecast.pressure}</Text>
      <Text>Wind: {forecast.wind_speed}</Text>
      <Text>Average temperature: {forecast.temp.average}</Text>
    </SafeAreaView>
  );
};

export default DailyWeather;
