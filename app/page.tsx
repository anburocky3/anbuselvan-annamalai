import About from "./about/page";
import Expertise from "./expertise/page";
import Career from "./career/page";
import Contact from "./contact/page";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Anbuselvan Annamalai
            </h1>
            <h2 className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Founder & CEO of CyberDude | Tech Entrepreneur | Full-Stack Developer
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-400 mb-8">
              With 15+ years of expertise in ethical hacking, web development, and mobile solutions, 
              I help businesses transform their digital presence.
            </p>
            <div className="flex gap-4">
              <a
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Get in Touch
              </a>
              <a
                href="/about"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Add profile image here */}
              <div className="absolute inset-0 bg-blue-600/10 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Expertise Preview Section */}
        <section className="mt-32">
          <h2 className="text-3xl font-bold text-center mb-16">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => (
              <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">{area.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{area.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <About/>

      <Expertise/>

      <Career/>

      <Contact/>
    </div>
  );
}

const expertiseAreas = [
  {
    title: "Ethical Hacking",
    description: "Comprehensive security assessments and penetration testing to protect digital assets."
  },
  {
    title: "Full-Stack Development",
    description: "End-to-end web solutions using modern technologies and best practices."
  },
  {
    title: "Mobile Development",
    description: "Cross-platform mobile applications using Flutter and native technologies."
  },
];
