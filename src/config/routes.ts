export const routes = {
  home: "/",
  reviews: "/reviews",
  youtube: "/reviews/youtube",
  events: "/reviews/events",
  reviewsAbout: "/reviews/about",
} as const;

// Type-safe route helper function
export function route(path: keyof typeof routes): string {
  return routes[path];
}

// For routes with parameters
export function routeWithParams(
  path: keyof typeof routes,
  params: Record<string, string | number>
): string {
  let url = routes[path] as string;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, String(value));
  });
  return url;
}
