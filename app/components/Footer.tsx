export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Anbuselvan Annamalai</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Founder & CEO of CyberDude
              <br />
              Tech Entrepreneur & Security Expert
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            {/* <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul> */}
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} Anbuselvan Annamalai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

const socialLinks = [
  {
    name: 'LinkedIn',
    url: '#',
    icon: '🔗'
  },
  {
    name: 'Twitter',
    url: '#',
    icon: '🐦'
  },
  {
    name: 'GitHub',
    url: '#',
    icon: '💻'
  }
];
