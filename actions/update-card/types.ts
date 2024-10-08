import {z} from "zod";
import {Board, Card, List} from "@prisma/client";
import { ActionState } from "../create-board/create-safe-action";
import { UpdateCard } from "./schema";
import Input from "postcss/lib/input";

export type InputType = z.infer<typeof UpdateCard>;
export type ReturnType = ActionState<InputType,Card>;