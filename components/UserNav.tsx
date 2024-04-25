import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

export function UserNav() {
  const user = useCurrentUser();
  const onClick = () => {
    signOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://i.pinimg.com/564x/72/d7/cc/72d7cc32e51ef9c829011bb9bf84f36a.jp"
              alt="@shadcn"
              className="object-cover"
            />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.email.split("@")[0]}
            </p>
            <p className="text-xs leading-none font-semibold ">{user?.role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onClick} className=" bg-red-500">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
