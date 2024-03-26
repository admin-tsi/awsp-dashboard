import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Students } from "@/app/students/page";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

export const columns: ColumnDef<Students>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name", // Assuming you have a 'name' field for the users
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const progressValue: number = row.getValue("progress"); // Assuming this is a percentage (0-100)
      return (
        <div className="flex items-center">
          <Progress value={progressValue} className="w-[60%] mx-2" />
          {progressValue}%
        </div>
      );
    },
  },
  {
    accessorKey: "userStatus", // New column for user status
    header: "Status",
    cell: ({ row }) => {
      // Example of how you might want to display user status
      const status: string = row.getValue("userStatus");
      const statusColor =
        status === "Active" ? "text-green-500" : "text-red-500";
      return <div className={`capitalize ${statusColor}`}>{status}</div>;
    },
  },
  {
    accessorKey: "lastLogin", // Assuming you want to show the last login date
    header: "Last Login",
    cell: ({ row }) => {
      const dateValue = new Date(row.getValue("lastLogin"));
      const formattedDate = dateValue.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          onClick={() => console.log("Editing", row.original)}
          aria-label="Edit"
          className="p-2 rounded hover:bg-gray-100"
          variant="ghost"
        >
          <Edit2 className="h-4 text-blue-500" />
        </Button>
        <Button
          onClick={() => console.log("Deleting", row.original)}
          aria-label="Delete"
          className="p-2 rounded hover:bg-gray-100"
          variant="ghost"
        >
          <Trash2 className="h-4 text-red-500" />
        </Button>
      </div>
    ),
  },
];
