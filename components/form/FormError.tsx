import { XCircle } from "lucide-react";
import React from "react";
interface formErrorsProps {
  id: string;
  error?: Record<string, string[] | undefined>;
}
export const FormErrors = ({ id, error }: formErrorsProps) => {
  if (!error) {
    return null;
  }
  return (
    <div
      className="mt-2 text-xs text-rose-500"
      id={`${id}-error`}
      aria-live="polite"
    >
      {error?.[id]?.map((err: string, index) => {
        return (
          <div
            className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
            key={index}
          >
            <XCircle className="h-4 w-4 mr-2" />
            {err}
          </div>
        );
      })}
    </div>
  );
};
