

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/auth";
const PUBLIC_ROUTES = ['/']
const PUBLIC_APIS = ['/api/auth']

export async function proxy(req: NextRequest) {
  //this gives us exact path of baasis in our current activity
  const { pathname } = req.nextUrl
  if (
    pathname.startsWith("/_next") ||

    pathname.startsWith("/favicon.ico") ||
    /\.(png|jpg|jpeg|gif|svg|ico)$/i.test(pathname)
  ) {
    return NextResponse.next()
  }
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }
  // if (PUBLIC_APIS.includes(pathname)) {
  //   return NextResponse.next()
  // }

  if (pathname.startsWith("/api/auth")) {
  return NextResponse.next()
}

  console.log("RU", pathname);

  const session = await auth()
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url))

  }
  ///here i will find the role of the user
  const role = session.user?.role

  if (pathname.startsWith('/admin')) {
    if (role != "admin") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  if (pathname.startsWith("/partner")) {
    if(pathname.startsWith("/partner/onboarding")){
       return NextResponse.next()
    }
    if (role != "partner") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  if (pathname.startsWith("api")) {
    if (!session.user) {
      return Response.json({
        message: "unauthorized User"
      }, {
        status: 401


      })
    }
  }
  return NextResponse.next()

}

//here our this proxy will run for all the routes but we want to run it for only few routes 
//so here this way we tell the routes
//we write config for prevent this

export const config = {
  //here we will tell for which routes you will run ,apart from static files run for every othe route
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
}