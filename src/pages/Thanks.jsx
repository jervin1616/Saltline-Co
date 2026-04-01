import { Link } from 'react-router-dom'

export default function Thanks() {
  return (
    <div className="bg-sand min-h-screen flex items-center justify-center pt-24 px-4">
      <div className="text-center max-w-md">
        <span className="text-7xl block mb-6">🌊</span>
        <h2 className="font-syne font-bold text-4xl text-driftwood tracking-tight mb-4">
          Message received.
        </h2>
        <p className="font-dm font-light text-driftwood-mid text-lg mb-10">
          We'll get back to you within 1–2 business days. In the meantime, explore the shop.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/shop"
            className="bg-ocean hover:bg-ocean-dark text-white font-syne font-bold px-8 py-4 rounded-full transition-all duration-300"
          >
            Back to Shop
          </Link>
          <Link
            to="/"
            className="border-2 border-driftwood text-driftwood hover:bg-driftwood hover:text-white font-syne font-bold px-8 py-4 rounded-full transition-all duration-300"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
