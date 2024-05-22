import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { Courses } from "@/components/courses/Page";
import StarRating from "@/components/ui/rating";

export const columns: ColumnDef<Courses>[] = [
  {
    accessorKey: "microcredential",
    header: "Microcredential",
    cell: ({ row }) => (
      <div className="capitalize font-bold">
        {row.getValue("microcredential")}
      </div>
    ),
  },
  {
    accessorKey: "enrollment",
    header: "Total enrolled",
    cell: ({ row }) => (
      <div className="capitalize font-bold">{row.getValue("enrollment")}</div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const ratingValue: number = row.getValue("rating");
      return (
        <div className="flex items-center">
          <StarRating value={ratingValue} />
        </div>
      );
    },
  },
];
