"use client"
import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ListForm from "./list-form";
import ListItem from "./list-item";
interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}
const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderData, setOrderData] = useState(data);
  useEffect(() => {
    setOrderData(data);
  }, [data]);
  return (
    <ol className="flex gapx-3 h-full">
      {orderData.map((list, index) => (
        <ListItem  key={index} index={index} data={list} />
      ))}
      <ListForm />
      <div className="flex-shrink-0 w-1"></div>
    </ol>
  );
};

export default ListContainer;
