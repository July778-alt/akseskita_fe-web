const IS_PROD = process.env.NODE_ENV === "production";

export const logger = {
  info: (message: string, ...args: any[]) => {
    if (!IS_PROD) console.log(`[INFO] ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    if (!IS_PROD) console.warn(`[WARN] ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ERROR] ${message}`, ...args);
    // Here you could integrate with Sentry or other error tracking
  },
  api: (method: string, url: string, status: number, data?: any) => {
    if (!IS_PROD) {
      const color = status >= 400 ? "text-red-500" : "text-green-500";
      console.log(
        `%c[API] ${method} %c${url} %c${status}`,
        "font-weight: bold",
        "color: gray",
        `font-weight: bold; ${color}`,
        data
      );
    }
  }
};
