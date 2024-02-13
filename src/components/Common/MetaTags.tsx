import { FC } from 'react';
import Head from 'next/head';
import { PRED_APP_DESCRIPTION, PRED_APP_NAME } from 'packages/constants';
import { useRouter } from 'next/router';

type Props = {
  title?: string;
};

const MetaTags: FC<Props> = (props) => {
  const router = useRouter();
  const { title } = props;

  const meta = {
    title: title ? `${title} • ${PRED_APP_NAME}` : PRED_APP_NAME,
    description: PRED_APP_DESCRIPTION,
    // image: OG_IMAGE,
    type: 'website',
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, maximum-scale=5, viewport-fit=cover"
      />
      <link rel="canonical" href={`https://predictmarket.xyz${router.asPath}`} />
      <meta property="og:url" content={`https://predictmarket.xyz${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={PRED_APP_NAME} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      {/* <meta property="og:image" content={meta.image} /> */}
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />
      {/* <meta name="twitter:card" content="summary_large_image" /> */}
      {/* <meta property="twitter:image:width" content="400" /> */}
      {/* <meta property="twitter:image:height" content="400" /> */}
      {/* <meta name="twitter:site" content="@predictmarketxyz" /> */}
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {/* <meta property="twitter:image" content={meta.image} /> */}
    </Head>
  );
};

export default MetaTags;
