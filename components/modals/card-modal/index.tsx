import { Dialog } from '@/components/ui/dialog'
import { useCardModel } from '@/hooks/use-card-model'
import { DialogContent } from '@radix-ui/react-dialog'
import React from 'react'

const CardModal = () => {
    const id =useCardModel((state)=>state.id);
    const isOpen =useCardModel((state)=>state.isOpen);
    const onClose =useCardModel((state)=>state.onClose);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        I am a modal
      </DialogContent>
    </Dialog>
  )
}

export default CardModal
