import fs from "fs/promises";
import path from "path";

interface Video {
  id: number;
  title: string;
  duration: string;
  description: string;
  tags: string[];
  thumbnailUrl: string;
  videoId: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  channelId: string;
  channelTitle: string;
  category: string;
  language: string;
  isLiveContent: boolean;
  isPrivate: boolean;
  isUnlisted: boolean;
  durationInSeconds: number;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
    maxres: string;
  };
  statistics: {
    views: number;
    likes: number;
    comments: number;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: boolean;
    licensedContent: boolean;
    projection: string;
  };
}

interface Course {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  thumbnail: string;
  videos: Video[];
  level: string;
  totalDuration: string;
  slug: string;
}

interface PlaylistVideoRenderer {
  title?: {
    runs?: Array<{
      text: string;
    }>;
  };
  lengthText?: {
    simpleText: string;
  };
  thumbnail?: {
    thumbnails: Array<{
      url: string;
      width: number;
      height: number;
    }>;
  };
  publishedTimeText?: {
    simpleText: string;
  };
  publishedAt?: string;
  publishedAtText?: {
    simpleText: string;
  };
  viewCountText?: {
    simpleText: string;
  };
  likeCountText?: {
    simpleText: string;
  };
  commentCountText?: {
    simpleText: string;
  };
  videoId?: string;
  description?: {
    runs?: Array<{
      text: string;
    }>;
  };
  descriptionSnippet?: {
    runs?: Array<{
      text: string;
    }>;
  };
  ownerText?: {
    runs?: Array<{
      text: string;
    }>;
  };
  channelId?: string;
  isLiveContent?: boolean;
  isPrivate?: boolean;
  isUnlisted?: boolean;
  category?: string;
  language?: string;
}

interface PlaylistItem {
  playlistVideoRenderer?: PlaylistVideoRenderer;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-")
    .trim();
}

async function fetchPlaylists(): Promise<Course[]> {
  try {
    // First, fetch the channel page to get playlist IDs
    const channelUrl = `https://www.youtube.com/@CyberDudeNetworks/playlists`;
    const channelResponse = await fetch(channelUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Cache-Control": "max-age=0",
      },
    });

    if (!channelResponse.ok) {
      throw new Error(`Failed to fetch channel: ${channelResponse.status}`);
    }

    const html = await channelResponse.text();

    // Extract playlist IDs using regex
    const playlistPattern = /playlist\?list=([a-zA-Z0-9_-]+)/g;
    const matches = Array.from(html.matchAll(playlistPattern))
      .map((match) => match[1])
      .filter(Boolean);

    console.log(`Found ${matches.length} raw playlist IDs`);

    // Remove duplicates while preserving order
    const uniqueMatches = [...new Set(matches)];
    console.log(`Found ${uniqueMatches.length} unique playlist IDs`);
    console.log(uniqueMatches);

    // ignore certain playlists
    const ignoredPlaylists = [
      "PL73Obo20O_7iqILcmqR2TBAS8plqVVqNW",
      "PL73Obo20O_7juPZJm9_jR4NBhfti--D3y",
      "PL73Obo20O_7heiX5wXQxgGdMZKISE-ZCP",
    ];
    const filteredMatches = uniqueMatches.filter(
      (id) => !ignoredPlaylists.includes(id)
    );

    // Fetch each playlist's details
    const playlistPromises = filteredMatches.map(async (playlistId) => {
      try {
        const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
        console.log(`Fetching playlist: ${playlistUrl}`);

        const playlistResponse = await fetch(playlistUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Cache-Control": "max-age=0",
          },
        });

        if (!playlistResponse.ok) {
          console.error(
            `Failed to fetch playlist ${playlistId}: ${playlistResponse.status}`
          );
          return null;
        }

        const playlistHtml = await playlistResponse.text();

        // Try to find the ytInitialData
        const dataMatch = playlistHtml.match(/var ytInitialData = ({.*?});/);
        if (!dataMatch) {
          console.error(`No ytInitialData found for playlist ${playlistId}`);
          return null;
        }

        try {
          const ytData = JSON.parse(dataMatch[1]);
          const playlistData =
            ytData?.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]
              ?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]
              ?.itemSectionRenderer?.contents?.[0]?.playlistVideoListRenderer
              ?.contents || [];

          // Extract title from meta tags for better reliability
          const titleMatch = playlistHtml.match(
            /<meta property="og:title" content="([^"]*)">/
          );
          const title = titleMatch
            ? titleMatch[1].replace(" - YouTube", "").trim()
            : "";

          if (!title) {
            console.error(`No title found for playlist ${playlistId}`);
            return null;
          }

          // Extract description from meta tags
          const descriptionMatch = playlistHtml.match(
            /<meta property="og:description" content="([^"]*)">/
          );
          const description = descriptionMatch
            ? descriptionMatch[1].trim()
            : "";

          // Process videos
          const videos = await Promise.all(
            playlistData
              .filter((item: PlaylistItem) => item.playlistVideoRenderer)
              .map(async (item: PlaylistItem, index: number) => {
                const videoData = item.playlistVideoRenderer;

                const videoTitle = videoData?.title?.runs?.[0]?.text || "";
                const lengthText = videoData?.lengthText?.simpleText || "0:00";
                const videoId = videoData?.videoId || "";

                // Extract publish date from video page
                let publishedAt = "";
                try {
                  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                  const videoResponse = await fetch(videoUrl, {
                    headers: {
                      "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                      Accept:
                        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                      "Accept-Language": "en-US,en;q=0.5",
                      "Accept-Encoding": "gzip, deflate, br",
                      Connection: "keep-alive",
                      "Upgrade-Insecure-Requests": "1",
                      "Sec-Fetch-Dest": "document",
                      "Sec-Fetch-Mode": "navigate",
                      "Sec-Fetch-Site": "none",
                      "Sec-Fetch-User": "?1",
                      "Cache-Control": "max-age=0",
                    },
                  });

                  if (videoResponse.ok) {
                    const videoHtml = await videoResponse.text();
                    // Try to find the date in the ytInitialData
                    const dataMatch = videoHtml.match(
                      /var ytInitialData = ({.*?});/
                    );
                    if (dataMatch) {
                      try {
                        const ytData = JSON.parse(dataMatch[1]);
                        const dateText =
                          ytData?.contents?.twoColumnWatchNextResults?.results
                            ?.results?.contents?.[0]?.videoPrimaryInfoRenderer
                            ?.dateText?.simpleText || "";

                        // Convert relative date to absolute date
                        if (dateText) {
                          const now = new Date();
                          const publishDate = new Date();

                          if (dateText.includes("year")) {
                            const years = parseInt(dateText);
                            publishDate.setFullYear(now.getFullYear() - years);
                          } else if (dateText.includes("month")) {
                            const months = parseInt(dateText);
                            publishDate.setMonth(now.getMonth() - months);
                          } else if (dateText.includes("week")) {
                            const weeks = parseInt(dateText);
                            publishDate.setDate(now.getDate() - weeks * 7);
                          } else if (dateText.includes("day")) {
                            const days = parseInt(dateText);
                            publishDate.setDate(now.getDate() - days);
                          } else if (dateText.includes("hour")) {
                            const hours = parseInt(dateText);
                            publishDate.setHours(now.getHours() - hours);
                          } else if (dateText.includes("minute")) {
                            const minutes = parseInt(dateText);
                            publishDate.setMinutes(now.getMinutes() - minutes);
                          } else if (dateText.includes("second")) {
                            const seconds = parseInt(dateText);
                            publishDate.setSeconds(now.getSeconds() - seconds);
                          }

                          // Format to ISO 8601 with timezone offset
                          const tzOffset = publishDate.getTimezoneOffset();
                          const tzHours = Math.abs(Math.floor(tzOffset / 60));
                          const tzMinutes = Math.abs(tzOffset % 60);
                          const tzSign = tzOffset <= 0 ? "+" : "-";

                          publishedAt = publishDate
                            .toISOString()
                            .replace(
                              "Z",
                              `${tzSign}${tzHours
                                .toString()
                                .padStart(2, "0")}:${tzMinutes
                                .toString()
                                .padStart(2, "0")}`
                            );
                        }
                      } catch (e) {
                        console.error(
                          `Error parsing ytInitialData for video ${videoId}:`,
                          e
                        );
                      }
                    }

                    // Fallback to meta tag if ytInitialData doesn't have the date
                    if (!publishedAt) {
                      const dateMatch = videoHtml.match(
                        /<meta itemprop="datePublished" content="([^"]*)">/
                      );
                      if (dateMatch) {
                        const date = new Date(dateMatch[1]);
                        const tzOffset = date.getTimezoneOffset();
                        const tzHours = Math.abs(Math.floor(tzOffset / 60));
                        const tzMinutes = Math.abs(tzOffset % 60);
                        const tzSign = tzOffset <= 0 ? "+" : "-";

                        publishedAt = date
                          .toISOString()
                          .replace(
                            "Z",
                            `${tzSign}${tzHours
                              .toString()
                              .padStart(2, "0")}:${tzMinutes
                              .toString()
                              .padStart(2, "0")}`
                          );
                      }
                    }
                  }
                } catch (error) {
                  console.error(
                    `Error fetching publish date for video ${videoId}:`,
                    error
                  );
                }

                // Fallback to relative time if absolute date not found
                if (!publishedAt) {
                  const relativeDate =
                    videoData?.publishedTimeText?.simpleText || "";
                  if (relativeDate) {
                    const now = new Date();
                    const publishDate = new Date();

                    if (relativeDate.includes("year")) {
                      const years = parseInt(relativeDate);
                      publishDate.setFullYear(now.getFullYear() - years);
                    } else if (relativeDate.includes("month")) {
                      const months = parseInt(relativeDate);
                      publishDate.setMonth(now.getMonth() - months);
                    } else if (relativeDate.includes("week")) {
                      const weeks = parseInt(relativeDate);
                      publishDate.setDate(now.getDate() - weeks * 7);
                    } else if (relativeDate.includes("day")) {
                      const days = parseInt(relativeDate);
                      publishDate.setDate(now.getDate() - days);
                    } else if (relativeDate.includes("hour")) {
                      const hours = parseInt(relativeDate);
                      publishDate.setHours(now.getHours() - hours);
                    } else if (relativeDate.includes("minute")) {
                      const minutes = parseInt(relativeDate);
                      publishDate.setMinutes(now.getMinutes() - minutes);
                    } else if (relativeDate.includes("second")) {
                      const seconds = parseInt(relativeDate);
                      publishDate.setSeconds(now.getSeconds() - seconds);
                    }

                    const tzOffset = publishDate.getTimezoneOffset();
                    const tzHours = Math.abs(Math.floor(tzOffset / 60));
                    const tzMinutes = Math.abs(tzOffset % 60);
                    const tzSign = tzOffset <= 0 ? "+" : "-";

                    publishedAt = publishDate
                      .toISOString()
                      .replace(
                        "Z",
                        `${tzSign}${tzHours
                          .toString()
                          .padStart(2, "0")}:${tzMinutes
                          .toString()
                          .padStart(2, "0")}`
                      );
                  }
                }

                const viewCount = videoData?.viewCountText?.simpleText || "0";
                const likeCount = videoData?.likeCountText?.simpleText || "0";
                const channelTitle =
                  videoData?.ownerText?.runs?.[0]?.text || "";
                const channelId = videoData?.channelId || "";
                const isLiveContent = videoData?.isLiveContent || false;
                const isPrivate = videoData?.isPrivate || false;
                const isUnlisted = videoData?.isUnlisted || false;
                const category = videoData?.category || "Education";
                const language = videoData?.language || "en";

                // Get initial description from snippet
                let description =
                  videoData?.descriptionSnippet?.runs
                    ?.map((run: { text: string }) => run.text)
                    .join("") || "";

                // Try to fetch full description from video page
                try {
                  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                  const videoResponse = await fetch(videoUrl, {
                    headers: {
                      "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                      Accept:
                        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                      "Accept-Language": "en-US,en;q=0.5",
                      "Accept-Encoding": "gzip, deflate, br",
                      Connection: "keep-alive",
                      "Upgrade-Insecure-Requests": "1",
                      "Sec-Fetch-Dest": "document",
                      "Sec-Fetch-Mode": "navigate",
                      "Sec-Fetch-Site": "none",
                      "Sec-Fetch-User": "?1",
                      "Cache-Control": "max-age=0",
                    },
                  });

                  if (videoResponse.ok) {
                    const videoHtml = await videoResponse.text();
                    const descriptionMatch = videoHtml.match(
                      /<meta property="og:description" content="([^"]*)">/
                    );
                    if (descriptionMatch) {
                      description = descriptionMatch[1].trim();
                    }
                  }
                } catch (error) {
                  console.error(
                    `Error fetching description for video ${videoId}:`,
                    error
                  );
                  // Keep the snippet description if fetch fails
                }

                // Calculate duration in seconds
                const [mins = 0, secs = 0] = lengthText.split(":").map(Number);
                const durationInSeconds = mins * 60 + secs;

                // Get all thumbnail sizes
                const thumbnails = {
                  default: `https://i.ytimg.com/vi/${videoId}/default.jpg`,
                  medium: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
                  high: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                  maxres: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
                };

                // Parse statistics
                const statistics = {
                  views: parseInt(
                    videoData?.viewCountText?.simpleText?.replace(
                      /[^0-9]/g,
                      ""
                    ) || "0"
                  ),
                  likes: parseInt(
                    videoData?.likeCountText?.simpleText?.replace(
                      /[^0-9]/g,
                      ""
                    ) || "0"
                  ),
                  comments: parseInt(
                    videoData?.commentCountText?.simpleText?.replace(
                      /[^0-9]/g,
                      ""
                    ) || "0"
                  ),
                };

                // Content details
                const contentDetails = {
                  duration: lengthText,
                  dimension: "2D",
                  definition: "HD",
                  caption: true, // Most educational content has captions
                  licensedContent: true,
                  projection: "rectangular",
                };

                // Extract tags from title and description
                const tags = [
                  ...new Set([
                    ...videoTitle.toLowerCase().split(/[\s-]+/),
                    ...description.toLowerCase().split(/[\s-]+/),
                    category.toLowerCase(),
                    ...(language !== "en" ? [language] : []),
                  ]),
                ]
                  .filter((tag) => tag.length > 3)
                  .filter(
                    (tag) =>
                      ![
                        "this",
                        "that",
                        "with",
                        "from",
                        "have",
                        "will",
                      ].includes(tag)
                  )
                  .slice(0, 10);

                return {
                  id: index + 1,
                  title: videoTitle,
                  duration: lengthText,
                  description,
                  tags,
                  thumbnailUrl: thumbnails.maxres,
                  videoId,
                  publishedAt,
                  viewCount,
                  likeCount,
                  commentCount: "0",
                  channelId,
                  channelTitle,
                  category,
                  language,
                  isLiveContent,
                  isPrivate,
                  isUnlisted,
                  durationInSeconds,
                  thumbnails,
                  statistics,
                  contentDetails,
                };
              })
          );

          if (videos.length === 0) {
            console.error(
              `No videos found in playlist ${playlistId} (${title})`
            );
            return null;
          }

          // Calculate total duration
          const totalSeconds = videos.reduce((acc: number, video: Video) => {
            const [hours = 0, mins = 0, secs = 0] = video.duration
              .split(":")
              .map(Number);
            return acc + hours * 3600 + mins * 60 + secs;
          }, 0);

          // Convert total seconds to a concise format
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);

          // Format the duration string in a concise way
          let totalDuration = "";
          if (hours > 0) {
            totalDuration += `${hours}h `;
          }
          if (minutes > 0) {
            totalDuration += `${minutes}min`;
          }

          // Trim any trailing spaces
          totalDuration = totalDuration.trim();

          // Get thumbnail from meta tags
          const thumbnailMatch = playlistHtml.match(
            /<meta property="og:image" content="([^"]*)">/
          );
          const thumbnail = thumbnailMatch
            ? thumbnailMatch[1]
            : `https://i.ytimg.com/vi/${videos[0]?.id}/maxresdefault.jpg`;

          // Determine level based on title
          let level = "Intermediate";
          const titleLower = title.toLowerCase();
          if (titleLower.includes("beginner") || titleLower.includes("basic")) {
            level = "Beginner";
          } else if (titleLower.includes("advanced")) {
            level = "Advanced";
          }

          // Generate slug from title
          const slug = generateSlug(title);

          console.log(
            `Successfully processed playlist: ${playlistId} - ${title} (${videos.length} videos, ${totalDuration})`
          );

          return {
            id: playlistId,
            title,
            description,
            author: {
              name: "Anbuselvan Annamalai",
              avatar: "/images/anbuselvan-annamalai.png",
            },
            thumbnail,
            videos,
            level,
            totalDuration,
            slug,
          };
        } catch (parseError) {
          console.error(
            `Error parsing playlist data for ${playlistId}:`,
            parseError
          );
          return null;
        }
      } catch (error) {
        console.error(`Error processing playlist ${playlistId}:`, error);
        return null;
      }
    });

    // Wait for all playlists to be processed
    const playlists = (await Promise.all(playlistPromises)).filter(
      (playlist): playlist is Course => {
        if (!playlist) return false;
        return Boolean(
          playlist.id &&
            playlist.title &&
            Array.isArray(playlist.videos) &&
            playlist.videos.length > 0
        );
      }
    );

    console.log(`Successfully processed ${playlists.length} playlists`);
    return playlists;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return [];
  }
}

async function main() {
  console.log("Starting playlist fetch...");
  const playlists = await fetchPlaylists();

  if (playlists.length === 0) {
    console.error("No playlists found or all fetches failed");
    process.exit(1);
  }

  // Create the data directory if it doesn't exist
  const dataDir = path.join(process.cwd(), "src", "data");
  await fs.mkdir(dataDir, { recursive: true });

  // Save the playlists to a file
  const filePath = path.join(dataDir, "playlists.ts");
  const fileContent = `// Auto-generated file - Do not edit manually
// Last updated: ${new Date().toISOString()}

export interface Video {
  id: number;
  title: string;
  duration: string;
  description: string;
  tags: string[];
  thumbnailUrl: string;
  videoId: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  channelId: string;
  channelTitle: string;
  category: string;
  language: string;
  isLiveContent: boolean;
  isPrivate: boolean;
  isUnlisted: boolean;
  durationInSeconds: number;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
    maxres: string;
  };
  statistics: { 
    views: number;
    likes: number;
    comments: number;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: boolean;
    licensedContent: boolean;
    projection: string;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  thumbnail: string;
  videos: Video[];
  level: string;
  totalDuration: string;
  slug: string;
}

export const playlists: Course[] = ${JSON.stringify(playlists, null, 2)};
`;

  await fs.writeFile(filePath, fileContent, "utf-8");
  console.log(
    `Successfully saved ${playlists.length} playlists to ${filePath}`
  );
}

main().catch((error) => {
  console.error("Script failed:", error);
  process.exit(1);
});
