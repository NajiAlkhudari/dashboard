import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import meReducer from './meSlice';
import userReducer from './userSlice'
import clientReducer from './clientSlice';
const store = configureStore({
  reducer: {
    auth: authReducer, 
     me:meReducer,
     users : userReducer,
     clients : clientReducer,

  },
});

export default store;