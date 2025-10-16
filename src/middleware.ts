import withAuth from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      console.log("token", token);

      if (req.nextUrl.pathname.startsWith("/Admin")) {
        return token?.role === "Admin";
      } else {
        return true;
      }
    },
  },
});

export const config = {
  matcher: ["/Admin(/.*)?"],
};
