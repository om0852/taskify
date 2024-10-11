"use server";

// import { useAuth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "./create-safe-action";
import { CreateBoard } from "./schema";
// import { getAuth } from "@clerk/nextjs/server"; // Import getAuth from the server module
import { auth, useAuth } from "@clerk/nextjs";
import { error } from "console";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { hasAvailableCount, incrementAvailableCount } from "@/lib/orgLimit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const cancount = hasAvailableCount();
  const isPro = await checkSubscription();
  if (!cancount && !isPro) {
    return {
      error:
        "You have reached your limit of free boards.please upgrade to create more.",
    };
  }
  const { title, image } = data;
  let board;
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");
  if (
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageThumbUrl ||
    !imageUserName ||
    !imageId
  ) {
    return {
      error: "Missing Fields. Failed to create board",
    };
  }
  try {
    //CREATE A BOARD IN DB
    // throw new Error("a")
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageFullUrl,
        imageThumbUrl,
        imageUserName,
        imageLinkHTML,
      },
    });
    if (!isPro) {
      await incrementAvailableCount();
    }
    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create",
    };
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
