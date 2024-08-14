import React from 'react'
import OrgControl from './_components/OrgControl'

const OrdIdLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <OrgControl/>
      {children}
    </>
  )
}

export default OrdIdLayout
