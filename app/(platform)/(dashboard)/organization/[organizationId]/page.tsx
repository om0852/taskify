import { db } from "@/lib/db";
import React from "react";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";

const Page = async () => {
  const boards = await db.board.findMany();
  return (
    <div className="w-full mb-20">
      <Info/>
    <Separator className="my-4"/>
    </div>
  );
};

export default Page;
