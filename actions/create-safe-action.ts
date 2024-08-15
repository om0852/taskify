import {Schema, z} from "zod"

export type FieldError<T>={
    [K in keyof T]?:string

}
export type ActionState<TInput,TOuput>={
    fieldErrors?:FieldError<TInput>;
    error?:string | null;
    data?:TOuput;
}
export const createSafeAction = <TInput,TOuput>(
    schema:Schema<TInput>,
    handler:(validationData:TInput)=>Promise<ActionState<TInput,TOuput>>
)=>{
    return async(data:TInput):Promise<ActionState<TInput.TOuput>>
}