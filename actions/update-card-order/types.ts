import {z} from "zod";
import {Board, Card, List} from "@prisma/client";
import { ActionState } from "../create-board/create-safe-action";
import { UpdateCardOrder } from "./schema";

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputType,Card[]>;