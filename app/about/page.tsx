export default function About() {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-16">About Anbuselvan</h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                As the founder and CEO of CyberDude, I&apos;ve dedicated my career to pushing the boundaries 
                of technology and innovation. With over 15 years of experience in the tech industry, 
                I&apos;ve had the privilege of working across various domains and helping businesses 
                transform their digital presence.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                My journey began with a passion for ethical hacking and cybersecurity, which evolved 
                into a comprehensive understanding of full-stack development, mobile solutions, and 
                enterprise architecture.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">15+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Years Experience</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">100+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
                </div>
              </div>
            </div>
            <div className="relative">
              {/* Add about section image here */}
              <div className="aspect-square bg-blue-600/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }