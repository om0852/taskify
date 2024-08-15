import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom"

interface FormInputProps{
    errors?:{
        title?:string[]
    }
}
export const FormInput=({errors}:FormInputProps)=>{
    const {pending}=useFormStatus();
    return(
        <>
         <Input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          disabled={pending}
          className="border-black border p-1"
        />
         {errors?.title && errors?.title.map((error:string)=>(
          <p className='text-rose-500'>{error}</p>
        ))}
        </>
    )
}