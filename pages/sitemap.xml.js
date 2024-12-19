import { get } from "lodash";

const Sitemap = () => {
  // This component does not need to render anything as it is used for server-side responses
  return null;
};

export async function getServerSideProps({ res }) {
  // Generate the XML content for the sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.spacify.asia/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
        <lastmod>2024-12-19T09:26:27+08:00</lastmod>
      </url>
    </urlset>
  `;

  // Set response headers
  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();

  // No need to render any content
  return { props: {} };
}

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
//     res.setHeader("Content-Type", "text/xml");
//     res.write(data);
//     res.end();
//   } catch (error) {
//     res.statusCode = 500;
//     res.end("Internal Server Error");
//   }
//
//   return { props: {} }; // Returning empty props as the response ends here
// };

export default Sitemap;
