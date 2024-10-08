"use client";

import { updateBoard } from "@/actions/update-board";
import { UpdateBoard } from "@/actions/update-board/schema";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleForm {
  data: Board;
}
export const BoardTitleForm = ({ data }: BoardTitleForm) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [title,setTitle]=useState(data.title)
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`);
      setTitle(data.title);
      disabledEditing();
    },
    onError:(error)=>{
        toast.error(error);
    }
  });
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.select();
    });
  };
  const disabledEditing = () => {
    setIsEditing(false);
  };
  const onSumbit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({title,id:data.id});
    console.log("Updated");
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSumbit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          id="title"
          ref={inputRef}
          onBlur={() => {
            onBlur();
          }}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      className="font-bold text-lg h-auto w-auto p-1 px-2"
      variant={"transparent"}
    >
      {title}
    </Button>
  );
};
