import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { forwardRef } from 'react'
interface cardFormProps{
    listId:string;
    enableEditing:()=>void;
    disabledEditing:()=>void;
    isEditing:boolean

}
const CardForm = forwardRef<HTMLTextAreaElement,cardFormProps>(({listId,enableEditing,disabledEditing}:cardFormProps,ref) => {
  return (
    <div>
      <Button onClick={enableEditing} className='h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm ' size={"sm"} variant={"ghost"}><Plus className='h-4 w-4 mr-2'/>Add a card</Button>
    </div>
  )
})
CardForm.displayName="CardForm"
export default CardForm
