import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

type Props = {
  action: string;
};

const Assignment = ({ action }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="topicAction">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={15}
            height={16}
            fill="none"
          >
            <rect width={15} height={15} y={0.248} fill="#F2DD66" rx={5} />
            <path
              fill="#1B1F20"
              d="M10.56 8.472H8.472v2.136H6.528V8.472H4.44V6.636h2.088V4.488h1.944v2.148h2.088v1.836Z"
            />
          </svg>
          <span>{action}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="border-b pb-3">
            {action}
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Assignment;
