import type { TakeableChannel } from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';

import { getMonthlyCalendarSaga, weatherActions } from './weather';

export default function* rootSaga() {
  yield takeEvery(
    weatherActions.fetchForecast.type as unknown as TakeableChannel<unknown>,
    getMonthlyCalendarSaga
  );
  // code after all-effect
}
