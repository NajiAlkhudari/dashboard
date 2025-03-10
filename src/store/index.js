import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import meReducer from './meSlice';
import userReducer from './userSlice'
import clientReducer from './clientSlice';
import companyReducer from './companySlice';
import agentReducer from './agentSlice';
const store = configureStore({
  reducer: {
    auth: authReducer, 
     me:meReducer,
     users : userReducer,
     clients : clientReducer,
     companies : companyReducer,
     agents : agentReducer,

  },
});

export default store;