"use client";
import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ListForm from "./list-form";
import ListItem from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { describe } from "node:test";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderData, setOrderData] = useState(data);
const {execute:executeUpdateListOrder}=useAction(updateListOrder,{
  onSuccess(){
    toast.success("list reorder")
  },
  onError(error){
    toast.error(error);
  }
});
  useEffect(() => {
    setOrderData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }

    //if dropped in the same position
    if (
      destination.droppableId === source.droppabledId &&
      destination.index === source
    ) {
      return;
    }
    // /User move a list
    if (type == "list") {
      const items = reorder(orderData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderData(items);
      executeUpdateListOrder({items,boardId})
    }

    // /user moves a card
    if(type==="card"){
      let newOrderData = [...orderData];
      const sourceList =newOrderData.find(list=>list.id===source.droppableId);
      const destList = newOrderData.find(list=>list.id===destination.droppableId);

      if(!sourceList || !destList){
        return;
      }

      //Check if card exists on source list
      if(!sourceList.cards){
        sourceList.cards=[];
      }
      if(!destination.cards){
        destination.cards=[];
      }

      //moving the card in the same list
      if(source.droppableId ===destination.droppableId){
        const reorderedCards =reorder(sourceList.cards,source.index,destination.index);
        reorderedCards.forEach((card,idx)=>{
          card.order=idx;
        })
        sourceList.cards =reorderedCards;

        setOrderData(newOrderData)
      }
      else{
        const [movedCard]= sourceList.cards.splice(source.index,1);
        movedCard.listId=destination.droppableId;

        destList.cards.splice(destination.index,0,movedCard);
        sourceList.cards.forEach((card,index)=>{
          card.order=index;
        });

        //update the order for each card in destination list
        destList.cards.forEach((card,index)=>{
          card.order=index;
        })
        setOrderData(newOrderData)
        //Trigger server actiojn
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderData.map((list, index) => (
              <ListItem key={index} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1"></div>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
