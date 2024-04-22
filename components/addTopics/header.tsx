import React from "react";
import { Button } from "../ui/button";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white font-bold text-[16px]">Add topics</span>
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
    </div>
  );
};

export default Header;
