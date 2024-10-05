import FormSubmit from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import React, { forwardRef } from "react";
interface cardFormProps {
  listId: string;
  enableEditing: () => void;
  disabledEditing: () => void;
  isEditing: boolean;
}
const CardForm = forwardRef<HTMLTextAreaElement, cardFormProps>(
  (
    { listId, isEditing, enableEditing, disabledEditing }: cardFormProps,
    ref
  ) => {
    if (isEditing) {
      return (
        <form className="m-1 py-0.5 px-1 space-y-4">
          <FormTextarea
            id="title"
            onKeyDown={() => {}}
            ref={ref}
            placeholder="Enter a title for this card"
          />
          <input hidden id="listId" name="listId" value={listId} />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add Card</FormSubmit>
            <Button onClick={disabledEditing} size={"sm"} variant={"ghost"}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div>
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm "
          size={"sm"}
          variant={"ghost"}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);
CardForm.displayName = "CardForm";
export default CardForm;
