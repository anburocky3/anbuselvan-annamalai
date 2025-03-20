import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readingTime?: number;
  author?: string;
  tags?: string[];
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(POSTS_DIR);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const filePath = path.join(POSTS_DIR, file);
        const source = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(source);
        const slug = file.replace(/\.mdx$/, "");

        // Calculate reading time (rough estimate)
        const wordsPerMinute = 200;
        const wordCount = content.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);

        return {
          slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt || content.slice(0, 150) + "...",
          content,
          readingTime,
          author: data.author,
          tags: data.tags,
        };
      })
  );

  // Sort posts by date in descending order
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(source);

    // Calculate reading time
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || content.slice(0, 150) + "...",
      content,
      readingTime,
      author: data.author,
      tags: data.tags,
    };
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function getPostContent(slug: string) {
  // Return the raw post with unprocessed MDX content
  // Our CustomMDX component will handle the rendering with syntax highlighting
  return getPostBySlug(slug);
}
