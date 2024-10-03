import {z} from "zod";
export const CreateList =z.object({
    title:z.string({
        required_error:"Title is required",
        invalid_type_error:"TItle is required"
    }).min(3,{
        message:"Title is too short"
    }),
    boardId:z.string()
})