import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/lib/types";

export const columns = (
  handleDelete: (userId: string) => void,
): ColumnDef<User>[] => [
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
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email") || "-"}</div>,
  },
  {
    accessorKey: "firstname",
    header: "First Name",
    cell: ({ row }) => <div>{row.getValue("firstname") || "-"}</div>,
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="uppercase">{row.getValue("lastname") || "-"}</div>
    ),
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => {
      const dob = new Date(row.getValue("age"));
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return <div>{age || "-"}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone") || "-"}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role") || "-"}</div>,
  },
  /*  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const progressValue: number = row.getValue("progress");
      return (
        <div className="flex items-center">
          <Progress value={progressValue} className="w-[60%] mx-2" />
          {progressValue}%
        </div>
      );
    },
  },*/
  {
    accessorKey: "isverified",
    header: "Status",
    cell: ({ row }) => {
      const status: boolean = row.getValue("isverified");
      const statusColor = status ? "text-green-500" : "text-red-500";
      const statusText = status ? "Verified" : "Not Verified";
      return <div className={`${statusColor}`}>{statusText}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          onClick={() => handleDelete(row.original._id)} // Pass user ID to handleDelete function
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