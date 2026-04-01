import { createContext, useContext, useEffect, useReducer } from 'react'

export const CartContext = createContext(null)

const STORAGE_KEY = 'saltline_cart_items'

function loadItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const initialState = {
  items: loadItems(),
  isOpen: false,
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id, name, price, emoji, size, quantity = 1 } = action.payload
      const existing = state.items.find(
        (item) => item.id === id && item.size === size
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { id, name, price, emoji, size, quantity }],
      }
    }

    case 'REMOVE_ITEM': {
      const { id, size } = action.payload
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.id === id && item.size === size)
        ),
      }
    }

    case 'UPDATE_QUANTITY': {
      const { id, size, quantity } = action.payload
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity }
            : item
        ),
      }
    }

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }

    case 'CLOSE_CART':
      return { ...state, isOpen: false }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // storage quota exceeded or unavailable — fail silently
    }
  }, [state.items])

  const addItem = (payload) => dispatch({ type: 'ADD_ITEM', payload })
  const removeItem = (id, size) => dispatch({ type: 'REMOVE_ITEM', payload: { id, size } })
  const updateQuantity = (id, size, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } })
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' })
  const closeCart = () => dispatch({ type: 'CLOSE_CART' })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = state.items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        toggleCart,
        closeCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
