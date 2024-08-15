"use client"
import { create } from '@/actions/create-board'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormState } from 'react-dom'

const Form = () => {
  const intialState = {message:null,errors:{}}
  const [state,dispatch]=useFormState(create,intialState)
  return (
    <form action={dispatch}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
        />
        <Button type="submit">Submit</Button>
      </form>
  )
}

export default Form
