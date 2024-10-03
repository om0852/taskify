import {z} from "zod";
import { List} from "@prisma/client";
import { ActionState } from "../create-board/create-safe-action";
import {  UpdateList } from "./schema";
import Input from "postcss/lib/input";

export type InputType = z.infer<typeof UpdateList>;
export type ReturnType = ActionState<InputType,List>;