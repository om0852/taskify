import { AuditLog } from '@prisma/client'
import React from 'react'

interface ActivityItemProps{
data:AuditLog
}

const ActivityItem = ({data}:ActivityItemProps) => {
  return (
    <div>
      activiy item
    </div>
  )
}

export default ActivityItem
