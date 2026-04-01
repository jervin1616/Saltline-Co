import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Contact() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    orderNumber: '',
    topic: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('access_key', 'REPLACE_WITH_WEB3FORMS_KEY')
    data.append('subject', 'New Message — Saltline Co.')
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('order_number', form.orderNumber)
    data.append('topic', form.topic)
    data.append('message', form.message)

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
    } catch {
      // silently fail for demo
    }

    navigate('/thanks')
  }

  const inputClass =
    'w-full bg-sand-dark text-driftwood font-dm rounded-lg border border-sand-dark focus:border-ocean focus:outline-none px-4 py-3 transition-all duration-300 placeholder:text-driftwood-mid/50'
  const labelClass = 'block font-dm text-sm font-medium text-driftwood mb-2'

  return (
    <div className="bg-sand min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12">
          <h1 className="font-syne font-extrabold text-5xl tracking-tight text-driftwood mb-3">
            Say Hello.
          </h1>
          <p className="font-dm font-light text-driftwood-mid text-lg">
            We're a small team — but we reply fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Order Number <span className="text-driftwood-mid font-normal">(optional)</span></label>
                <input
                  type="text"
                  name="orderNumber"
                  value={form.orderNumber}
                  onChange={handleChange}
                  placeholder="Have a question about an order?"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Topic *</label>
                <select
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select a topic</option>
                  <option value="General Question">General Question</option>
                  <option value="Order Issue">Order Issue</option>
                  <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                  <option value="Press & Collaboration">Press & Collaboration</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="What's on your mind?"
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-ocean hover:bg-ocean-dark text-white font-syne font-bold py-4 rounded-full transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div>
              <p className="font-syne font-bold text-driftwood mb-2">Email</p>
              <a
                href="mailto:hello@saltlineco.com"
                className="font-dm text-ocean hover:text-ocean-dark transition-all duration-300"
              >
                hello@saltlineco.com
              </a>
            </div>

            <div>
              <p className="font-syne font-bold text-driftwood mb-2">Instagram</p>
              <a
                href="https://instagram.com/saltlineco"
                target="_blank"
                rel="noopener noreferrer"
                className="font-dm text-ocean hover:text-ocean-dark transition-all duration-300"
              >
                @saltlineco
              </a>
            </div>

            <div>
              <p className="font-syne font-bold text-driftwood mb-2">Ships From</p>
              <p className="font-dm text-driftwood-mid">Wilmington, NC</p>
              <p className="font-dm text-driftwood-mid">Ships nationwide</p>
            </div>

            <div>
              <p className="font-syne font-bold text-driftwood mb-2">Processing Time</p>
              <p className="font-dm text-driftwood-mid">
                Orders ship within 2–3 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
