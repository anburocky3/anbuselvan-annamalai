import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostContent } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { baseUrl } from "../../../../scripts/generate-sitemap";
import { CustomMDX } from "@/components/mdx/custom-mdx";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostContent(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const title = post.title;
  const description = post.excerpt;
  const publishedTime = post.date;
  // Assuming image isn't available in the current post structure
  const ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title: `${title} | Anbuselvan Annamalai's Blog`,
    description,
    alternates: {
      canonical: `https://anbuselvan-annamalai.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${title} | Anbuselvan Annamalai's Blog`,
      description,
      url: `https://anbuselvan-annamalai.com/blog/${post.slug}`,
      siteName: "Anbuselvan Annamalai",
      locale: "en_US",
      type: "article",
      publishedTime,
      authors: [post.author || "Anbuselvan Annamalai"],
      tags: post.tags,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostContent(slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-36">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            name: post.title,
            description: post.excerpt,
            datePublished: new Date(post.date).toISOString(),
            dateModified: new Date(post.date).toISOString(),
            author: {
              "@type": "Person",
              name: post.author || "Anbuselvan Annamalai",
              url: `${baseUrl}`,
            },
            publisher: {
              "@type": "Person",
              name: "Anbuselvan Annamalai",
              url: baseUrl,
              logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/og-image.jpg`,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${baseUrl}/blog/${post.slug}`,
            },
            keywords: post.tags?.join(", ") || "",
            articleBody:
              post.content
                .replace(/\n/g, " ")
                .replace(/#/g, "")
                .substring(0, 500) + "...",
            wordCount: post.content.split(/\s+/).length,
            timeRequired: `PT${post.readingTime || 5}M`,
            url: `${baseUrl}/blog/${post.slug}`,
            image: {
              "@type": "ImageObject",
              url: `${baseUrl}/og?title=${encodeURIComponent(post.title)}`,
              width: 1200,
              height: 630,
            },
          }),
        }}
      />

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
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `${baseUrl}/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />
      <article className="prose prose-invert prose-purple max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.readingTime && <span>· {post.readingTime} min read</span>}
            {post.author && (
              <span>
                · By <Link href={`/`}>{post.author}</Link>
              </span>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className="prose-headings:text-white prose-a:text-purple-400 prose-strong:text-white prose-code:text-purple-300">
          <div className="[&_pre]:bg-slate-800 [&_pre]:p-4 [&_pre]:rounded-lg [&_code]:text-sm [&_pre]:overflow-x-auto [&_pre]:my-6">
            <CustomMDX source={post.content} />
          </div>
        </div>
      </article>
    </div>
  );
}
