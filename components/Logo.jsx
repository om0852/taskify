import Link from 'next/link'
import React from 'react'
import {cn} from"@/lib/utils"
import {Bungee} from "next/font/google"
import Image from 'next/image'
const TextFont= Bungee({subsets:['latin'],weight:["400"]})
const Logo = () => {

  return (
    <Link href={"/"}>
      <div className='hover:opacity-75 transition items-center gap-x-2 hidden md:flex'>
        <Image src="/logo.png" alt="logo" width={30} height={30}/>
        <p className={cn('text-lg text-neutral-700 pb-1',TextFont.className)}>Taskify</p>
      </div>
    </Link>
  )
}

export default Logo
