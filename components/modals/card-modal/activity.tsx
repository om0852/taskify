import { Skeleton } from '@/components/ui/skeleton'
import { AuditLog } from '@prisma/client'
import React from 'react'
interface ActivityProps{
    item:AuditLog[]
}
const Activity = ({item}:ActivityProps) => {
  return (
    <div>
      activity
    </div>
  )
}

export default Activity



Activity.Skeleton= function ActivitySkeleton(){
    return(
        <div className='flex items-center gap-x-3 w-full'>
            <Skeleton className='h-6 w-6 bg-neutral-200'/>
            <div className='w-full'>
            <Skeleton className='h-6 w-24 mb-10 bg-neutral-200'/>
            <Skeleton className='h-10 w-full bg-neutral-200'/>

            </div>
        </div>
    )
}