import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import GeneralError from "./pages/errors/general-error";
import NotFoundError from "./pages/errors/not-found-error";
import MaintenanceError from "./pages/errors/maintenance-error";
import UnauthorisedError from "./pages/errors/unauthorised-error.tsx";
import AppShell from "@/components/app-shell.tsx";

const router = createBrowserRouter([
  // Auth routes (not protected)
  {
    path: "/sign-in",
    lazy: async () => ({
      Component: (await import("./pages/auth/sign-in")).default,
    }),
  },
  {
    path: "/sign-up",
    lazy: async () => ({
      Component: (await import("./pages/auth/sign-up")).default,
    }),
  },
  {
    path: "/forgot-password",
    lazy: async () => ({
      Component: (await import("./pages/auth/forgot-password")).default,
    }),
  },

  // Protected routes
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./pages/dashboard")).default,
        }),
      },
      {
        path: "jobs",
        lazy: async () => ({
          Component: (await import("./pages/jobs/jobs_page/All")).default,
        }),
      },
      {
        path: "jobs/New",
        lazy: async () => ({
          Component: (await import("./pages/jobs/jobs_page/New")).default,
        }),
      },
      {
        path: "jobs/pending",
        lazy: async () => ({
          Component: (await import("./pages/jobs/jobs_page/Pending")).default,
        }),
      },
      {
        path: "jobs/applied",
        lazy: async () => ({
          Component: (await import("./pages/jobs/jobs_page/Applied")).default,
        }),
      },
      {
        path: "jobs/archived",
        lazy: async () => ({
          Component: (await import("./pages/jobs/jobs_page/Archived")).default,
        }),
      },
      {
        path: "jobs/reviewed",
        lazy: async () => ({
          Component: (await import("./pages/jobs/jobs_page/Reviewed")).default,
        }),
      },
      {
        path: "jobs/offered",
        lazy: async () => ({
          Component: (await import("./pages/jobs/jobs_page/Offered")).default,
        }),
      },
      {
        path: "jobs/ghosting",
        lazy: async () => ({
          Component: (await import("./pages/jobs/jobs_page/Ghosting")).default,
        }),
      },
      {
        path: "jobs/rejected",
        lazy: async () => ({
          Component: (await import("./pages/jobs/jobs_page/Rejected")).default,
        }),
      },
      {
        path: "jobs/interviewing",
        lazy: async () => ({
          Component: (await import("./pages/jobs/jobs_page/Interviewing"))
            .default,
        }),
      },
      {
        path: "jobs/technical-assessment",
        lazy: async () => ({
          Component: (
            await import("./pages/jobs/jobs_page/TechnicalAssessment")
          ).default,
        }),
      },
      {
        path: "/job/:id",
        lazy: async () => ({
          Component: (await import("./pages/details")).default,
        }),
      },
      {
        path: "settings",
        lazy: async () => ({
          Component: (await import("./pages/settings")).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import("./pages/settings/profile")).default,
            }),
          },
          {
            path: "account",
            lazy: async () => ({
              Component: (await import("./pages/settings/account")).default,
            }),
          },
          {
            path: "email-tracking",
            lazy: async () => ({
              Component: (await import("./pages/settings/email-tracking"))
                .default,
            }),
          },
        ],
      },
      {
        path: "ai-analysis",
        lazy: async () => ({
          Component: (await import("./pages/ai-analysis")).default,
        }),
      },

      {
        path: "documents",
        children: [
          {
            path: "resumes",
            children: [
              {
                index: true,
                lazy: async () => ({
                  Component: (await import("./pages/documents/resumes"))
                    .default,
                }),
              },
              {
                path: "create",
                lazy: async () => ({
                  Component: (await import("./pages/documents/resumes/create"))
                    .default,
                }),
              },
              {
                path: ":id/edit",
                lazy: async () => ({
                  Component: (await import("./pages/documents/resumes/edit"))
                    .default,
                }),
              },
            ],
          },
          {
            path: "cover-letters",
            children: [
              {
                index: true,
                lazy: async () => ({
                  Component: (await import("./pages/documents/cover-letters"))
                    .default,
                }),
              },
              {
                path: "create",
                lazy: async () => ({
                  Component: (
                    await import("./pages/documents/cover-letters/create")
                  ).default,
                }),
              },
              {
                path: ":id/edit",
                lazy: async () => ({
                  Component: (
                    await import("./pages/documents/cover-letters/edit")
                  ).default,
                }),
              },
            ],
          },
        ],
      },
      {
        path: "interview",
        children: [
          {
            path: "checklists",
            lazy: async () => ({
              Component: (await import("./pages/interview/checklists")).default,
            }),
          },
          {
            path: "qa-bank",
            lazy: async () => ({
              Component: (await import("./pages/interview/qa-bank")).default,
            }),
          },
        ],
      },
      {
        path: "dashboard",
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import("./pages/dashboard/")).default,
            }),
          },
          {
            path: "analyze",
            lazy: async () => ({
              Component: (await import("./pages/dashboard/analyze")).default,
            }),
          },
          {
            path: "reports",
            lazy: async () => ({
              Component: (await import("./pages/dashboard/reports")).default,
            }),
          },
        ],
      },
      // {
      //   path: "test",
      //   lazy: async () => ({
      //     Component: (await import("./pages/test")).default,
      //   }),
      // },
      {
        path: "help",
        lazy: async () => ({
          Component: (await import("./pages/help")).default,
        }),
      },
    ],
  },

  // Error routes
  { path: "/500", Component: GeneralError },
  { path: "/503", Component: MaintenanceError },
  { path: "/401", Component: UnauthorisedError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError },
]);

export default router;
