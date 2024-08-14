import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = () => {
  async function create(formData:FormData){
    "use server"
    const title = formData.get("title")
    console.log("i am trigger")
  }
  return (
    <div>
      <form action={create}>
        <input id="title" name="title" required placeholder="Enter a board title" className="border-black border p-1"/>
      </form>
          </div>
  );
};

export default Page;
