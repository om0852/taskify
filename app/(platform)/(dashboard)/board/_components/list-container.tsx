import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import React from "react";
import ListForm from "./list-form";
interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}
const ListContainer = ({ boardId, data }: ListContainerProps) => {
  return (
    <ol>
        <ListForm/>
      <div className="flex-shrink-0 w-1"></div>
    </ol>
  );
};

export default ListContainer;
