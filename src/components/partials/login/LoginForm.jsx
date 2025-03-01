'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { login } from '@/store/authSlice';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput/TextInput';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, token, success, error } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ userName, password }));
  };

  useEffect(() => {
    if (success) {
      router.push("/dashboard");
    }
  }, [token, router]);

  return (
    <form className='space-y-2' onSubmit={onSubmit}>
      <div>
        <label className='text-sm'>UserName</label>
        <TextInput
          name="userName"
          placeholder="userName"
          error={error}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <label className='text-sm'>Password</label>
        <TextInput
          type="password"
          name="password"
          placeholder="........"
          error={error}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit">        
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default LoginForm;
