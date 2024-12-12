import { combineReducers } from '@reduxjs/toolkit';
import wordsReducer from './slices/wordsSlice';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  words: wordsReducer,
  auth: authReducer,
});

export default rootReducer;
