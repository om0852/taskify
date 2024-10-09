"use client";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModel } from "@/hooks/use-card-model";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";
interface ActionsProps {
  data: CardWithList;
}
const Actions = ({ data }: ActionsProps) => {
  const cardModal = useCardModel();
  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess(data1) {
        toast.success(`Card "${data1.title} copied"`);
        cardModal.onClose();
      },
      onError(error) {
        toast.error(error);
      },
    }
  );
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess(data1) {
        toast.success(`Card "${data1.title} delete"`);
        cardModal.onClose();
      },
      onError(error) {
        toast.error(error);
      },
    }
  );
  const params = useParams();

  const onCopy = () => {
    const boardId = params.boardId as string;
console.table(data)
    executeCopyCard({ id: data?.id, boardId });
  };
  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({ id: data?.id, boardId });
  };
  return (
    <div className="space-y-2 mt-2">
      <p className="text-sm font-semibold">Actions</p>
      <Button
        className="w-full justify-center"
        size={"inline"}
        variant={"gray"}
        onClick={onCopy}
        disabled={isLoadingCopy}
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        className="w-full justify-center"
        size={"inline"}
        variant={"gray"}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

export default Actions;

Actions.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
