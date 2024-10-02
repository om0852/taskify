import {z} from "zod";
import {Board} from "@prisma/client";
import { ActionState } from "../create-board/create-safe-action";
import { UpdateBoard } from "./schema";
import Input from "postcss/lib/input";

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionState<InputType,Board>;