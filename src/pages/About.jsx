import { Link } from 'react-router-dom'

const values = [
  {
    title: 'Made Coastal',
    description:
      "Every product we make is designed with the Carolina coast in mind. The colors are pulled from the water. The textures come from the dunes. We don't make generic merch — we make coastal goods.",
  },
  {
    title: 'Sustainably Sourced',
    description:
      'Organic cotton where possible. Recycled materials when we can. We\'re a small brand and we\'re still figuring it out — but we\'re committed to doing it right, not just saying so.',
  },
  {
    title: 'Community First',
    description:
      '10% of all Art & Prints profits go directly to Cape Fear River Watch, the nonprofit keeping our watershed clean. Because we can\'t sell coastal goods if there\'s no coast left.',
  },
]

const team = [
  { name: 'Jake T.', role: 'Co-Founder & Designer', emoji: '🧑‍🎨' },
  { name: 'Mia R.', role: 'Operations & Fulfillment', emoji: '👩‍💼' },
]

export default function About() {
  return (
    <div className="bg-sand">
      {/* Hero */}
      <section className="bg-ocean py-28 pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-syne font-extrabold text-6xl text-white tracking-tight mb-4">
            Born on the Coast.
          </h1>
          <p className="font-dm font-light text-white/70 text-xl max-w-xl">
            A small brand with big opinions about salt air, slow mornings, and good design.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Story Image */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-sm relative">
              <img
                src="/Saltline-Co/images/surfer.svg"
                alt="Surfer on the Carolina coast"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-driftwood/60 backdrop-blur-sm px-5 py-3">
                <p className="font-dm italic text-white/80 text-sm">Early days — Soda Pop District, 2018</p>
              </div>
            </div>

            {/* Story Text */}
            <div>
              <p className="font-dm font-light text-driftwood-mid text-lg leading-relaxed mb-5">
                Saltline Co. started in 2018 in a garage on the edge of Wilmington's Soda Pop District. Just a press, a squeegee, and too many shirts for the local surf circuit. We weren't trying to build a brand — we were just trying to make something good.
              </p>
              <p className="font-dm font-light text-driftwood-mid text-lg leading-relaxed mb-5">
                We grew through farmers markets, pop-ups on the waterfront, and a lot of word-of-mouth. People kept asking where they could get the shirts, so we built a site. People kept asking about drinkware, so we added it. We followed the demand and stayed close to home.
              </p>
              <p className="font-dm font-light text-driftwood-mid text-lg leading-relaxed">
                Now we ship nationwide, but everything is still designed and packed right here in Wilmington. The zip codes change. The vibe doesn't.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-syne font-bold text-4xl text-driftwood tracking-tight mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-8 border-t-4 border-ocean shadow-sm">
                <h3 className="font-syne font-bold text-xl text-driftwood mb-4">{value.title}</h3>
                <p className="font-dm font-light text-driftwood-mid leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-dm text-sm text-driftwood-mid mb-8 text-center">
            A small team doing big things out of Wilmington, NC.
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 bg-sand-dark rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                  {member.emoji}
                </div>
                <p className="font-syne font-bold text-driftwood">{member.name}</p>
                <p className="font-dm text-sm text-driftwood-mid">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ocean py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-syne font-bold text-4xl text-white mb-8">
            Ready to Wear the Coast?
          </h2>
          <Link
            to="/shop"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-ocean font-syne font-bold px-10 py-4 rounded-full transition-all duration-300"
          >
            Shop Now →
          </Link>
        </div>
      </section>
    </div>
  )
}
