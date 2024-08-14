import {
  authMiddleware,
  redirectToSignIn,
} from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req, evt) {
    if (auth.userId && auth.isPublicRoute) {
      let path = "select-org";
      if (auth.orgId) {
        path = `organization/${auth.orgId}`;
      }
      const orgUrl = new URL(path, req.url);
      return NextResponse.redirect(orgUrl);
    }
    if (!auth.userId && !auth.isPublicRoute) {
      // return RedirectToSignIn({redirectUrl:req.url})
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if(auth.userId && !auth.orgId && req.nextUrl.pathname!="/select-org"){
      const selectOrg = new URL("/select-org",req.url);
      return NextResponse.redirect(selectOrg)
    }
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
