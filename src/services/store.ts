import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import productReducer from './reducers/productSlice';
import cartReducer from './reducers/cartSlice';
import userReducer from './reducers/userReducer';
import categoryReducer from './reducers/categoryReducer';
import authReducer from './reducers/authReducer';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer', 'authReducer'],
};

const rootReducer = combineReducers({
  productReducer,
  cartReducer,
  userReducer,
  categoryReducer,
  authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

const store = createStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDistpatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
