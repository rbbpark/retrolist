"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return <ChevronLeft onClick={goBack} className="h-8 w-8 cursor-pointer" />;
}
