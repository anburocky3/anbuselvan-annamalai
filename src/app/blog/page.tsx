import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { FaMedium } from "react-icons/fa6";
import { baseUrl } from "../../../scripts/generate-sitemap";

export const metadata: Metadata = {
  title: "Blog | Anbuselvan Annamalai",
  description:
    "Insights, tutorials, and thoughts on technology, entrepreneurship, and web development.",
  alternates: {
    canonical: "https://anbuselvan-annamalai.com/blog",
    types: {
      "application/rss+xml": "https://anbuselvan-annamalai.com/rss.xml",
    },
  },
  openGraph: {
    title: "Blog | Anbuselvan Annamalai",
    description:
      "Insights, tutorials, and thoughts on technology, entrepreneurship, and web development.",
    url: "https://anbuselvan-annamalai.com/blog",
    siteName: "Anbuselvan Annamalai",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-28">
      {/* Blog page structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: posts.map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${baseUrl}/blog/${post.slug}`,
                name: post.title,
                description: post.excerpt,
              })),
            },
            name: "Anbuselvan Annamalai's Blog",
            description:
              "Insights, tutorials, and thoughts on technology, entrepreneurship, and web development.",
            url: `${baseUrl}/blog`,
            author: {
              "@type": "Person",
              name: "Anbuselvan Annamalai",
              url: baseUrl,
            },
            publisher: {
              "@type": "Person",
              name: "Anbuselvan Annamalai",
              url: baseUrl,
            },
          }),
        }}
      />

      {/* BreadcrumbList for blog page */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: baseUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${baseUrl}/blog`,
              },
            ],
          }),
        }}
      />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl text-white ">
          Anbuselvan Annamalai&apos;s Blog
        </h1>
        <a
          href="https://anbuselvan-annamalai.medium.com"
          className="bg-green-500 hover:bg-green-600 border border-green-800 text-s px-4 py-2 rounded-md flex items-center gap-x-3"
          target="_blank"
        >
          <FaMedium />
          Medium blog
        </a>
      </div>
      <div className="grid gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold text-purple-400 mb-2 hover:text-purple-300">
                {post.title}
              </h2>
            </Link>
            <div className="flex items-center gap-4 text-gray-400 mb-4">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.readingTime && <span>· {post.readingTime} min read</span>}
            </div>
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-2"
            >
              Read more
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
