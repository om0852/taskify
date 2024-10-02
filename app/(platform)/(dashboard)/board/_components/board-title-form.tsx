"use client"

import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";

interface BoardTitleForm{
    data:Board;
}
export const BoardTitleForm=({data}:BoardTitleForm)=>{
    return(
        <Button className="font-bold text-lg h-auto w-auto p-1 px-2">
            {data.title}
        </Button>
    )
}