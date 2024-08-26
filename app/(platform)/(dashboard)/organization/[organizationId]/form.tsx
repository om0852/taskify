"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormState } from 'react-dom'
import { FormInput } from './form-input'
import SubmitButton from './submit-button'
import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'

const Form = () => {
  const {execute,error,FieldErrors,isLoading}= useAction(createBoard,{
    onSuccess(data) {
      console.log(data,"sucess")
    },onError(error) {
      console.log(error)
    },
  });
  const onsubmit = (formdata:FormData)=>{
const title = formdata.get("title") as string
execute({title});
  }
  return (
    
    <form action={onsubmit}>
      <div className='flex flex-col space-y-2'>
       <FormInput errors={FieldErrors}/>
       <SubmitButton/>
          </div>
      </form>
  )
}

export default Form
