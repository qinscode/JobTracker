import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

import { Job } from "@/types";
import { statuses } from "@/pages/jobs/data/data.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

export const columns: ColumnDef<Job>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <div className="w-[40px]">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px] "
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "JobTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[200px] flex-col">
          <Link
            to={`/job/${row.original.id}`}
            className="line-clamp-1 font-medium hover:underline"
          >
            {row.getValue("JobTitle")}
          </Link>
          <span className="line-clamp-1 text-xs font-medium text-muted-foreground">
            {row.original.JobType}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "BusinessName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[190px]  flex-col">
        <span className="line-clamp-1 font-medium">
          {row.getValue("BusinessName")}
        </span>
        <span className="line-clamp-1 text-xs font-medium  text-muted-foreground">
          {row.original.Suburb} {row.original.Area}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "WorkType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Work Type" />
    ),
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("WorkType")}</Badge>
    ),
  },
  {
    accessorKey: "PayRange",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pay Range" />
    ),
    cell: ({ row }) => <div>{row.getValue("PayRange")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      // const status = row.getValue('status') as Job['status']

      const status = statuses.find(
        (Status) => Status.value === (row.getValue("Status") as Job["Status"])
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[180px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );

      // return <Badge variant='outline'>{status}</Badge>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "PostedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posted Date" />
    ),
    cell: ({ row }) => <div>{row.getValue("PostedDate")}</div>,
  },

  {
    accessorKey: "JobDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Description" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 max-w-[180px]">
        {row.getValue("JobDescription")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
