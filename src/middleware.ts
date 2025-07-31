// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the routes that should be accessible to everyone, even signed-out users.
const isPublicRoute = createRouteMatcher([
  "/", // The homepage is public
  "/sign-in(.*)", // The sign-in page and all of its sub-pages
  "/sign-up(.*)", // The sign-up page and all of its sub-pages
  "/api/webhooks/clerk", // The webhook receiver is public
]);

export default clerkMiddleware((auth, request) => {
  // If the request is not for a public route, protect it.
  // This will require the user to be signed in.
  console.log("⚡ Middleware executing on route:", request.nextUrl.pathname);
  if (!isPublicRoute(request)) {
    auth();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
