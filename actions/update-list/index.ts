"use server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "../create-board/create-safe-action";
import { UpdateList } from "./schema";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { createAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, id,boardId } = data;
  let list;
  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board:{
          orgId
        }
      },
      data: {
        title,
      },
    });
    await createAuditLog({
      entityTitle:list.title,
      entityId:list.id,
      entityType:ENTITY_TYPE.LIST,
      action:ACTION.UPDATE
    })
  } catch (e) {
    return {
        error:"Failed to update"
    }
  }
  revalidatePath(`/board/${boardId}`);
  return {data:list};
};
export const updateList = createSafeAction(UpdateList,handler);
