import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const CATEGORIES = ['All', 'Apparel', 'Accessories', 'Drinkware', 'Art & Prints']
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low–High' },
  { value: 'price-desc', label: 'Price: High–Low' },
  { value: 'newest', label: 'Newest' },
]

export default function Shop() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [activeCategory, setActiveCategory] = useState(
    categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : 'All'
  )
  const [sort, setSort] = useState('featured')

  useEffect(() => {
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])

  const filtered = products.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'newest') return b.id - a.id
    // featured: featured items first, then by id
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.id - b.id
  })

  return (
    <div>
      {/* Hero */}
      <section className="bg-sand-dark pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-syne font-extrabold text-5xl tracking-tight text-driftwood mb-3">
            The Shop.
          </h1>
          <p className="font-dm font-light text-driftwood-mid text-lg">
            Coastal goods for people who live near the water — or wish they did.
          </p>
        </div>
      </section>

      {/* Filter + Sort Bar */}
      <section className="bg-sand sticky top-[88px] z-30 border-b border-sand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 text-sm font-dm font-medium px-4 py-1.5 rounded-full border transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-ocean border-ocean text-white'
                      : 'border-sand-dark text-driftwood hover:border-ocean hover:text-ocean bg-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="flex-shrink-0 text-sm font-dm text-driftwood bg-sand border border-sand-dark rounded-lg px-3 py-1.5 focus:outline-none focus:border-ocean transition-all duration-300"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <p className="font-dm text-xs text-driftwood-mid mt-2">
            Showing {sorted.length} product{sorted.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-sand py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} showQuickAdd={true} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
