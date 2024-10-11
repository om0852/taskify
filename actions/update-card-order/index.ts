"use server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "../create-board/create-safe-action";
import { UpdateCardOrder } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  
  const { items,boardId } = data;
  let updateCards;
  try {
    const transaction = items.map((card=>
      db.card.update({
        where:{
          id:card.id,
          list:{
            board:{
              orgId
            }
          }
        },
        data:{
          order:card.order,
          listId:card.listId
        }
      })
    ))
    // updateCards =await db.$transaction(transaction);
    // await createAuditLog({
    //   entityTitle:card.title,
    //   entityId:card.id,
    //   entityType:ENTITY_TYPE.CARD,
    //   action:ACTION.DELETE
    // })
  } catch (e) {
    return {
      error: "Failed to reorder",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updateCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
