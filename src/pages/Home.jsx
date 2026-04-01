import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const featured = products.filter((p) => p.featured)

export default function Home() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="grain relative min-h-screen bg-sand flex items-center overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <h1 className="font-syne font-extrabold text-6xl md:text-7xl leading-none tracking-tight text-driftwood mb-6">
                Wear the<br />Coast.
              </h1>
              <p className="font-dm font-light text-lg text-driftwood-mid mb-8 max-w-md">
                Coastal apparel and goods made for life near the water. Designed in Wilmington, NC.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="bg-ocean hover:bg-ocean-dark text-white font-syne font-bold px-8 py-4 rounded-full transition-all duration-300"
                >
                  Shop Now
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-driftwood text-driftwood hover:bg-driftwood hover:text-white font-syne font-bold px-8 py-4 rounded-full transition-all duration-300"
                >
                  Our Story
                </Link>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="flex justify-center md:justify-end">
              <div className="aspect-square w-full max-w-md rounded-2xl overflow-hidden shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&h=900&fit=crop&q=80&auto=format"
                  alt="Aerial view of ocean waves"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-sand-dark py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: '🚢', text: 'Free Shipping Over $75' },
              { icon: '🌊', text: 'Designed in Wilmington' },
              { icon: '♻️', text: 'Sustainable Materials' },
              { icon: '↩️', text: 'Easy Returns' },
            ].map((item) => (
              <div key={item.text} className="flex flex-col items-center gap-1">
                <span className="text-xl">{item.icon}</span>
                <span className="font-dm text-xs text-driftwood-mid">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-sand py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-syne font-bold text-4xl tracking-tight text-driftwood">
              New & Featured
            </h2>
            <Link
              to="/shop"
              className="font-dm text-sm text-ocean hover:text-ocean-dark transition-all duration-300"
            >
              Shop All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} showQuickAdd={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Strip */}
      <section className="bg-ocean py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-syne font-bold text-4xl text-white tracking-tight mb-6">
              Born on the Coast.
            </h2>
            <p className="font-dm font-light text-white/80 text-lg mb-4">
              Saltline Co. started as a screen printing operation out of a garage in Wilmington's Soda Pop District, making shirts for local surf competitions.
            </p>
            <p className="font-dm font-light text-white/80 text-lg mb-8">
              Today every product is designed with the Carolina coast in mind — the colors, the textures, the feeling of salt air and unhurried afternoons.
            </p>
            <Link
              to="/about"
              className="font-dm text-sm text-white/80 hover:text-white transition-all duration-300"
            >
              Read Our Story →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-sand-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-syne font-bold text-4xl tracking-tight text-driftwood mb-10">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {[
              { name: 'Apparel', emoji: '👕' },
              { name: 'Accessories', emoji: '🧢' },
              { name: 'Drinkware', emoji: '☕' },
              { name: 'Art & Prints', emoji: '🖼️' },
            ].map((cat) => (
              <Link
                key={cat.name}
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="bg-sand rounded-xl p-8 flex flex-col items-center gap-4 shadow-sm hover:shadow-md hover:border-ocean border-2 border-transparent transition-all duration-300 group"
              >
                <span className="text-4xl">{cat.emoji}</span>
                <p className="font-syne font-bold text-driftwood">{cat.name}</p>
                <p className="font-dm text-xs text-ocean group-hover:text-ocean-dark transition-all duration-300">
                  Shop {cat.name} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-driftwood py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-syne font-bold text-4xl text-white mb-3">
            Get 10% Off Your First Order
          </h2>
          <p className="font-dm font-light text-white/70 mb-8">
            New arrivals, restocks, and coastal dispatches — straight to your inbox.
          </p>

          {subscribed ? (
            <p className="font-dm text-white text-lg">Thanks! Check your inbox. 🌊</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 max-w-xs bg-sand text-driftwood font-dm px-5 py-3 rounded-full outline-none focus:ring-2 focus:ring-ocean/50 placeholder:text-driftwood-mid/50"
              />
              <button
                type="submit"
                className="bg-ocean hover:bg-ocean-dark text-white font-syne font-bold px-6 py-3 rounded-full transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="font-dm text-xs text-white/40 mt-4">
            We respect your inbox. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}
