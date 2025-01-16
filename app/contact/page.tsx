export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-16">Get in Touch</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Interested in collaboration or have a project in mind? 
              Feel free to reach out through any of these channels.
            </p>
            
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <h3 className="font-semibold">{method.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{method.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                rows={6}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const contactMethods = [
  {
    icon: "📧",
    title: "Email",
    value: "anbuselvan@cyberdude.com"
  },
  {
    icon: "📱",
    title: "Phone",
    value: "+91 XXXXX XXXXX"
  },
  {
    icon: "📍",
    title: "Location",
    value: "Chennai, Tamil Nadu, India"
  }
];
