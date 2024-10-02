import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import React from 'react'
import MobileSidebar from './MobileSidebar'
import FormPopover from '@/components/form/form-popover'

const Navbar = () => {
  return (
    <nav className='fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center'>
      <MobileSidebar/>
      <div className='flex items-center gap-x-4'>
        <div className='hidden md:flex'>
            <Logo/>
        </div>
        <FormPopover align='start' side='bottom' sideOffset={20}>

            <Button size={"sm"} variant={"destructive"} className='rounded-sm hidden md:block h-auto py-1.5 px-2'>Create</Button>
        </FormPopover>
        <FormPopover>
            <Button size={"sm"} variant={"destructive"} className='rounded-sm block md:hidden'><Plus className='h-4 w-4'/></Button>
        </FormPopover>
      </div>
      <div className='ml-auto flex items-center gap-x-2'>
        <OrganizationSwitcher hidePersonal afterCreateOrganizationUrl={"organization/:id"} afterLeaveOrganizationUrl='/select-org' afterSelectOrganizationUrl={"organization/:id"} appearance={{elements:{
            rootBox:{
                display:"flex",alignItems:"center",justifyContent:"center"
            }
        }}}/>
        <UserButton afterSignOutUrl='/' appearance={{elements:{
            rootBox:{
                height:30,width:30
            }
        }}}/>
      </div>
    </nav>
  )
}

export default Navbar
