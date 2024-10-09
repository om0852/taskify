"use client";
import React, { forwardRef, KeyboardEventHandler } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { FormErrors } from "./FormError";
import { useFormStatus } from "react-dom";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[]> | undefined;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
}

// Define the forwardRef component
export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required = false,
      disabled = false,
      errors,
      className = "",
      onBlur,
      onClick,
      onKeyDown,
      defaultValue,
    },
    ref
  ) => {
    // Error state based on id
    const { pending } = useFormStatus();

    return (
      <div className={`form-group ${className} space-y-2 w-full`}>
        <div className="space-y-1 w-full">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            defaultValue={defaultValue}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            ref={ref}
            onClick={onClick}
            id={id}
            required={required}
            placeholder={placeholder}
            name={id}
            disabled={disabled || pending}
            className={cn(
              "resize-none focus-visible:ring-0 from-currentring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={`${id}-error`}
          ></Textarea>
        </div>
        <FormErrors id={id} error={errors} />
      </div>
    );
  }
);

// Set displayName to avoid issues with forwardRef
FormTextarea.displayName = "FormTextarea";
