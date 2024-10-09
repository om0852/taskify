import {z} from "zod";
import {Board, Card, List} from "@prisma/client";
import { ActionState } from "../create-board/create-safe-action";
import { CopyCard } from "./schema";

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputType,Card>;