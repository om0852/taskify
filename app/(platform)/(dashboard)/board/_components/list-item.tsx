"use client"
import { ListWithCards } from '@/types'
import React, { ElementRef, useRef, useState } from 'react'
import ListHeader from './list-header';
import CardForm from './card-form';
interface ListItemProps{
    data:ListWithCards;
    index:number
}
const ListItem = ({data,index}:ListItemProps) => {

  const [isEditing,setIsEditing]=useState(false);
  const textareaRef=useRef<ElementRef<"textarea">>(null);
  const disabledEditing=()=>{
    setIsEditing(false)
  }
  const enableEditing=()=>{
    setIsEditing(true);
    setTimeout(()=>{
      textareaRef.current?.focus();
    })
  }
  return (
    <li key={index} className='shrink-0 h-full w-[272px] select-none mr-1'>
      <div className='w-full rounded-md bg-[#f1f2f4] shadow-orange-50-md pb-2'>
        <ListHeader onAddCard={enableEditing} data={data}/>
        <CardForm listId={data.id} ref={textareaRef} isEditing={isEditing} enableEditing={enableEditing} disabledEditing={disabledEditing}/>
      </div>
    </li>
  )
}

export default ListItem
