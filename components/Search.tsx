import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
export function SearchInput({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Search size={16} />
      </div>
      <Input
        type="search"
        placeholder="Search..."
        className="pl-10 pr-3 py-2 md:w-[100px] lg:w-[300px] rounded-full"
      />
    </div>
  );
}
