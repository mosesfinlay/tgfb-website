const redirects = async () => {
  const internetExplorerRedirect = {
    destination: "/ie-incompatible.html",
    has: [
      {
        type: "header",
        key: "user-agent",
        value: "(.*Trident.*)" // all ie browsers
      }
    ],
    permanent: false,
    source: "/:path((?!ie-incompatible.html$).*)" // all pages except the incompatibility page
  };

  const postsToArticlesRedirect = {
    source: "/posts/:path*",
    destination: "/articles/:path*",
    permanent: true
  };

  const redirects = [internetExplorerRedirect, postsToArticlesRedirect];

  return redirects;
};

export default redirects;
