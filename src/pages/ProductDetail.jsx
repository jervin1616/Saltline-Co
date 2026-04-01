import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const product = products.find((p) => p.id === parseInt(id))

  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center pt-24">
        <div className="text-center">
          <p className="font-syne font-bold text-2xl text-driftwood mb-4">Product not found.</p>
          <Link to="/shop" className="font-dm text-ocean hover:text-ocean-dark transition-all duration-300">
            Back to Shop →
          </Link>
        </div>
      </div>
    )
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      size: selectedSize,
      quantity,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const isOnSale = product.originalPrice !== null

  return (
    <div className="bg-sand min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Left: Image */}
          <div className="aspect-square bg-sand-dark rounded-lg flex flex-col items-center justify-center shadow-sm">
            <span className="text-8xl mb-4">{product.emoji}</span>
            <p className="font-dm italic text-driftwood-mid text-sm">{product.name}</p>
          </div>

          {/* Right: Info */}
          <div>
            {/* Breadcrumb */}
            <nav className="font-dm text-xs text-driftwood-mid mb-4">
              <Link to="/shop" className="hover:text-ocean transition-all duration-300">Shop</Link>
              <span className="mx-1">/</span>
              <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-ocean transition-all duration-300">
                {product.category}
              </Link>
              <span className="mx-1">/</span>
              <span className="text-driftwood">{product.name}</span>
            </nav>

            {/* Badge */}
            {product.badge && (
              <span
                className={`inline-block text-xs font-dm font-bold px-3 py-1 rounded-full mb-4 ${
                  product.badge === 'Sale' ? 'bg-coral text-white' : 'bg-ocean text-white'
                }`}
              >
                {product.badge}
              </span>
            )}

            {/* Name */}
            <h1 className="font-syne font-extrabold text-4xl text-driftwood tracking-tight leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              {isOnSale ? (
                <>
                  <span className="font-syne font-bold text-2xl text-coral">${product.price}</span>
                  <span className="font-dm text-lg text-driftwood-mid line-through">${product.originalPrice}</span>
                </>
              ) : (
                <span className="font-syne font-bold text-2xl text-ocean">${product.price}</span>
              )}
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-5">
              <span className="text-yellow-400 text-sm">★★★★★</span>
              <span className="font-dm text-xs text-driftwood-mid">(4.8)</span>
            </div>

            {/* Description */}
            <p className="font-dm font-light text-driftwood-mid leading-relaxed mb-6">
              {product.description}
            </p>

            <hr className="border-sand-dark mb-6" />

            {/* Size Selection */}
            {product.sizes && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-dm font-medium text-xs text-driftwood uppercase tracking-wider">
                    Select Size
                  </p>
                  <a href="#" className="font-dm text-xs text-driftwood-mid hover:text-ocean transition-all duration-300">
                    Size Guide
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false) }}
                      className={`px-4 py-2 rounded-lg border text-sm font-dm font-medium transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-ocean text-ocean bg-seafoam'
                          : 'border-sand-dark text-driftwood hover:border-ocean hover:text-ocean'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="font-dm text-xs text-coral mt-2">Please select a size.</p>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="font-dm font-medium text-xs text-driftwood uppercase tracking-wider">Qty</p>
              <div className="flex items-center gap-3 border border-sand-dark rounded-lg px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-driftwood-mid hover:text-driftwood transition-all duration-300 w-5 h-5 flex items-center justify-center"
                >
                  −
                </button>
                <span className="font-dm text-sm text-driftwood w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-driftwood-mid hover:text-driftwood transition-all duration-300 w-5 h-5 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`w-full font-syne font-bold py-4 rounded-full transition-all duration-300 mb-3 ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-ocean hover:bg-ocean-dark text-white'
              }`}
            >
              {added ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>

            <Link
              to="/shop"
              className="block text-center font-dm text-sm text-driftwood-mid hover:text-ocean transition-all duration-300"
            >
              Continue Shopping →
            </Link>
          </div>
        </div>

        {/* Product Details */}
        <div className="mb-20 max-w-2xl">
          <h2 className="font-syne font-bold text-2xl text-driftwood mb-5">Product Details</h2>
          <ul className="space-y-2">
            {product.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-ocean mt-1 flex-shrink-0">·</span>
                <span className="font-dm text-driftwood-mid">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* You May Also Like */}
        {related.length > 0 && (
          <div>
            <h2 className="font-syne font-bold text-3xl text-driftwood mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} showQuickAdd={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
