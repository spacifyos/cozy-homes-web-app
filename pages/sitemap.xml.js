import { get } from "lodash";

const Sitemap = () => {
  // This component does not need to render anything as it is used for server-side responses
  return null;
};

const fetchUrls = async () => {
  return [{ loc: "https://www.spacify.asia/", lastmod: "2024-12-23" }];
};

export const getServerSideProps = async ({ res }) => {
  const urls = await fetchUrls();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url.loc}</loc>
      <lastmod>${url.lastmod}</lastmod>
    </url>
  `,
    )
    .join("")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {}, // No props required for this page
  };
};

// export const getServerSideProps = async ({ res, query }) => {
//   const { slug } = query;
//
//   try {
//     const response = await fetch(`${process.env.API_DOMAIN}/sitemap/index`, {
//       method: "GET",
//     });
//
//     if (response.status !== 200) {
//       const data = ``; // Assuming the response is JSON
//       const { messages } = data;
//
//       res.statusCode = response.status;
//       res.end(get(messages, ["0", "text"], "Not Found"));
//       return { props: {} }; // Returning empty props as the response ends here
//     }
//
//     const data = await response.json(); // Assuming the response is plain text (XML)
//
//     res.setHeader("Content-Type", "application/xml");
//     res.write(`${data}`);
//     res.end();
//   } catch (error) {
//     res.statusCode = 500;
//     res.end("Internal Server Error");
//   }
//
//   return { props: {} }; // Returning empty props as the response ends here
// };

export default Sitemap;
