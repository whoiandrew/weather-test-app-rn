import { createStackNavigator } from '@react-navigation/stack';
import { Calendar, DailyWeather } from '@screens';
import React from 'react';

const Stack = createStackNavigator();

const AppStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen component={Calendar} name="Calendar" />
    <Stack.Screen component={DailyWeather} name="DailyWeather" />
  </Stack.Navigator>
);

export default AppStack;
