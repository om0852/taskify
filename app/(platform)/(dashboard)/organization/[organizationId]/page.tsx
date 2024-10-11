import { db } from "@/lib/db";
import React, { Suspense } from "react";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";
import { BoardList } from "./_components/BoardList";
import { checkSubscription } from "@/lib/subscription";

const Page = async () => {
  const isPro =await checkSubscription();
  const boards = await db.board.findMany();
  return (
    <div className="w-full mb-20">
      <Info isPro={isPro}/>
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton/>}>
        <BoardList/>
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
