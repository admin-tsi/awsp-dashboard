import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "recharts";
import { Input } from "../ui/input";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white font-bold text-[16px]">Add topics</span>
      <Dialog>
        <DialogTrigger>
          <Button variant="add" size="addButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={17}
              height={17}
              fill="none"
              {...props}
            >
              <path
                fill="#1B1F20"
                d="M16.661 10.764h-5.568v5.696H5.91v-5.696H.341V5.868H5.91V.14h5.184v5.728h5.568v4.896Z"
              />
            </svg>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Topic</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col w-full space-y-2 mt-3">
                <span className="text-white font-bold">Topic Name</span>
                <Input
                  type="text"
                  id="TopciName"
                  placeholder="AZERTYU"
                  className="rounded-[10px] text-white"
                />
              </div>
              <p className="mt-5">
                This action cannot be undone. It will create your module and you
                will be able to add courses, quizzes and exercises from the
                appropriate space.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" className="text-black rounded-[10px]">
              Save Topic
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
