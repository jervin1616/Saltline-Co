import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, showQuickAdd = false }) {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleCardClick = (e) => {
    // Don't navigate if clicking quick-add controls
    if (e.target.closest('.quick-add-zone')) return
    navigate(`/shop/${product.id}`)
  }

  const handleAddToCart = (size) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      size: size,
      quantity: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const displayPrice = product.badge === 'Sale' ? product.price : product.price
  const isOnSale = product.originalPrice !== null

  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden group"
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setSelectedSize(null)
      }}
    >
      {/* Image Area */}
      <div className="relative aspect-square bg-sand-dark overflow-hidden">
        {/* Placeholder */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <span className="text-5xl mb-2">{product.emoji}</span>
          <span className="font-dm italic text-xs text-driftwood-mid text-center leading-tight">
            {product.name}
          </span>
        </div>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-dm font-bold px-2 py-1 rounded-full z-10 ${
              product.badge === 'Sale'
                ? 'bg-coral text-white'
                : 'bg-ocean text-white'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Quick Add Overlay */}
        {showQuickAdd && (
          <div
            className={`quick-add-zone absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-3 transition-all duration-300 ${
              hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {added ? (
              <div className="text-center py-1">
                <span className="font-dm text-sm text-ocean font-medium">Added ✓</span>
              </div>
            ) : product.sizes ? (
              <div className="flex flex-wrap gap-1 justify-center">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleAddToCart(size)}
                    className="text-xs font-dm font-medium px-2 py-1 rounded border border-sand-dark text-driftwood hover:border-ocean hover:text-ocean transition-all duration-300"
                  >
                    {size}
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(null)}
                className="w-full bg-ocean hover:bg-ocean-dark text-white text-xs font-dm font-medium py-2 rounded-full transition-all duration-300"
              >
                Add to Cart
              </button>
            )}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="font-syne font-bold text-sm text-driftwood leading-tight mb-1">
          {product.name}
        </p>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-syne font-bold text-sm text-ocean">
            ${product.price}
          </span>
          {isOnSale && (
            <span className="font-dm text-xs text-driftwood-mid line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <p className="font-dm text-xs text-driftwood-mid">{product.category}</p>
      </div>
    </div>
  )
}
