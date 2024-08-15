
import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import React from "react";
import Board from "./_components/Board";
import Form from "./form";

const Page = async() => {
  const boards = await db.board.findMany();
  return (
    <div className="flex flex-col space-y-4">
      <Form/>
      <div className="space-y-2">
        
        {boards && boards.map((data)=>{
          return(
            <>
          <Board key={data.id} title={data.title} id={data.id}/>
            </>
          )
        })}
      </div>
    </div>
  );
};

export default Page;
