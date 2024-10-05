import {z} from "zod";
import {Board, List} from "@prisma/client";
import { ActionState } from "../create-board/create-safe-action";
import { CopyList } from "./schema";

export type InputType = z.infer<typeof CopyList>;
export type ReturnType = ActionState<InputType,List>;