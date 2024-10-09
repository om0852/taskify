"use client"
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'
import { CardWithList } from '@/types'
import { Copy, Trash } from 'lucide-react';
import React from 'react'
interface ActionsProps{
    data:CardWithList;
}
const Actions = ({data}:ActionsProps) => {
  return (
    <div className='space-y-2 mt-2'>
      <p className='text-sm font-semibold'>Actions</p>
      <Button className='w-full justify-center' size={"inline"} variant={"gray"}><Copy className='h-4 w-4 mr-2'/>Copy</Button>
      <Button className='w-full justify-center' size={"inline"} variant={"gray"}><Trash className='h-4 w-4 mr-2'/>Delete</Button>
    </div>
  )
}

export default Actions

Actions.Skeleton = function ActionSkeleton(){
    return(
        <div className='space-y-2 mt-2'>
            <Skeleton className='w-20 h-4 bg-neutral-200'/>
            <Skeleton className='w-full h-8 bg-neutral-200'/>
            <Skeleton className='w-full h-8 bg-neutral-200'/>
        </div>
    )
}