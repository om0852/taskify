"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import {z} from "zod"

export type State={
  message?:string|null,
  errors?:{
    title?:string[];
  }
}
const CreateBoard =z.object({
    title:z.string().min(3,{message:"Minimum length of 3 is required"})
})

export async function create(prevState:State,formData: FormData) {
const validateFields = CreateBoard.safeParse({
    title:formData.get("title")
})
if(!validateFields.success){
  return {errors:validateFields.error.flatten().fieldErrors,
    message:"Missing Fields"

  }
}
const {title} = validateFields.data
    await db.board.create({
      data: {
        title,
      },
    });

revalidatePath("/organization/org_2kdLM2EDsANfK382b3unm4xi41X")

}