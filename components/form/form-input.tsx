"use client"
import React, { forwardRef } from 'react'
import { useFormStatus } from 'react-dom';

interface FormInputProps{
    id:string;
    label?:string;
    type?:string,
    placeholder?:boolean;
    required?:boolean;
    disabled?:boolean;
    error?:Record<string,string[] |undefined>;
    className?:string;
    defaultValue?:string;
    onBlur?:()=>void;
}


export const FormInput = forwardRef<HTMLInputElement,FormInputProps>(({id,label,type,placeholder,required,disabled,error,className,defaultValue="",onBlur},ref)=>{
const {pending} = useFormStatus();
  return (
    <div className='space-y-2'>
      <div className='space-y-1'></div>
    </div>
  )
})

