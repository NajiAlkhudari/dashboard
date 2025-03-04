"use client"; 

import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { setAuthState } from '@/store/authSlice';

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const userPermissions = Cookies.get('userPermissions');

    if (userPermissions) {
      dispatch(setAuthState({ success: true , userPermissions }));
    }
  }, [dispatch]);

  return <>{children}</>;
}