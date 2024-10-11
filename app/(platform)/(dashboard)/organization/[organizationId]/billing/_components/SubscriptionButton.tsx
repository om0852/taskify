"use client"
import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'
import { stripe } from '@/lib/stripe'
import React from 'react'
import { toast } from 'sonner'
interface ButtonProps{
    isPro:boolean
}
const SubscriptionButton = ({isPro}:ButtonProps) => {
    const useProModals =useProModal();
    const {execute ,isLoading}=useAction(stripeRedirect,{
        onSuccess(data) {
            window.location.href=data;
        },
        onError(error) {
            toast.error(error);
        },
    });

    const onClick = ()=>{
        if(isPro){
            execute({})
        }
        else{
            useProModals.onOpen();
        }
    }
  return (
    <Button onClick={onClick} variant={"primary"} disabled={isLoading}>
      {isPro?"Manage Subscription":"Upgrade to pro"}
    </Button>
  )
}

export default SubscriptionButton
