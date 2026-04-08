import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import employeesReducer from '../features/employees/employeesSlice';
import uiReducer from '../features/ui/uiSlice';
import { loadState, saveState } from '../utils/localStorage';

const loggerMiddleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  console.log('[Redux Action]', action.type, action.payload ?? '');
  console.log('[Redux State]', storeApi.getState());
  return result;
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
    ui: uiReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    employees: store.getState().employees,
    ui: store.getState().ui,
  });
});
