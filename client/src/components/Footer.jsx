const Footer = () => {
  return (
    <footer className="glass mt-auto border-t border-white/10 bg-black/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="left">
            <h3 className="text-xl font-bold mb-4 text-white">Lumixor Studio</h3>
            <p className="text-blue-100">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum esse voluptates temporibus error amet cumque, qui dolorem neque cum consectetur.
            </p>
          </div>

          {/* Quick Links */}
          <div className="middle">
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-blue-100 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/items" className="text-blue-100 hover:text-white transition">
                  Equipment Catalog
                </a>
              </li>
              <li>
                <a href="/login" className="text-blue-100 hover:text-white transition">
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="right">
            <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
            <p className="text-blue-100">
              Email: info@lumixor.com<br />
              Phone: +62 123 4567 890<br />
              Address: Tangerang Selatan, Indonesia
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Lumixor Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
