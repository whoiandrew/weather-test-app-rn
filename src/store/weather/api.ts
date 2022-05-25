import type { WeatherForecast } from '@types';

const devApiUri =
  'https://community-open-weather-map.p.rapidapi.com/climate/month?q=Kyiv';

const requestOptions = {
  headers: {
    'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
    'X-RapidAPI-Key': '6574d55cb8msh558504a8e6f58d7p1a31f3jsn4ed4a247d0c3',
  },
  method: 'GET',
};

const getMonthlyCalendar = async (): Promise<WeatherForecast> => {
  const apiResponse = await fetch(devApiUri, requestOptions);
  return apiResponse.json();
};

export { getMonthlyCalendar };
