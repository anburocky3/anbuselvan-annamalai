import { getAllPosts } from "@/lib/blog";
import RSS from "rss";
import { playlists } from "@/data/playlists";

export async function generateRssFeed() {
  const feed = new RSS({
    title: "Anbuselvan Annamalai's Blog & Tutorials",
    site_url: "https://anbuselvan-annamalai.com",
    feed_url: "https://anbuselvan-annamalai.com/rss.xml",
    language: "en",
    description:
      "Insights, tutorials, and thoughts on React, React Native, and web development",
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    pubDate: new Date(),
  });

  // Add tutorials path
  feed.item({
    title: "Tutorials Collection",
    description: "Browse all tutorials and courses by Anbuselvan Annamalai",
    url: "https://anbuselvan-annamalai.com/tutorials",
    date: new Date(),
    categories: ["Tutorials", "Courses"],
    author: "Anbuselvan Annamalai",
    guid: "tutorials-collection",
    custom_elements: [
      {
        "content:encoded":
          "A comprehensive collection of tutorials and courses covering various aspects of web development, React, React Native, and more.",
      },
      { "dc:creator": "Anbuselvan Annamalai" },
      { "dc:date": new Date().toISOString() },
      { total_courses: playlists.length },
      {
        total_videos: playlists.reduce(
          (acc, playlist) => acc + playlist.videos.length,
          0
        ),
      },
    ],
  });

  // Add blog posts
  const posts = await getAllPosts();
  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://anbuselvan-annamalai.com/blog/${post.slug}`,
      date: post.date,
      categories: post.tags,
      author: "Anbuselvan Annamalai",
      guid: `blog-${post.slug}`,
      custom_elements: [
        { "content:encoded": post.content },
        { "dc:creator": "Anbuselvan Annamalai" },
        { "dc:date": new Date(post.date).toISOString() },
      ],
    });
  });

  // Add tutorial pages
  playlists.forEach((playlist) => {
    feed.item({
      title: playlist.title,
      description: playlist.description,
      url: `https://anbuselvan-annamalai.com/tutorials/${playlist.slug}`,
      date: new Date(),
      categories: ["Tutorial", playlist.level],
      author: "Anbuselvan Annamalai",
      guid: `tutorial-${playlist.slug}`,
      custom_elements: [
        { "content:encoded": playlist.description },
        { "dc:creator": "Anbuselvan Annamalai" },
        { "dc:date": new Date().toISOString() },
        { video_count: playlist.videos.length },
        { total_duration: playlist.totalDuration },
      ],
    });
  });

  return feed.xml({ indent: true });
}
