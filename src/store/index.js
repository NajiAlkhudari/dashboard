import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import meReducer from './meSlice';
import userReducer from './userSlice'
const store = configureStore({
  reducer: {
    auth: authReducer, 
     me:meReducer,
     users : userReducer,

  },
});

export default store;