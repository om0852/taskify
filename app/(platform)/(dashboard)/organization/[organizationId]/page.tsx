import { db } from "@/lib/db";
import React from "react";
import Info from "./_components/info";

const Page = async () => {
  const boards = await db.board.findMany();
  return (
    <div className="w-full mb-20">
      <Info/>
    
    </div>
  );
};

export default Page;
