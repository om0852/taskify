import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";
import React from "react";
interface ActivityProps {
  items: AuditLog[];
}
const Activity = ({ items }: ActivityProps) => {
    // console.log(items)
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="w-5 h-5 text-neutral-500 mt-0.5" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Activity</p>
        <ol className="mt-2 space-y-4">
          {items.map((item) => (
            <p>{item.entityTitle}</p>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Activity;

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-center gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 mb-10 bg-neutral-200" />
        <Skeleton className="h-10 w-full bg-neutral-200" />
      </div>
    </div>
  );
};
