import { deleteBoard } from '@/actions/delete-board'
import { Button } from '@/components/ui/button'
import React from 'react'
interface BoadProps{
    id:string,
    title:string
}
const Board = ({id,title}:BoadProps) => {
    const deleteBoardId = deleteBoard.bind(null,id)
  return (
    <form action={deleteBoardId}>
      {title}
      <Button type='submit' variant={"destructive"} size={"sm"}>Delete</Button>
    </form>
  )
}

export default Board
