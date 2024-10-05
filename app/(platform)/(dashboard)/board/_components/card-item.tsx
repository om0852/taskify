import { Card } from "@prisma/client";
import React from "react";
interface CardItemProps {
  index: number;
  data: Card;
}
const CardItem = ({ index, data }: CardItemProps) => {
  return (
    <div role="button" className="truncate border2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm">
      {data.title}
    </div>
  );
};

export default CardItem;
