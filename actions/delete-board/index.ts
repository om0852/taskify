"use server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "../create-board/create-safe-action";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { descreaseAvailableCount } from "@/lib/orgLimit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const isPro =await checkSubscription();
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id } = data;
  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });
    await createAuditLog({
      entityTitle:board.title,
      entityId:board.id,
      entityType:ENTITY_TYPE.BOARD,
      action:ACTION.DELETE
    })
    if(!isPro){
      await descreaseAvailableCount();
    }
  } catch (e) {
    return {
      error: "Failed to delete",
    };
  }
  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};
export const deleteBoard = createSafeAction(DeleteBoard, handler);
