"use server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "../create-board/create-safe-action";
import { DeleteCard } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, boardId } = data;
  let card;
  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
  } catch (e) {
    return {
      error: "Failed to delete",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: card,
  };
};
export const deleteCard = createSafeAction(DeleteCard, handler);
