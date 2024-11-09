import { Layout } from "@/components/custom/layout.tsx";
import ThemeSwitch from "@/components/theme-switch.tsx";
import { UserNav } from "@/components/user-nav.tsx";
import { DataTable } from "../../components/data-table.tsx";
import { columns } from "../../components/columns.tsx";
import { Job } from "@/types";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useJobStatusCounts } from "@/hooks/useTotalJobsCount.ts";
import api from "@/api/axios.ts";
import { adaptJob } from "@/adapters/jobAdapter";

const DEFAULT_PAGE_SIZE = 20;

export default function AppliedJobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = parseInt(
    searchParams.get("pageSize") || DEFAULT_PAGE_SIZE.toString(),
    10
  );
  const currentPage = parseInt(searchParams.get("pageNumber") || "1", 10);
  const searchTerm = searchParams.get("searchTerm") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const sortDescending = searchParams.get("sortDescending") === "true";

  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalJobsCount, setTotalJobsCount] = useState(0);

  const { refetch: refetchJobStatusCounts } = useJobStatusCounts();

  const fetchJobs = useCallback(async () => {
    setError(null);
    
    try {
      const response = await api.get(`/UserJobs/status/Applied`, { 
        params: {
          searchTerm,
          pageNumber: currentPage,
          pageSize,
          sortBy,
          sortDescending
        }
      });

      const adaptedJobs = response.data.jobs.map((job: any) => {
        const adaptedJob = adaptJob(job);
        if (!adaptedJob.status) {
          adaptedJob.status = "Applied";
        }
        return adaptedJob;
      });

      setJobs(adaptedJobs);
      setTotalJobsCount(response.data.totalCount);
    } catch (err) {
      console.error("Error fetching applied jobs:", err);
      setError("Failed to fetch applied jobs");
    }
  }, [currentPage, pageSize, searchTerm, sortBy, sortDescending]);

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("pageNumber", page.toString());
      newParams.set("pageSize", pageSize.toString());
      return newParams;
    });
  };

  const handleDataChange = useCallback(
    (updatedData: Job[]) => {
      setJobs(updatedData);
      fetchJobs();
      refetchJobStatusCounts();
    },
    [fetchJobs, refetchJobStatusCounts]
  );

  const handleperPageChange = (newPageSize: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("pageSize", newPageSize.toString());
      newParams.set("pageNumber", "1");
      return newParams;
    });
  };

  const handleSearch = useCallback((term: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (term) {
        newParams.set("searchTerm", term);
      } else {
        newParams.delete("searchTerm");
      }
      return newParams;
    });
  }, [setSearchParams]);

  const handleSort = (column: string, descending: boolean) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sortBy", column);
      newParams.set("sortDescending", String(descending));
      return newParams;
    });
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your applied job applications!
            </p>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {error ? (
            <div>
              <p>Error: {error}</p>
              <button
                onClick={fetchJobs}
                className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
              >
                Retry
              </button>
            </div>
          ) : (
            <DataTable
              data={jobs}
              columns={columns}
              pageSize={pageSize}
              currentPage={currentPage}
              totalCount={totalJobsCount}
              onSearch={handleSearch}
              onSort={handleSort}
              onPageChange={handlePageChange}
              onDataChange={handleDataChange}
              onPageSizeChange={handleperPageChange}
            />
          )}
        </div>
      </Layout.Body>
    </Layout>
  );
}
