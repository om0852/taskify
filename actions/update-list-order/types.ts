import {z} from "zod";
import {Board, List} from "@prisma/client";
import { ActionState } from "../create-board/create-safe-action";
import Input from "postcss/lib/input";
import { UpdateListOrder } from "./schema";

export type InputType = z.infer<typeof UpdateListOrder>;
export type ReturnType = ActionState<InputType,List[]>;