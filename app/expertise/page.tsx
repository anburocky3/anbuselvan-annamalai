export default function Expertise() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-16">Areas of Expertise</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseAreas.map((area, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="mb-4">{area.icon}</div>
              <h3 className="text-xl font-bold mb-4">{area.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{area.description}</p>
              <ul className="space-y-2">
                {area.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const expertiseAreas = [
  {
    title: "Ethical Hacking",
    description: "Comprehensive security assessments and penetration testing.",
    skills: ["Penetration Testing", "Security Auditing", "Vulnerability Assessment", "Security Training"],
    icon: "🔒"
  },
  {
    title: "Web Development",
    description: "Full-stack web solutions using modern technologies.",
    skills: ["React/Next.js", "Node.js", "PHP", "Database Design", "API Development"],
    icon: "💻"
  },
  {
    title: "Mobile Development",
    description: "Cross-platform and native mobile applications.",
    skills: ["Flutter", "React Native", "iOS", "Android", "Mobile UI/UX"],
    icon: "📱"
  },
  {
    title: "Cloud & DevOps",
    description: "Cloud infrastructure and deployment solutions.",
    skills: ["AWS", "Docker", "CI/CD", "Kubernetes", "Microservices"],
    icon: "☁️"
  },
  {
    title: "Technical Leadership",
    description: "Team leadership and project management.",
    skills: ["Team Management", "Agile Methodologies", "Technical Planning", "Mentoring"],
    icon: "👥"
  },
  {
    title: "Digital Strategy",
    description: "Digital transformation and technology consulting.",
    skills: ["Digital Transformation", "Tech Strategy", "Innovation Planning", "Solution Architecture"],
    icon: "🎯"
  }
];
