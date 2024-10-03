"use client"
import { ListWithCards } from '@/types'
import React from 'react'
import ListHeader from './list-header';
interface ListItemProps{
    data:ListWithCards;
    index:number
}
const ListItem = ({data,index}:ListItemProps) => {
  return (
    <li key={index} className='shrink-0 h-full w-[272px] select-none mr-1'>
      <div className='w-full rounded-md bg-[#f1f2f4] shadow-orange-50-md pb-2'>
        <ListHeader data={data}/>
      </div>
    </li>
  )
}

export default ListItem
