import { Table } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { AddJobDialog } from "./add-job-dialog";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onSearch: (term: string) => void;
  onAddNewJob?: (jobData: any) => void;
}

export function DataTableToolbar<TData>({
  table,
  onSearch,
  onAddNewJob,
}: DataTableToolbarProps<TData>) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (jobData: any) => {
    onAddNewJob?.(jobData);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search jobs..."
            value={table.getState().globalFilter}
            onChange={(event) => onSearch(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Job
          </Button>
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
          <DataTableViewOptions table={table} />
        </div>
      </div>

      <AddJobDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
}
