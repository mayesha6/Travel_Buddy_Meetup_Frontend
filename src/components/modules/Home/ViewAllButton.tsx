"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ViewAllButtonProps {
  label: string;    
  href: string;     
}

export default function ViewAllButton({ label, href }: ViewAllButtonProps) {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(href)}>
      {label}
    </Button>
  );
}
