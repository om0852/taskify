"use client"
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

const DeleteButton = () => {
    const {pending}=useFormStatus()
  return (
    <Button disabled={pending} type="submit" variant={"destructive"} size={"sm"}>
      Delete
    </Button>
  );
};

export default DeleteButton;
