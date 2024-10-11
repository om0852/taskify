import { auth } from "@clerk/nextjs";
import { db } from "./db";

import { MAX_FREE_BOARDS } from "@/constants/board";
export const incrementAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};
export const descreaseAvailableCount = async () => {
  const { orgId } = auth();
  if (!orgId) {
    throw new Error("unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count >0?orgLimit.count-1:0 },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};


export const hasAvailableCount =async()=>{
    const {orgId}=auth();

    if(!orgId){
        throw new Error("Unauthorized");
    }

    const orgLimiit = await db.orgLimit.findUnique({
        where:{orgId}
    })
    if(!orgLimiit || orgLimiit.count<MAX_FREE_BOARDS){
        return true;
    }
    else{
        return false;
    }
}

export const getAvailableCount =async ()=>{
    const {orgId}=auth();

    if(!orgId){
        throw new Error("Unauthorized");
    }

    const orgLimiit = await db.orgLimit.findUnique({
        where:{orgId}
    })
    if(!orgLimiit){
        return 0;
    }
    else{
        return orgLimiit.count;
    }
}
