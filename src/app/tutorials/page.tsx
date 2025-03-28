import { Metadata } from "next";
import CourseComponent from "@/components/courses/AllCourses";
import { playlists } from "@/data/playlists";

export const metadata: Metadata = {
  title:
    "Technology Tutorials & Courses in Tamil | CyberDude Networks Pvt. Ltd.",
  description:
    "Learn technology from industry experts at CyberDude Networks. Access comprehensive video tutorials on programming, networking, cybersecurity, and more. Free and premium courses available.",
  keywords:
    "technology tutorials, programming tutorials, networking tutorials, cybersecurity tutorials, web development, coding courses, IT training, CyberDude Networks, Anbuselvan Annamalai",
  openGraph: {
    title:
      "Technology Tutorials & Courses in Tamil | CyberDude Networks Pvt. Ltd.",
    description:
      "Learn technology from industry experts at CyberDude Networks. Access comprehensive video tutorials on programming, networking, cybersecurity, and more.",
    type: "website",
    url: "https://anbuselvan-annamalai.com/tutorials",
    images: [
      {
        url: "https://anbuselvan-annamalai.com/images/anbuselvan-annamalai-og.png",
        width: 1200,
        height: 630,
        alt: "CyberDude Networks Tutorials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Tutorials & Courses in Tamil | CyberDude Networks",
    description:
      "Learn technology from industry experts at CyberDude Networks. Access comprehensive video tutorials on programming, networking, cybersecurity, and more.",
    images: [
      "https://anbuselvan-annamalai.com/images/anbuselvan-annamalai-og.png",
    ],
  },
  alternates: {
    canonical: "https://anbuselvan-annamalai.com/tutorials",
  },
};

// Generate structured data for courses
function generateStructuredData() {
  const courseList = playlists.map((course) => ({
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `https://anbuselvan-annamalai.com/tutorials/${course.slug}`,
    provider: {
      "@type": "Organization",
      name: "CyberDude Networks Pvt. Ltd.",
      sameAs: "https://www.youtube.com/@CyberDudeNetworks",
    },
    instructor: {
      "@type": "Person",
      name: "Anbuselvan Annamalai",
      image: "https://anbuselvan-annamalai.com/images/anbuselvan-annamalai.png",
    },
    offers: {
      "@type": "Offer",
      category: "Free",
      price: "0",
      priceCurrency: "INR",
    },
    educationalLevel: course.level,
    timeRequired: `PT${course.totalDuration.replace(/[^0-9]/g, "")}M`,
    numberOfItems: course.videos.length,
    hasCourseInstance: course.videos.map((video) => ({
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: `PT${course.videos.reduce(
        (acc, video) => acc + parseInt(video.duration.replace(/[^0-9]/g, "")),
        0
      )}M`,
      name: video.title,
      description: video.description,
      duration: `PT${video.duration.replace(/[^0-9]/g, "")}M`,
      video: {
        "@type": "VideoObject",
        name: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl,
        uploadDate: video.publishedAt,
        duration: `PT${video.duration.replace(/[^0-9]/g, "")}M`,
        embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
      },
    })),
  }));

  // Breadcrumb schema
  const breadcrumbSchema = {
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
    ],
  };

  // Course list schema
  const courseListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courseList.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: course,
    })),
  };

  return [breadcrumbSchema, courseListSchema];
}

export default function TutorialsPage() {
  return (
    <>
      {generateStructuredData().map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      <div className="container mx-auto py-8 px-4 mt-10">
        <CourseComponent />
      </div>
    </>
  );
}
