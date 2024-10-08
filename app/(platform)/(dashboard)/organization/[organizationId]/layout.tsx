import React from 'react'
import OrgControl from './_components/OrgControl'
import { startCase } from 'lodash';
import { auth } from '@clerk/nextjs';
export async function generateMetadata(){
  const {orgSlug}=auth();
  return{
    title:startCase(orgSlug||"organization")
  }
}
const OrdIdLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <OrgControl/>
      {children}
    </>
  )
}

export default OrdIdLayout
