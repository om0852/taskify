"use client"
import { useOrganization } from '@clerk/nextjs'
import Image from 'next/image';
import React from 'react'

const Info = () => {
  const {organization,isLoaded}=useOrganization();
  if(!isLoaded){
    return(
      <p>Loading...</p>
    )
  }
  return (
    <div className='flex items-center gap-x-4'>
      <div className="w-[60px] h-[60px] relative">
        <Image alt='Org' fill src={organization?.imageUrl!} className='rounded-md object-cover'/>
      </div>
      
    </div>
  )
}

export default Info
