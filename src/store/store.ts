import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';
import { weatherPersistConfig, weatherReducer } from './weather';

const persistedReducersObject = {
  weather: persistReducer(weatherPersistConfig, weatherReducer),
};

const rootPersistConfig = {
  blacklist: Object.keys(persistedReducersObject),
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers(persistedReducersObject);

const sagaMiddleware = createSagaMiddleware();

const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  devTools: true,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
    sagaMiddleware,
  ],
  reducer: persistedRootReducer,
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { AppDispatch, RootState };
export { persistor, store };
