import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log:AuditLog)=>{
    const {action,entityTitle,entityType}=log;


    switch(action){
        case ACTION.CREATE:
            return `created ${entityType.toLowerCase()} "${entityTitle}"`
        case ACTION.UPDATE:
            return `update ${entityType.toLowerCase()} "${entityTitle}"`
        case ACTION.DELETE:
            return `delete ${entityType.toLowerCase()} "${entityTitle}"`
        default:
            return `unkown action ${entityType.toLowerCase()} "${entityTitle}"`
    }
}