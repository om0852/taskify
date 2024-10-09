import {z} from "zod";
import {Board, Card, List} from "@prisma/client";
import { ActionState } from "../create-board/create-safe-action";
import { DeleteCard } from "./schema";

export type InputType = z.infer<typeof DeleteCard>;
export type ReturnType = ActionState<InputType,Card>;