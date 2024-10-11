import { String } from "lodash";
import {create} from "zustand"

type ProModalStore={
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}
export const useProModal=create<ProModalStore>((set)=>({
    isOpen:true,
    onClose:()=>set({isOpen:false}),
    onOpen:()=>set({isOpen:true})
}))