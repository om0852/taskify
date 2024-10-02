import { Button } from "@/components/ui/button";
import { PopoverTrigger, Popover, PopoverClose } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { MoreHorizontal, X } from "lucide-react";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"transparent"}>
          <MoreHorizontal className="h-4 w-4 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm w-[30vh] font-medium text-center bg-white text-neutral-600 p-2">
          Board Action
            </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-4 right-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button className="">Delete this board</Button>
      </PopoverContent>
    </Popover>
  );
};
