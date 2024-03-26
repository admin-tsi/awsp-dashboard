import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import * as React from "react";

type Props = {
  title: string;
  className?: string;
};

export default function PageTitle({ title, className }: Props) {
  return (
    <div className="w-full flex justify-between my-10">
      <h1 className={cn("text-2xl font-semibold", className)}>{title}</h1>
      <Button asChild variant="outline">
        <Link href="/">
          <Plus className="mr-2 h-4 w-4" />
          Add a new {title.toLowerCase().slice(0, -1)}
        </Link>
      </Button>
    </div>
  );
}
