import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-driftwood text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-syne font-extrabold text-xl tracking-tight text-white mb-2">
              SALTLINE CO.
            </p>
            <p className="font-dm text-sm text-white/70 mb-4">Wear the Coast.</p>
            <a
              href="https://instagram.com/saltlineco"
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm text-sm text-white/60 hover:text-white transition-all duration-300"
            >
              @saltlineco
            </a>
          </div>

          {/* Shop */}
          <div>
            <p className="font-syne font-bold text-sm text-white mb-4 uppercase tracking-wide">
              Shop
            </p>
            <ul className="space-y-2">
              {['Apparel', 'Accessories', 'Drinkware', 'Art & Prints'].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(cat)}`}
                    className="font-dm text-sm text-white/60 hover:text-white transition-all duration-300"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="font-syne font-bold text-sm text-white mb-4 uppercase tracking-wide">
              Help
            </p>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="font-dm text-sm text-white/60 hover:text-white transition-all duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="font-dm text-sm text-white/60 hover:text-white transition-all duration-300">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-dm text-sm text-white/60 hover:text-white transition-all duration-300">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="font-syne font-bold text-sm text-white mb-4 uppercase tracking-wide">
              About
            </p>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="font-dm text-sm text-white/60 hover:text-white transition-all duration-300">
                  Our Story
                </Link>
              </li>
              <li>
                <a href="#" className="font-dm text-sm text-white/60 hover:text-white transition-all duration-300">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="font-dm text-sm text-white/60 hover:text-white transition-all duration-300">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-dm text-xs text-white/50">
            © 2025 Saltline Co. · Wilmington, NC
          </p>
          <p className="font-dm text-xs text-driftwood-mid">
            VISA · MC · AMEX · PayPal
          </p>
          <a
            href="https://jervin1616.github.io/RisingTideDigital/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm text-xs text-driftwood-mid hover:text-white/50 transition-all duration-300"
          >
            Site by Rising Tide Digital
          </a>
        </div>
      </div>
    </footer>
  )
}
