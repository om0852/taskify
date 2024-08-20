import { deleteBoard } from "@/actions/create-board/delete-board";
import { Button } from "@/components/ui/button";
import React from "react";
import DeleteButton from "./delete-button";
interface BoadProps {
  id: string;
  title: string;
}
const Board = ({ id, title }: BoadProps) => {
  const deleteBoardId = deleteBoard.bind(null, id);
  return (
    <form action={deleteBoardId}>
      {title}
      <DeleteButton />
    </form>
  );
};

export default Board;
