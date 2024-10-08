import { useCardModel } from "@/hooks/use-card-model";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import React from "react";
interface CardItemProps {
  index: number;
  data: Card;
}
const CardItem = ({ index, data }: CardItemProps) => {
  const cardModal =useCardModel();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onClick={()=>cardModal.onOpen(data.id)}
        ref={provided.innerRef}
          role="button"
          className="truncate border2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
