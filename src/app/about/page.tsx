import EducationSection from "@/components/site/EducationSection";
import { route } from "@/config/routes";
import { socialLinks } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FaWalkieTalkie } from "react-icons/fa6";
import { LuYoutube } from "react-icons/lu";

export const metadata: Metadata = {
  title: "About Anbuselvan Annamalai | Technology Mentor & Entrepreneur",
  description:
    "Learn about Anbuselvan Annamalai's journey, expertise in React, React Native, and full-stack development. Recognized TEDx speaker, guest lecturer at IIT Madras, and technology mentor with over 10 years of experience.",
  alternates: {
    canonical: "https://anbuselvan-annamalai.com/about",
  },
  openGraph: {
    title: "About Anbuselvan Annamalai | Technology Mentor & Entrepreneur",
    description:
      "Learn about Anbuselvan Annamalai's journey, expertise in React, React Native, and full-stack development. Recognized TEDx speaker, guest lecturer at IIT Madras, and technology mentor with over 10 years of experience.",
    url: "https://anbuselvan-annamalai.com/about",
    siteName: "Anbuselvan Annamalai",
    locale: "en_US",
    type: "website",
  },
};

const colleges = [
  {
    name: "VIT University",
    url: "https://www.vit.ac.in",
  },
  {
    name: "Anna University",
    url: "https://www.annauniv.edu",
  },
  {
    name: "Kongu Engineering College",
    url: "https://www.kongu.edu",
  },
  {
    name: "Sri Krishna College of Engineering and Technology",
    url: "https://www.skcet.ac.in",
  },
  {
    name: "DMI College of Engineering",
    url: "https://www.dmice.ac.in",
  },
  {
    name: "PSNA College of Engineering and Technology",
    url: "https://www.psnacet.edu.in",
  },
  {
    name: "Sathyabama University",
    url: "https://www.sathyabama.ac.in",
  },
  {
    name: "SRM Institute of Science and Technology",
    url: "https://www.srmist.edu.in",
  },
  {
    name: "Sreenivasa Institute of Technology and Management Studies",
    url: "https://www.sitams.ac.in",
  },
  {
    name: "Vidyasagar College of Arts & Science",
    url: "https://vidyasagarcollege.org",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-white mb-8">
        About Anbuselvan Annamalai
      </h1>

      <div className="bg-slate-800 rounded-lg p-8 text-gray-300">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">
          Entrepreneur & Technology Mentor
        </h2>

        <p className="mb-4">
          Founder & CEO of{" "}
          <a
            href="https://cyberdudenetworks.com"
            target="_blank"
            rel="noopener"
            className="text-purple-300 hover:underline"
          >
            CyberDude Networks Pvt. Ltd.
          </a>
          . With over 10 years of experience in the technology industry, I
          specialize in creating exceptional web and mobile applications using
          modern technologies like{" "}
          <Link
            href="https://react.dev"
            target="_blank"
            rel="noopener"
            className="text-purple-300 hover:underline"
          >
            React
          </Link>
          ,{" "}
          <Link
            href="https://reactnative.dev"
            target="_blank"
            rel="noopener"
            className="text-purple-300 hover:underline"
          >
            React Native
          </Link>
          ,{" "}
          <Link
            href="https://nodejs.org"
            target="_blank"
            rel="noopener"
            className="text-purple-300 hover:underline"
          >
            Node.js
          </Link>
          , and more.{" "}
        </p>

        <p className="mb-4">
          I write about my{" "}
          <Link
            href={route("blog")}
            className="text-purple-300 hover:underline"
          >
            journey and experiences in my blog.
          </Link>
        </p>

        <p className="mb-4">
          As an entrepreneur and technology mentor, I&apos;ve helped numerous
          businesses and individuals transform their ideas into successful
          digital products. My approach combines technical expertise with a deep
          understanding of business needs to deliver solutions that drive real
          results.
        </p>

        <h3 className="text-xl font-semibold text-purple-300 mt-8 mb-3">
          Expertise
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Full-stack web development with{" "}
            <Link
              href="https://react.dev"
              target="_blank"
              rel="noopener"
              className="text-purple-300 hover:underline"
            >
              React
            </Link>
            ,{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener"
              className="text-purple-300 hover:underline"
            >
              Next.js
            </Link>
            , and{" "}
            <Link
              href="https://nodejs.org"
              target="_blank"
              rel="noopener"
              className="text-purple-300 hover:underline"
            >
              Node.js
            </Link>
          </li>
          <li>
            Mobile app development with{" "}
            <Link
              href="https://reactnative.dev"
              target="_blank"
              rel="noopener"
              className="text-purple-300 hover:underline"
            >
              React Native
            </Link>{" "}
            and{" "}
            <Link
              href="https://flutter.dev"
              target="_blank"
              rel="noopener"
              className="text-purple-300 hover:underline"
            >
              Flutter
            </Link>
          </li>
          <li>
            Database design and implementation (
            <Link
              href="https://www.mongodb.com"
              target="_blank"
              rel="noopener"
              className="text-purple-300 hover:underline"
            >
              MongoDB
            </Link>
            ,{" "}
            <Link
              href="https://www.postgresql.org"
              target="_blank"
              rel="noopener"
              className="text-purple-300 hover:underline"
            >
              PostgreSQL
            </Link>
            )
          </li>
          <li>API development and integration</li>
          <li>UI/UX design and implementation</li>
          <li>Technology consulting and mentorship</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-300 mt-8 mb-3">
          Honours & Recognition
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-white flex items-center gap-2">
              <LuYoutube className="text-red-500" />
              Teaching Hands-On Coding on YouTube
            </h4>
            <p className="mt-2">
              I have created a{" "}
              <a
                href={socialLinks.cyberdude.url}
                target="_blank"
                className="text-purple-300 hover:underline"
              >
                YouTube channel
              </a>{" "}
              where I teach hands-on coding for free. I have taught over 10
              Million people around the world, the count is growing.
            </p>
            <blockquote className="mt-2">
              <p className="text-gray-400 italic">
                👉{" "}
                <a
                  href="https://www.youtube.com/@cyberdudenetworks"
                  target="_blank"
                  rel="noopener"
                  className="text-purple-300 hover:underline"
                >
                  CyberDude YouTube Channel
                </a>{" "}
                |{" "}
                <a
                  href="https://www.google.com/search?q=cyberdude"
                  target="_blank"
                >
                  Google Search
                </a>
              </p>
            </blockquote>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white">
              Guest Lectures & Keynotes
            </h4>
            <p className="mt-2">
              Invited as a distinguished guest lecturer at premier institutions
              including{" "}
              <Link
                href="https://www.freshworks.com"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                Freshworks
              </Link>
              ,{" "}
              <Link
                href="https://www.iitm.ac.in"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                Kongu Engineering College
              </Link>
              ,{" "}
              <Link
                href="https://www.vit.ac.in"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                VIT Vellore
              </Link>
              ,{" "}
              <Link
                href="https://www.annauniv.edu"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                Anna University
              </Link>
              , and various engineering colleges across South India. My lectures
              focus on emerging trends in{" "}
              <Link
                href="https://reactjs.org"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                React
              </Link>{" "}
              development, modern web technologies, cyber security, lifestyle
              and entrepreneurship in the tech industry.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white">
              Workshops & Training Programs
            </h4>
            <p className="mt-2">
              Conducted over 25 free hands-on workshops for students at various
              colleges and universities, empowering the next generation of
              developers with practical skills in{" "}
              <Link
                href="https://www.figma.com"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                UI Design/Development
              </Link>
              ,{" "}
              <Link
                href="https://react.dev"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                React
              </Link>
              ,{" "}
              <Link
                href="https://www.javascript.com"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                JavaScript
              </Link>
              , and full-stack development. These workshops have benefited over
              5,000 students, many of whom have gone on to successful careers in
              technology.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white">
              Chief Guest Appearances
            </h4>
            <p className="mt-2">
              Honored as Chief Guest at numerous technical symposiums, college
              festivals, and industry conferences. Notable events include the
              Annual Smart India Hackathon at{" "}
              <Link
                href="https://www.sathyabama.ac.in"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                Sathyabama University
              </Link>
              ,{" "}
              <Link
                href="https://www.psnacet.edu.in"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                PSNA College of Engineering and Technology
              </Link>
              , TechFest at{" "}
              <Link
                href="https://www.kongu.edu"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                Kongu Engineering College
              </Link>
              , and the DevOps session at{" "}
              <Link
                href="https://www.vit.ac.in"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                VIT University
              </Link>
              .
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white">
              TED Talks & Public Speaking
            </h4>
            <p className="mt-2">
              Featured speaker at{" "}
              <Link
                href="https://www.ted.com/tedx"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                TEDx
              </Link>
              ,{" "}
              <Link
                href="https://www.freshworks.com"
                target="_blank"
                rel="noopener"
                className="text-purple-300 hover:underline"
              >
                Freshworks FSSA
              </Link>{" "}
              events, sharing insights on &ldquo;The Future of Web
              Development&rdquo; and &ldquo;Democratizing Technology Education
              in India.&rdquo; My talks have garnered over 500,000 views online
              and have inspired countless individuals to pursue careers in
              technology and entrepreneurship.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mt-8 mb-3">
            College Connections
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {colleges.map((college) => (
              <li key={college.name}>
                <Link
                  href={college.url}
                  target="_blank"
                  rel="noopener"
                  className="text-purple-300 hover:underline"
                >
                  {college.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-purple-300 mt-8 mb-3">
          Philosophy
        </h3>
        <p className="mb-4">
          I believe in creating technology that not only works flawlessly but
          also delivers exceptional user experiences. My work is guided by a
          commitment to quality, attention to detail, and a passion for
          continuous learning and improvement.
        </p>

        <p className="mb-4">
          Whether you&apos;re looking to build a new product, enhance an
          existing one, or need guidance on your technology strategy, I&apos;m
          here to help you succeed in today&apos;s digital landscape.
        </p>

        <div className="border border-green-200  rounded-lg p-4">
          <h3 className="text-xl font-semibold text-white flex items-center justify-between">
            <span>Interested in a Workshop Session?</span>
            <a
              href="/contact"
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2"
            >
              <FaWalkieTalkie className="" />
              <span>Lets Talk</span>
            </a>
          </h3>
        </div>
      </div>
      <EducationSection />

      {/* Structured Data for Person with Honors */}
      <Script
        id="person-honors-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Anbuselvan Annamalai",
            url: "https://anbuselvan-annamalai.com/about",
            image:
              "https://anbuselvan-annamalai.com/images/anbuselvan-annamalai.png",
            sameAs: [
              socialLinks.x.url,
              socialLinks.linkedin.url,
              socialLinks.github.url,
              socialLinks.instagram.url,
              socialLinks.youtube.url,
            ],
            jobTitle: "Entrepreneur & Technology Mentor",
            worksFor: {
              "@type": "Organization",
              name: "CyberDude Networks Pvt. Ltd.",
              url: "https://cyberdudenetworks.com",
            },
            alumniOf: [
              {
                "@type": "CollegeOrUniversity",
                name: "Anna University",
                url: "https://www.annauniv.edu",
              },
            ],
            knowsAbout: [
              "React",
              "React Native",
              "Node.js",
              "Full-stack Development",
              "Mobile App Development",
              "Web Development",
              "JavaScript",
              "TypeScript",
              "MongoDB",
              "PostgreSQL",
            ],
            hasCredential: [
              {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "degree",
                name: "Bachelor of Engineering in Computer Science",
              },
            ],
            honorificSuffix: "TEDx Speaker",
            award: [
              "Guest Lecturer at VIT Vellore",
              "Guest Lecturer at Anna University",
              "Guest Lecturer at Kongu Engineering College",
              "Guest Lecturer at Sathyabama University",
              "Guest Lecturer at SRM Institute of Science and Technology",
              "Guest Lecturer at PSNA College of Engineering and Technology",
              "Guest Lecturer at DMI College of Engineering",
              "Smart India Hackathon Mentor & Judge",
              "Featured TEDx Speaker",
            ],
          }),
        }}
      />

      {/* Structured Data for Events */}
      <Script
        id="events-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Event",
                  name: "Guest Lecture at VIT Vellore",
                  description:
                    "A lecture on emerging trends in React development and modern web technologies",
                  performer: {
                    "@type": "Person",
                    name: "Anbuselvan Annamalai",
                  },
                  offers: {
                    "@type": "Offer",
                    price: "Free",
                    priceCurrency: "INR",
                  },
                  organizer: {
                    "@type": "Organization",
                    name: "VIT Vellore",
                    url: "https://www.vit.ac.in",
                  },
                  eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                  eventStatus: "https://schema.org/EventScheduled",
                  image: [
                    {
                      "@type": "ImageObject",
                      url: "https://anbuselvan-annamalai.com/images/sessions/anbuselvan-annamalai-vit-talk.jpg",
                    },
                  ],
                  startDate: "2024-04-10",
                  endDate: "2024-04-10",
                  location: {
                    "@type": "Place",
                    name: "VIT Vellore",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Vellore",
                      addressRegion: "Tamil Nadu",
                      addressCountry: "India",
                    },
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "Event",
                  name: "TEDx Talk on Freshworks FSSA",
                  description:
                    "A TEDx talk discussing the future of web development and its impact on society",
                  performer: {
                    "@type": "Person",
                    name: "Anbuselvan Annamalai",
                  },
                  startDate: "2025-03-13",
                  endDate: "2025-03-13",
                  organizer: {
                    "@type": "Organization",
                    name: "Freshworks",
                    url: "https://www.freshworks.com",
                  },
                  offers: {
                    "@type": "Offer",
                    price: "Free",
                    priceCurrency: "INR",
                  },
                  eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                  eventStatus: "https://schema.org/EventScheduled",
                  image: [
                    {
                      "@type": "ImageObject",
                      url: "https://anbuselvan-annamalai.com/images/sessions/anbuselvan-annamalai-freshworks-talk.jpg",
                    },
                  ],
                  location: {
                    "@type": "Place",
                    name: "Freshworks FSSA",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Chennai",
                      addressRegion: "Tamil Nadu",
                      addressCountry: "India",
                    },
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Event",
                  name: "Workshop on React Development",
                  description:
                    "A hands-on workshop teaching students practical skills in React development",
                  performer: {
                    "@type": "Person",
                    name: "Anbuselvan Annamalai",
                  },
                  organizer: {
                    "@type": "Organization",
                    name: "Kongu Engineering College",
                    url: "https://www.kongu.edu",
                  },
                  offers: {
                    "@type": "Offer",
                    price: "Free",
                    priceCurrency: "INR",
                  },
                  image: [
                    {
                      "@type": "ImageObject",
                      url: "https://anbuselvan-annamalai.com/images/sessions/anbuselvan-annamalai-kongu-talks-1.jpg",
                    },
                    {
                      "@type": "ImageObject",
                      url: "https://anbuselvan-annamalai.com/images/sessions/anbuselvan-annamalai-kongu-talks-2.jpg",
                    },
                  ],
                  eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                  eventStatus: "https://schema.org/EventScheduled",
                  startDate: "2024-03-01",
                  endDate: "2024-03-03",
                  location: {
                    "@type": "Place",
                    name: "Kongu Engineering College",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Erode",
                      addressRegion: "Tamil Nadu",
                      addressCountry: "India",
                    },
                  },
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
