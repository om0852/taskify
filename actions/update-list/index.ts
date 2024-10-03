"use server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "../create-board/create-safe-action";
import { UpdateList } from "./schema";

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
  } catch (e) {
    return {
        error:"Failed to update"
    }
  }
  revalidatePath(`/board/${boardId}`);
  return {data:list};
};
export const ppdateList = createSafeAction(UpdateList,handler);
