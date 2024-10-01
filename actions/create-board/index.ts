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

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
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
  } catch (error) {
    return {
      error: "Failed to create",
    };
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
