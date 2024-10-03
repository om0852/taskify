"use client"
import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import { PopoverTrigger, Popover, PopoverClose } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { PopoverContent } from "@radix-ui/react-popover";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {

  const {execute,isLoading}=useAction(deleteBoard,{
    onError(error) {
     toast.error(error) 
    }
  });
  const onDelete=()=>{
    execute({id});
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"transparent"}>
          <MoreHorizontal className="h-4 w-4 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-2 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm  font-medium text-center bg-white text-neutral-600 pb-4">
          Board Action
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button disabled={isLoading} className="rounded-none w-full h-auto px-5p-2 justify-start font-normal text-sm" onClick={onDelete} variant={"ghost"}>Delete this board</Button>
      </PopoverContent>
    </Popover>
  );
};
