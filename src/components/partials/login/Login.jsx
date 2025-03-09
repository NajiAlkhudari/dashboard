  "use client";
  import React from 'react'
  import LoginForm from './LoginForm'
  import Card from '@/components/ui/Card'

  const Login = () => {
    return (
      <div>       
    <div className="md:hidden block text-center mb-10">
      <p className='text-4xl font-extrabold text-yellow-500'>TU V P N</p>
    </div>
    <div className=' pb-8 space-y-4'>
    <p className="text-center text-gray-950 font-bold text-4xl">Sign In</p>
    <p className="text-center text-md text-gray-700">Sign in to your account to start using Dashboard</p>
    </div>

        <div className='pb-10'>
        <LoginForm />
        </div>
      
        </div>
    
    )
  }

  export default Login
