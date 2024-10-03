import React, { ReactNode } from 'react'
interface ListWrapperProps{
    children:ReactNode;
}
const ListWrapper = ({children}:ListWrapperProps) => {
  return (
    <li className='shrink-0 h-full w-[272px] slect-none'>
      {children}
    </li>
  )
}

export default ListWrapper
