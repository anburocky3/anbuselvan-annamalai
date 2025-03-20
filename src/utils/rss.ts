import { getAllPosts } from "@/lib/blog";
import RSS from "rss";

export async function generateRssFeed() {
  const feed = new RSS({
    title: "Anbuselvan Annamalai's Blog",
    site_url: "https://anbuselvan-annamalai.com",
    feed_url: "https://anbuselvan-annamalai.com/rss.xml",
    language: "en",
    description:
      "Insights and tutorials on React, React Native, and web development",
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    pubDate: new Date(),
  });

  const posts = await getAllPosts();

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://anbuselvan-annamalai.com/blog/${post.slug}`,
      date: post.date,
      categories: post.tags,
      author: "Anbuselvan Annamalai",
      guid: post.slug,
      custom_elements: [
        { "content:encoded": post.content },
        { "dc:creator": "Anbuselvan Annamalai" },
        { "dc:date": new Date(post.date).toISOString() },
      ],
    });
  });

  return feed.xml({ indent: true });
}
