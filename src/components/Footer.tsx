export default function Footer() {
  return (
    <footer className="relative z-10 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white py-8 mt-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Section: Branding / Copyright */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-semibold tracking-wide">
            © {new Date().getFullYear()} Event Showcase
          </span>
          <span className="hidden sm:inline-block text-amber-300">✨</span>
        </div>

        {/* Center Section: Quick Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <a
            href="#"
            className="hover:text-amber-300 transition-colors duration-200"
            aria-label="Home"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-amber-300 transition-colors duration-200"
            aria-label="Events"
          >
            Events
          </a>
          <a
            href="#"
            className="hover:text-amber-300 transition-colors duration-200"
            aria-label="Subscription"
          >
            Subscription
          </a>
          <a
            href="#"
            className="hover:text-amber-300 transition-colors duration-200"
            aria-label="Contact"
          >
            Contact
          </a>
        </nav>

        {/* Right Section: Simple social or credits */}
        <div className="text-sm opacity-75 text-center md:text-right">
          Built with ❤️ using Next.js & Tailwind CSS
        </div>
      </div>

      {/* Accent glow bar at the top of footer for matching header vibe */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-yellow-300/80 via-amber-400/80 to-purple-400/60 blur-sm opacity-60 pointer-events-none" />
    </footer>
  );
}
