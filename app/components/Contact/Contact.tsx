'use client';

export default function Contact() {
  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ), 
      link: 'https://www.instagram.com/hafrsyh?igsh=c2RsbHZwNmYwZ2N2' 
    },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
      <div className="max-w-[1920px] mx-auto w-full">
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 lg:mb-5">
            Get In Touch
          </h2>
          <div className="w-24 sm:w-32 lg:w-40 h-1 lg:h-2 bg-gray-600 mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 sm:mb-5 text-center">
            Let's Work Together
          </h3>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-8 sm:mb-10 text-center">
            I'm always interested in hearing about new projects and opportunities.
            Feel free to reach out if you want to collaborate or just say hi!
          </p>

          {/* Contact Form */}
          <div className="bg-gray-900/10 backdrop-blur-sm p-8 sm:p-10 lg:p-12 rounded-xl border border-gray-800/30 mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-8 text-center">Send a Message</h3>
            <form className="space-y-6 sm:space-y-8">
              <div>
                <label className="block text-base sm:text-lg lg:text-xl text-gray-400 mb-3">Name</label>
                <input
                  type="text"
                  autoComplete="off"
                  suppressHydrationWarning
                  className="w-full px-5 py-4 lg:px-6 lg:py-5 bg-black/50 border border-gray-800/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors text-base sm:text-lg lg:text-xl"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-base sm:text-lg lg:text-xl text-gray-400 mb-3">Email</label>
                <input
                  type="email"
                  autoComplete="off"
                  suppressHydrationWarning
                  className="w-full px-5 py-4 lg:px-6 lg:py-5 bg-black/50 border border-gray-800/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors text-base sm:text-lg lg:text-xl"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-base sm:text-lg lg:text-xl text-gray-400 mb-3">Message</label>
                <textarea
                  rows={6}
                  autoComplete="off"
                  suppressHydrationWarning
                  className="w-full px-5 py-4 lg:px-6 lg:py-5 bg-black/50 border border-gray-800/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors resize-none text-base sm:text-lg lg:text-xl"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-5 lg:py-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-base sm:text-lg lg:text-xl font-medium"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-6 sm:mb-8 text-center">
              Follow Me
            </h4>
            <div className="flex flex-wrap justify-center gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center bg-gray-900/20 rounded-full border border-gray-800/30 hover:border-gray-600 hover:bg-gray-600/20 transition-all duration-300 group"
                  title={social.name}
                >
                  <div className="text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 sm:mt-24 text-center">
          <p className="text-base sm:text-lg lg:text-xl text-gray-500">
            © 2025 Portfolio. Built with Next.js & Three.js
          </p>
        </div>
      </div>
    </section>
  );
}
