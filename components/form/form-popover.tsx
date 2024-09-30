"use client";
import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";
import React from "react";
import { FormInput } from "./form-input";
import FormSubmit from "./form-submit";
import {toast} from "sonner";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { X } from "lucide-react";
interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}
const FormPopover = ({
  children,
  side,
  sideOffset = 0,
  align,
}: FormPopoverProps) => {
  const {execute,FieldErrors}=useAction(createBoard,{
    onSuccess(data) {
      console.log({data});
      toast.success("Board Created")
    },
    onError(error) {
      toast.error("Invalid attempt")
      console.log(error)
    },
  })
  const onSumbit=(formData:FormData)=>{
    const title = formData.get("title") as string;
    execute({title});
  }
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose asChild><Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 " variant={"ghost"}><X className="h-4 w-4"/></Button></PopoverClose>
        <form action={onSumbit} className="space-y-4">
          <div className="space-y-4">
            <FormInput id="title" label="Board title" type="text" errors={FieldErrors}/>
          </div>
          <FormSubmit className="w-full">
            Create
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
