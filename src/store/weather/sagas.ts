import type { WeatherForecast } from '@types';
import { call, put } from 'redux-saga/effects';

import { getMonthlyCalendar } from './api';
import { weatherActions } from './slice';

function* getMonthlyCalendarSaga() {
  const forecast: WeatherForecast = yield call(getMonthlyCalendar);
  yield put(weatherActions.getForecast({ forecast }));
}

export { getMonthlyCalendarSaga };
