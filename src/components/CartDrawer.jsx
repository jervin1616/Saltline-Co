import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="flex gap-3 py-4">
      {/* Thumbnail */}
      <div className="w-16 h-16 flex-shrink-0 bg-sand-dark rounded flex items-center justify-center text-2xl">
        {item.emoji}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-syne font-bold text-sm text-driftwood leading-tight">{item.name}</p>
        {item.size && (
          <p className="font-dm text-xs text-driftwood-mid mt-0.5">Size: {item.size}</p>
        )}
        <p className="font-syne font-bold text-sm text-ocean mt-1">${item.price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
            className="w-6 h-6 rounded-full border border-sand-dark text-driftwood-mid text-sm flex items-center justify-center hover:border-ocean hover:text-ocean transition-all duration-300"
          >
            −
          </button>
          <span className="font-dm text-sm text-driftwood w-4 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
            className="w-6 h-6 rounded-full border border-sand-dark text-driftwood-mid text-sm flex items-center justify-center hover:border-ocean hover:text-ocean transition-all duration-300"
          >
            +
          </button>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.id, item.size)}
        className="flex-shrink-0 text-driftwood-mid hover:text-coral transition-all duration-300 self-start mt-0.5"
        aria-label="Remove item"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </div>
  )
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal } = useCart()
  const [checkoutClicked, setCheckoutClicked] = useState(false)

  const handleCheckout = () => {
    setCheckoutClicked(true)
    setTimeout(() => setCheckoutClicked(false), 4000)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-driftwood/40 transition-opacity duration-300"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`cart-drawer fixed top-0 right-0 h-full z-50 w-80 md:w-96 bg-sand flex flex-col shadow-xl ${
          isOpen ? 'open' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand-dark">
          <h2 className="font-syne font-bold text-lg text-driftwood">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-driftwood-mid hover:text-driftwood transition-all duration-300"
            aria-label="Close cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <span className="text-5xl mb-4">🌊</span>
              <p className="font-syne font-bold text-driftwood mb-2">Your cart is empty.</p>
              <Link
                to="/shop"
                onClick={closeCart}
                className="font-dm text-sm text-ocean hover:text-ocean-dark transition-all duration-300"
              >
                Continue shopping →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-sand-dark">
              {items.map((item) => (
                <CartItem key={`${item.id}-${item.size}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sand-dark px-6 py-5">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-1">
              <span className="font-dm text-sm text-driftwood-mid">Subtotal</span>
              <span className="font-syne font-bold text-driftwood">${subtotal}</span>
            </div>
            <p className="font-dm text-xs text-driftwood-mid mb-4">
              Shipping calculated at checkout.
            </p>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-ocean hover:bg-ocean-dark text-white font-syne font-bold py-3 rounded-full transition-all duration-300"
            >
              Proceed to Checkout
            </button>

            {checkoutClicked && (
              <p className="text-coral text-xs font-dm text-center mt-2">
                This is a demo store. No real checkout exists.
              </p>
            )}

            <div className="text-center mt-3">
              <button
                onClick={closeCart}
                className="font-dm text-sm text-driftwood-mid hover:text-ocean transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
