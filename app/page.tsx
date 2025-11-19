import { auth } from '@clerk/nextjs/server'
import React from 'react'
import Dashboard from './components/Dashboard'
import Home from './components/Home'

const page = async () => {
  const {userId} = await auth()
  if(!userId){
    return <Home />;
  }
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default page