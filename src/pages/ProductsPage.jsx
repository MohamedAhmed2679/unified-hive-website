import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductShowcase, { products } from '@/components/ProductShowcase';

const ProductsPage = () => (
  <>
    <Helmet>
      <title>Our Products | Unified Hive</title>
      <meta name="description" content="Applications built by Unified Hive: Zaylo personal finance, Skolza academy management, and the HALA bilingual e-commerce storefront." />
      <link rel="canonical" href="https://www.unifiedhive.com/products" />
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org', '@type': 'ItemList', name: 'Products built by Unified Hive',
        itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'WebApplication', name: p.name, url: p.url, applicationCategory: p.category, description: p.description, creator: { '@type': 'Organization', name: 'Unified Hive' } } })),
      })}</script>
    </Helmet>

    <section className="pt-32 pb-4 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold font-heading text-foreground leading-tight">Software we <span className="text-gradient">design, build and run</span></h1>
        <p className="mt-6 text-lg text-muted-foreground">Beyond Microsoft 365, our engineers ship full-stack web applications. Each product below is ours, from first sketch to production.</p>
      </div>
    </section>

    <ProductShowcase showAllLink={false} heading="Our products" />

    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FFD700] via-[#FFE34D] to-[#F0C800]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold font-heading text-[#050A14]">Have an app in mind?</h2>
          <p className="mt-2 text-[#050A14]/75">We build secure, bilingual web applications on modern cloud platforms</p>
        </div>
        <Button asChild className="bg-[#050A14] text-white hover:bg-[#121519] rounded-full px-8 py-6 text-base"><Link to="/book-demo">Talk to us</Link></Button>
      </div>
    </section>
  </>
);

export default ProductsPage;
