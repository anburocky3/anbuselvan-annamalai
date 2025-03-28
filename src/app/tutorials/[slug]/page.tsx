import { playlists } from "@/data/playlists";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Clock, Play, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Giscus from "@/components/comments/Giscus";
import { route } from "@/config/routes";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const course = playlists.find((p) => p.slug === slug);

  if (!course) {
    return {
      title: "Course Not Found",
      description: "The requested course could not be found.",
    };
  }

  const title = course.title;
  const description = course.description;
  const ogImage = course.thumbnail;

  return {
    title: `${title} | CyberDude Networks Tutorials`,
    description,
    alternates: {
      canonical: `https://anbuselvan-annamalai.com/tutorials/${course.slug}`,
    },
    openGraph: {
      title: `${title} | CyberDude Networks Tutorials`,
      description,
      url: `https://anbuselvan-annamalai.com/tutorials/${course.slug}`,
      siteName: "Anbuselvan Annamalai",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1280,
          height: 720,
          alt: title,
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

export default async function CoursePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const course = playlists.find((p) => p.slug === params.slug);

  const cleanVideoTitle = (title: string) => {
    return title.replace(/^#\d+\s*-\s*/, "").trim();
  };

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 mt-16">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.title,
            description: course.description,
            provider: {
              "@type": "Organization",
              name: "CyberDude Networks Pvt. Ltd.",
              sameAs: "https://www.youtube.com/@CyberDudeNetworks",
            },
            instructor: {
              "@type": "Person",
              name: course.author.name,
              image: course.author.avatar,
            },
            offers: {
              "@type": "Offer",
              category: "Free",
              price: "0",
              priceCurrency: "INR",
            },
            courseMode: "Online",
            courseWorkload: `${course.videos.length} videos of lectures`,
            educationalLevel: course.level,
            timeRequired: `PT${course.totalDuration.replace(/[^0-9]/g, "")}M`,
            numberOfItems: course.videos.length,
            hasCourseInstance: course.videos.map((video) => ({
              "@type": "CourseInstance",
              name: video.title,
              description: video.description,
              courseMode: "Online",
              courseWorkload: `PT${course.videos.reduce(
                (acc, video) =>
                  acc + parseInt(video.duration.replace(/[^0-9]/g, "")),
                0
              )}M`,
              duration: `PT${video.duration.replace(/[^0-9]/g, "")}M`,
              video: {
                "@type": "VideoObject",
                name: video.title,
                description: video.description,
                thumbnailUrl: video.thumbnailUrl,
                uploadDate: video.publishedAt,
                duration: `PT${video.duration.replace(/[^0-9]/g, "")}M`,
                embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
                contentUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
                interactionStatistic: {
                  "@type": "InteractionCounter",
                  interactionType: "https://schema.org/WatchAction",
                  userInteractionCount: video.statistics.views,
                },
              },
            })),
          }),
        }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://anbuselvan-annamalai.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tutorials",
                item: "https://anbuselvan-annamalai.com/tutorials",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: course.title,
                item: `https://anbuselvan-annamalai.com/tutorials/${params.slug}`,
              },
            ],
          }),
        }}
      />
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
        <Image
          src={course.videos[0]?.thumbnails.maxres || course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <Link
          href={route("tutorials")}
          className="text-white relative top-0 left-5 right-0 p-4 z-10"
          title="Back to Tutorials"
        >
          <ArrowLeft className="h-8 w-8" />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Badge
              variant="secondary"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {course.level}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {course.videos.length} videos
            </Badge>
          </div>

          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={course.author.avatar}
                  alt={course.author.name}
                />
                <AvatarFallback>{course.author.name[0]}</AvatarFallback>
              </Avatar>
              <span>{course.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{course.totalDuration}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">About This Course</h2>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{course.description}</p>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold">Course Content</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.videos.map((video, index) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-40 h-24 rounded-md overflow-hidden">
                        <Image
                          src={video.thumbnailUrl}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                        <a
                          href={`https://www.youtube.com/watch?v=${video.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Play className="h-8 w-8 text-white" />
                        </a>
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          {index + 1}. {cleanVideoTitle(video.title)}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 pr-2 mt-1">
                          {video.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-black font-medium">
                        {video.duration}
                      </span>
                      <Button variant="outline" size="icon" asChild>
                        <Link
                          href={`https://www.youtube.com/watch?v=${video.videoId}`}
                          target="_blank"
                          title="Watch on YouTube"
                          className="hover:text-red-500 transition-colors"
                          rel="noopener noreferrer"
                        >
                          <YoutubeIcon className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <h2 className="text-xl font-semibold">Course Details</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{course.totalDuration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Videos</span>
                <span className="font-medium">{course.videos.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Level</span>
                <Badge>{course.level}</Badge>
              </div>
              <div className="pt-4 border-t">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                  asChild
                >
                  <Link
                    href={`https://www.youtube.com/playlist?list=${course.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" text-white transition-colors"
                  >
                    <YoutubeIcon className="mr-2 h-4 w-4" />
                    Watch on YouTube
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Comments Section */}
      <div className="mt-12">
        <Card className="bg-slate-900 text-white border border-gray-800">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Comments</h2>
          </CardHeader>
          <CardContent>
            <Giscus
              repo="anburocky3/anbuselvan-annamalai"
              repoId="R_kgDONrByRw"
              category="Comments"
              categoryId="DIC_kwDONrByR84CojDV"
              mapping="specific"
              strict="1"
              term={params.slug}
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme="dark"
              lang="en"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
