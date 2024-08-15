"use client"
import { create } from '@/actions/create-board'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormState } from 'react-dom'
import { FormInput } from './form-input'
import SubmitButton from './submit-button'

const Form = () => {
  const intialState = {message:null,errors:{}}
  const [state,dispatch]=useFormState(create,intialState)
  return (
    
    <form action={dispatch}>
      <div className='flex flex-col space-y-2'>
       <FormInput errors={state?.errors}/>
       <SubmitButton/>
          </div>
      </form>
  )
}

export default Form
