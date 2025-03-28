const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res, query }) => {
  const baseUrl = "https://rental.cozyhomes.my"; // Replace with your domain
  const currentDate = new Date().toISOString().split("T")[0];

  // Generate XML sitemap with only homepage
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${baseUrl}/</loc>
                <lastmod>${currentDate}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
            </url>
        </urlset>`;

  // Set the response headers and send the XML
  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default Sitemap;
