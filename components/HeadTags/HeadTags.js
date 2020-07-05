import Head from 'next/head';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

function head({title, ogTitle, description, path, pathImg  }) {
    return (<Head>
        <title>{title} | {APP_NAME}</title>

        <meta name="description" content={description} />

        <link rel="canonical" href={`${DOMAIN}${path}`} />

        <meta property="og:title" content={`${ogTitle} | ${APP_NAME}`} />

        <meta
            property="og:description"
            content={`${description} | ${APP_NAME}`}  />

        <meta property="og:type" content="website" />

        <meta property="og:url" content={`${DOMAIN}${path}`} />

        <meta property="og:site_name" content={`${APP_NAME}`} />

        <meta property="og:image" content={`${API}${pathImg}`} />

        <meta property="og:image:secure_url" content={`${API}${pathImg}`} />

        <meta property="og:image:type" content="image/jpg" />

        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
    )
}

export default head;