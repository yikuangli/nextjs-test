import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = true;//!!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/ride');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return true; // Redirect unauthenticated users to login page
      } 
      // else if (isLoggedIn) {
      //   return Response.redirect(new URL('/ride', nextUrl));
      // }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;