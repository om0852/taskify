import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import React from "react";
import 'tailwindcss/tailwind.css';
import { cn } from "@/lib/utils";
import Starting from "./_components/Starting";
const TextFont= Poppins({subsets:['latin'],weight:["100","200","300","400","500","600","700","800","900"]})
const LayoutPage = () => {
  return (
   <Starting/>
  );
};

export default LayoutPage;
