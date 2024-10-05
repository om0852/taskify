"use client";
import { updateList } from "@/actions/update-list";
import { UpdateList } from "@/actions/update-list/schema";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import ListOptions from "./list-options";
interface ListHeaderProps {
  data: List;
}
const ListHeader = ({ data }: ListHeaderProps) => {

const {execute,FieldErrors,isLoading}=useAction(updateList,{
    onSuccess(data) {
        toast.success(`Remae to "${data.title}"`);
        setTitle(data.title);
        disabledEditing();
    },
    onError(error){
        toast.error(error);
    }
})

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const disabledEditing = () => {
    setIsEditing(false);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };
  const handleSubmit=(formData:FormData)=>{
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if(title===data.title){
        return disabledEditing();
    }
    execute({title,id,boardId});
    
  }
  const onBlur=()=>{
    formRef.current?.requestSubmit();
  }
  useEventListener("keydown", onKeyDown);
  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form className="flex-1 px-[2px]" ref={formRef} action={handleSubmit} >
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormInput
            placeholder="Enter list title..."
            defaultValue={title}
            ref={inputRef}
            id="title"
            onBlur={onBlur}
            className="text-sm px-[7px] py-1 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden></button>
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {data.title}
        </div>
      )}
      <ListOptions data={data} onAddCard={()=>{}}/>
    </div>
  );
};

export default ListHeader;



// 7:39:32