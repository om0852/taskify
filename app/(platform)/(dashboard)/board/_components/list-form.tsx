import React, { ElementRef, useRef, useState } from "react";
import ListWrapper from "./list-wrapper";
import { Plus } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

const ListForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const disabledEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disabledEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disabledEditing);
  return (
    <ListWrapper>
      <button className="w-full rounded-md bg-white/80 hover:bg-white/50 transition flex p-3  items-center font-medium text-sm">
        <Plus className="h-4 w-4 pr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};

export default ListForm;
