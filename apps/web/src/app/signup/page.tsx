import { SignupForm } from '@/components/signup-form'
import React from 'react'

const SignupPage = () => {
  return (
   <div className="flex min-h-lvh w-full items-center justify-center p-6 md:p-10">
         <div className="w-full max-w-xl">
           <SignupForm />
         </div>
       </div>
  )
}

export default SignupPage