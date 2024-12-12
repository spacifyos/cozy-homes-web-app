import { get } from "lodash";

const Sitemap = () => {
    // This component does not need to render anything as it is used for server-side responses
    return null;
};

export const getServerSideProps = async ({ res, query }) => {
    const { slug } = query;

    try {
        const response = await fetch(`${process.env.API_DOMAIN}/sitemap/listing-head`, {
            method: "GET",
        });

        if (response.status !== 200) {
            const data = ``; // Assuming the response is JSON
            const { messages } = data;

            res.statusCode = response.status;
            res.end(get(messages, ["0", "text"], "Not Found"));
            return { props: {} }; // Returning empty props as the response ends here
        }

        const data = await response.json(); // Assuming the response is plain text (XML)

        res.setHeader("Content-Type", "text/xml");
        res.write(data);
        res.end();
    } catch (error) {
        res.statusCode = 500;
        res.end("Internal Server Error");
    }

    return { props: {} }; // Returning empty props as the response ends here
};

export default Sitemap;
