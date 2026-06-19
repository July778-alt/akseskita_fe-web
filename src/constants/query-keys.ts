export const queryKeys = {
  reports: {
    all: ["reports"] as const,
    lists: () => [...queryKeys.reports.all, "list"] as const,
    list: (params: any) => [...queryKeys.reports.lists(), { params }] as const,
    details: () => [...queryKeys.reports.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.reports.details(), id] as const,
    my: () => [...queryKeys.reports.all, "my"] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
  users: {
    all: ["users"] as const,
    list: (params: any) => [...queryKeys.users.all, "list", { params }] as const,
    me: ["users", "me"] as const,
  },
  dashboard: {
    stats: ["dashboard", "stats"] as const,
    analytics: ["dashboard", "analytics"] as const,
  },
  comments: {
    all: ["comments"] as const,
    byReport: (reportId: string) => [...queryKeys.comments.all, "report", reportId] as const,
  },
  notifications: {
    all: ["notifications"] as const,
    my: () => [...queryKeys.notifications.all, "my"] as const,
  },
} as const;
