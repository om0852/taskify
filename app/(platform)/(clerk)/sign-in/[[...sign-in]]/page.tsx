"use client";
import { SignIn } from "@clerk/nextjs";
// import { SignIn } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return (
    <>
      <SignIn />
    </>
  );
  // <SignIn />;
};

export default Page;
