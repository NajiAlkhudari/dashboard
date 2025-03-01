  "use client";
  import React from 'react'
  import LoginForm from './LoginForm'
  import Card from '@/components/ui/Card'

  const Login = () => {
    return (
      <div>
            
              <Card className="flex flex-col justify-center items-center  h-full  p-4  sm:p-10 md:p-14 lg:p-16 xl:p-20">
                <div className='space-y-2'>
    <div className="md:hidden block text-center">
      <p className='text-2xl font-extrabold text-yellow-500'>TU V P N</p>
    </div>
    <p className="text-center text-gray-950 font-bold text-3xl">Sign In</p>
    <p className="text-center text-md text-gray-700">Sign in to your account to start using Dashboard</p>
        
        <LoginForm />
        </div>
        </Card>
      </div>
    )
  }

  export default Login
