import { ListWithCards } from '@/types';
import { List } from '@prisma/client'
import React from 'react'
interface ListContainerProps{
    data:ListWithCards[];
    boardId:string;
}
const ListContainer = ({boardId,data}:ListContainerProps) => {
  return (
    <div>
      
    </div>
  )
}

export default ListContainer
