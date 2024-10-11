"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import Image from "next/image";
import React from "react";

const ProModal = () => {
  const proModal = useProModal();
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">

        <Image src={"/hero.jpg"} alt="image" className="object-cover h-[20vh]" fill />
        </div>
        {/* <ProModal/> */}
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
