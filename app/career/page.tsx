export default function Career() {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-16">Career Journey</h1>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-600"></div>
            
            <div className="space-y-16">
              {careerMilestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="w-1/2"></div>
                  <div className="w-4 h-4 bg-blue-600 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                      <span className="text-blue-600 font-semibold">{milestone.year}</span>
                      <h3 className="text-xl font-bold mt-2">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const careerMilestones = [
    {
      year: "2023",
      title: "Expanding CyberDude's Reach",
      description: "Scaled operations globally and launched new tech initiatives."
    },
    {
      year: "2020",
      title: "Founded CyberDude",
      description: "Established CyberDude to provide comprehensive tech solutions."
    },
    {
      year: "2015",
      title: "Tech Leadership Role",
      description: "Led major digital transformation projects for enterprise clients."
    },
    {
      year: "2010",
      title: "Senior Developer",
      description: "Specialized in full-stack development and security solutions."
    },
    {
      year: "2008",
      title: "Career Beginning",
      description: "Started journey as a security researcher and web developer."
    }
  ];