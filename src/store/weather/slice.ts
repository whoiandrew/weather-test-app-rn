import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const storeName = 'weather';

const initialState = {
  forecast: {},
};

const weatherSlice = createSlice({
  initialState,
  name: storeName,
  reducers: {
    fetchForecast: () => {},
    getForecast: (state, action) => {
      const { forecast } = action.payload;

      state.forecast = forecast;
    },
  },
});

const { actions: weatherActions, reducer: weatherReducer } = weatherSlice;

const weatherPersistConfig = {
  key: storeName,
  storage: AsyncStorage,
};

export { weatherActions, weatherPersistConfig, weatherReducer };
