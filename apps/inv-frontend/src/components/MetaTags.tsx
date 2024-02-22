import { Helmet } from 'react-helmet-async';

type MetaTagsProps = {
  title: string;
  description: string;
  keywords: string;
  pageUrl: string;
};

const MetaTags = ({ title, description, keywords, pageUrl }: MetaTagsProps) => {
  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href={'/images/tlogo.svg'} />
      <link rel="canonical" href={`${pageUrl}`} />
      <title>{title}</title>
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={'/images/tlogo.svg'} />
      <meta name="og:url" content={`${pageUrl}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={'/images/tlogo.svg'} />
    </Helmet>
  );
};

MetaTags.defaultProps = {
  title: 'PantryHub - Inventory Management System',
  keywords:
    'inventory management, pantry management, stock management, warehouse management, inventory tracking, inventory system, pantryhub',
  description:
    'PantryHub is an inventory management system that helps you efficiently manage your inventory, track stock levels, and streamline your operations.',
    pageUrl: window.location.href,
};


export default MetaTags;
