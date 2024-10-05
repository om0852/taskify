import {z} from "zod";
import {Card, List} from "@prisma/client";
import { ActionState } from "../create-board/create-safe-action";
import Input from "postcss/lib/input";
import { CreateCard } from "./schema";

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputType,Card>;