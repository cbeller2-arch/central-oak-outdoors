import React, { useState } from "react";

const brand = {
  name: "Central Oak Outdoors",
  slogan: "Where Passion Meets Calling",
  email: "centraloakoutdoors@gmail.com",
  location: "Goldsby, Oklahoma",
  instagramHandle: "@centraloakoutdoors",
  instagramUrl: "https://www.instagram.com/centraloakoutdoors/",
  shopUrl: "https://centraloakoutdoors.myshopify.com",
  logo: "/images/logo.png",
};

const photos = {
  hero: "/images/hero-group.jpeg",
  turkeyWater: "/images/turkey-water.jpeg",
  duckTruck: "/images/duck-truck.jpeg",
  waterfowlLog: "/images/waterfowl-log.jpeg",
  youth: "/images/youth-hunt.jpeg",
  youngHunter: "/images/young-hunter.jpeg",
  groupWoods: "/images/group-woods.jpeg",
  oilfieldTurkey: "/images/oilfield-turkey.jpeg",
  groupRam: "/images/group-ram.jpeg",
};

const serveGroups = [
  "Youth",
  "Veterans",
  "Church Groups",
  "Men’s Groups",
  "Anyone Interested in Hunting/Fishing",
  "Hunters Interested in Fully Guided Trips",
];

const galleryImages = [
  {
    src: photos.turkeyWater,
    title: "Turkey Hunts",
    text: "Spring mornings, fellowship, and gratitude in God’s creation.",
  },
  {
    src: photos.duckTruck,
    title: "Duck Hunts",
    text: "Cold mornings, muddy boots, and memories built in the field.",
  },
  {
    src: photos.waterfowlLog,
    title: "Oklahoma Waterfowl",
    text: "A rugged outdoor setting where creation points back to the Creator.",
  },
  {
    src: photos.youth,
    title: "Youth & Mentorship",
    text: "Helping the next generation grow in skill, responsibility, and faith.",
  },
  {
    src: photos.groupWoods,
    title: "Guided Group Experiences",
    text: "Outdoor trips that create space for fellowship, encouragement, and shared purpose.",
  },
  {
    src: photos.oilfieldTurkey,
    title: "Oklahoma Turkey Country",
    text: "Real hunts in real places with Christ at the center.",
  },
  {
    src: photos.youngHunter,
    title: "First Hunts & Field Moments",
    text: "One hunt can open the door to mentorship, confidence, and lasting community.",
  },
  {
    src: photos.groupRam,
    title: "Men’s Groups & Fellowship",
    text: "A place for men, families, churches, and groups to build real community.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Request or Nominate",
    text: "Tell us about yourself, a group, or someone who could benefit from a hunt or fishing trip.",
  },
  {
    step: "02",
    title: "We Connect",
    text: "We talk through details, dates, experience level, and what kind of opportunity fits best.",
  },
  {
    step: "03",
    title: "Hunt with Purpose",
    text: "We spend time outdoors, build community, and keep Christ at the center.",
  },
];

function SectionLabel({ children }) {
  return (
    <p className="mb-3 text-sm font-black uppercase tracking-[0.26em] text-[#b89b72]">
      {children}
    </p>
  );
}

function PrimaryButton({ href, children, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center justify-center rounded-2xl border border-[#a86a2a]/60 bg-gradient-to-r from-[#704418] to-[#a86a2a] px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-black/30 transition hover:translate-y-[-1px] hover:opacity-95"
    >
      {children}
    </a>
  );
}

function SecondaryButton({ href, children, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center justify-center rounded-2xl border border-[#5a4632] bg-black/35 px-7 py-4 text-sm font-black uppercase tracking-wide text-[#f3f1ec] transition hover:bg-black/55"
    >
      {children}
    </a>
  );
}

function StatCard({ title, text }) {
  return (
    <div className="rounded-[1.75rem] border border-[#2b241b] bg-[#171b14] p-7 shadow-xl shadow-black/25">
      <h3 className="text-2xl font-black text-[#f3f1ec]">{title}</h3>
      <p className="mt-3 leading-7 text-[#d7d0c5]">{text}</p>
    </div>
  );
}

function PhotoCard({ image }) {
  return (
    <div className="group overflow-hidden rounded-[2rem] border border-[#2b241b] bg-[#171b14] shadow-xl shadow-black/30">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image.src}
          alt={image.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-black text-[#f3f1ec]">{image.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#d7d0c5]">{image.text}</p>
      </div>
    </div>
  );
}

export function validateCentralOakContent() {
  return Boolean(
    brand.name &&
      brand.slogan &&
      brand.email &&
      brand.location &&
      brand.instagramUrl &&
      brand.shopUrl &&
      galleryImages.length >= 6 &&
      serveGroups.length >= 4
  );
}

export default function App() {
  const formspreeEndpoint = "https://formspree.io/f/xjgjdero";
  const [formStatus, setFormStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");

  async function handleFormSubmit(event) {
    event.preventDefault();
    setFormStatus("submitting");
    setFormMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        setFormStatus("success");
        setFormMessage("Your request was sent. We will follow up as soon as we can.");
        return;
      }

      const data = await response.json().catch(() => null);
      const errorMessage = data?.errors?.map((error) => error.message).join(" ");
      setFormStatus("error");
      setFormMessage(errorMessage || "Something went wrong. Please email centraloakoutdoors@gmail.com directly.");
    } catch (error) {
      setFormStatus("error");
      setFormMessage("The form could not be submitted. Please email centraloakoutdoors@gmail.com directly.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0d100b] text-[#f3f1ec] selection:bg-[#a86a2a] selection:text-white">
      <header className="sticky top-0 z-50 border-b border-[#2b241b] bg-[#0d100b]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-4" aria-label="Central Oak Outdoors home">
            <img src={brand.logo} alt="Central Oak Outdoors logo" className="h-12 w-auto rounded-sm" />
          </a>

          <nav className="hidden gap-6 text-sm font-bold uppercase tracking-wide text-[#d7d0c5] md:flex">
            <a href="#mission" className="hover:text-[#b89b72]">Mission</a>
            <a href="#how-it-works" className="hover:text-[#b89b72]">How It Works</a>
            <a href="#serve" className="hover:text-[#b89b72]">Who We Serve</a>
            <a href="#gallery" className="hover:text-[#b89b72]">Gallery</a>
            <a href="#shop" className="hover:text-[#b89b72]">Shop</a>
            <a href="#contact" className="hover:text-[#b89b72]">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="top" className="relative min-h-[88vh] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${photos.hero}')` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d100b] via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(30deg,#d6a354_12%,transparent_12.5%,transparent_87%,#d6a354_87.5%,#d6a354),linear-gradient(150deg,#d6a354_12%,transparent_12.5%,transparent_87%,#d6a354_87.5%,#d6a354)] [background-size:34px_58px]" />

          <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 py-24">
            <div className="max-w-3xl">
              <p className="mb-4 inline-block rounded-full border border-[#5a4632] bg-black/35 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#b89b72]">
                Christ-Centered Hunting Ministry
              </p>

              <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                A hunting ministry rooted in Christ, community, and creation.
              </h1>

              <p className="mt-5 inline-block rounded-lg border border-[#5a4632] bg-[#1a1d16]/75 px-4 py-2 text-lg font-black uppercase tracking-[0.2em] text-[#d6c3a1]">
                {brand.slogan}
              </p>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d7d0c5]">
                Central Oak Outdoors exists to bring people into the outdoors, build godly community,
                and point hearts back to Jesus through duck hunts, turkey hunts, deer hunts, fishing trips, and time in His creation.
              </p>

              <blockquote className="mt-6 max-w-2xl border-l-4 border-[#a86a2a] bg-black/30 px-5 py-4 text-[#d7d0c5] shadow-lg shadow-black/25">
                “The heavens declare the glory of God; the skies proclaim the work of his hands.”
                <span className="mt-2 block text-sm font-black uppercase tracking-[0.2em] text-[#d6c3a1]">
                  Psalm 19:1
                </span>
              </blockquote>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <PrimaryButton href="#contact">Request a Hunt or Trip</PrimaryButton>
                <SecondaryButton href={brand.shopUrl} external>Shop Gear</SecondaryButton>
              </div>
            </div>
          </div>
        </section>

        <section id="mission" className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-3">
            <StatCard
              title="Our Mission"
              text="To use hunting and the outdoors as a place for Christ-centered ministry, fellowship, mentorship, and gratitude for the Creator."
            />
            <StatCard
              title="What We Do"
              text="We help take people duck hunting, turkey hunting, deer hunting where available, and fishing, creating space for real connection, encouragement, and conversations that matter."
            />
            <StatCard
              title="How Gear Helps"
              text="T-shirt, hat, and hoodie sales help support fuel, gear, supplies, outreach opportunities, and the cost of taking people hunting."
            />
          </div>
        </section>

        <section className="border-y border-[#2b241b] bg-[#141812] py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 md:items-center">
            <div>
              <SectionLabel>Why Central Oak Exists</SectionLabel>
              <h2 className="text-4xl font-black leading-tight md:text-5xl">
                Many people will step into a blind before they step into a church.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#d7d0c5]">
                Central Oak Outdoors was created to meet people in the outdoors, build trust,
                share community, and point them toward Jesus. Hunting becomes a doorway for fellowship,
                discipleship, and gratitude.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#2b241b] bg-[#0f120c] p-8 shadow-xl shadow-black/30">
              <SectionLabel>Faith in the Field</SectionLabel>
              <h3 className="text-3xl font-black leading-tight">
                Creation is a testament to the greatness of the Creator.
              </h3>
              <p className="mt-4 leading-8 text-[#d7d0c5]">
                We want to worship Him through spending time with Him in His creation. The field,
                the timber, and the water are places where people can slow down, build relationships,
                and see the goodness of God.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              More than a hunt. Built for the blind, the timber, and the field.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div key={item.step} className="rounded-[1.75rem] border border-[#2b241b] bg-[#171b14] p-7 shadow-xl shadow-black/25">
                <div className="mb-4 text-4xl font-black text-[#a86a2a]">{item.step}</div>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#d7d0c5]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#2b241b] bg-[#141812] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <SectionLabel>Hunt Opportunities</SectionLabel>
              <h2 className="text-4xl font-black leading-tight md:text-5xl">
                Duck. Turkey. Deer where available. Fishing trips. All with purpose.
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-[2rem] border border-[#2b241b] bg-[#171b14] p-8 shadow-xl shadow-black/25">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#b89b72]">Ministry Hunts & Fishing Trips</p>
                <h3 className="mt-3 text-3xl font-black leading-tight">
                  For people who need community, encouragement, and time outdoors.
                </h3>
                <p className="mt-4 leading-8 text-[#d7d0c5]">
                  Ministry opportunities may include duck hunts, turkey hunts, fishing trips, and deer hunt interest where available. These are aimed toward youth, veterans, church groups, men’s groups, and others who could benefit from fellowship, mentorship, and a Christ-centered experience in the outdoors.
                </p>
              </div>

              <div className="rounded-[2rem] border border-[#2b241b] bg-[#171b14] p-8 shadow-xl shadow-black/25">
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#b89b72]">Guided Trip Interest</p>
                <h3 className="mt-3 text-3xl font-black leading-tight">
                  For outdoorsmen interested in a paid guided trip that supports the mission.
                </h3>
                <p className="mt-4 leading-8 text-[#d7d0c5]">
                  Guided trip requests help create sustainability and support the broader ministry. This may include duck, turkey, deer where available, or fishing experiences for people who want a strong outdoor trip while helping fund outreach.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="serve" className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <SectionLabel>Who We Serve</SectionLabel>
            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              Built for men, families, groups, and anyone willing to step into the outdoors.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serveGroups.map((group) => (
              <div key={group} className="rounded-2xl border border-[#2b241b] bg-[#171b14] px-5 py-4 text-lg font-black text-[#f3f1ec] shadow-lg shadow-black/20">
                {group}
              </div>
            ))}
          </div>
        </section>

        <section id="gallery" className="border-y border-[#2b241b] bg-[#141812] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <SectionLabel>Field Photos</SectionLabel>
                <h2 className="text-4xl font-black leading-tight md:text-5xl">
                  Mud on the boots. Birds in the sky. Christ at the center.
                </h2>
              </div>
              <p className="max-w-md leading-7 text-[#d7d0c5]">
                Real hunts. Real people. Real community. These photos tell the story behind Central Oak Outdoors.
              </p>
            </div>

            <div className="mb-6 grid gap-6 md:grid-cols-3">
              <div className="group relative overflow-hidden rounded-[2rem] border border-[#2b241b] bg-[#171b14] shadow-xl shadow-black/30 md:col-span-2">
                <img src={photos.hero} alt="Group of duck hunters standing by the water" className="h-full min-h-[430px] w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-7">
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[#b89b72]">Godly Community</p>
                  <h3 className="mt-2 text-3xl font-black">Built around faith, fellowship, and the field.</h3>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="group relative min-h-[205px] overflow-hidden rounded-[2rem] border border-[#2b241b] bg-[#171b14] shadow-xl shadow-black/30">
                  <img src={photos.turkeyWater} alt="Two hunters with turkeys by the water" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-5">
                    <p className="font-black text-[#f3f1ec]">Turkey Hunts</p>
                  </div>
                </div>
                <div className="group relative min-h-[205px] overflow-hidden rounded-[2rem] border border-[#2b241b] bg-[#171b14] shadow-xl shadow-black/30">
                  <img src={photos.duckTruck} alt="Ducks laid across the hood of a truck" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-5">
                    <p className="font-black text-[#f3f1ec]">Duck Hunts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {galleryImages.slice(2).map((image) => (
                <PhotoCard key={image.title} image={image} />
              ))}
            </div>
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <SectionLabel>Shop the Mission</SectionLabel>
              <h2 className="text-4xl font-black leading-tight md:text-5xl">
                T-shirts, hats, and hoodies built for the field and made to support the mission.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#d7d0c5]">
                Every purchase helps support hunts, outreach, fuel, gear, and the work of Central Oak Outdoors.
              </p>
              <div className="mt-8">
                <PrimaryButton href={brand.shopUrl} external>Shop Central Oak Gear</PrimaryButton>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#2b241b] bg-[#171b14] p-8 shadow-xl shadow-black/30">
              <img src={brand.logo} alt="Central Oak Outdoors logo" className="mb-6 h-20 w-auto rounded-sm" />
              <h3 className="text-3xl font-black">Gear with a purpose.</h3>
              <p className="mt-4 leading-8 text-[#d7d0c5]">
                Central Oak Outdoors gear is more than apparel. It helps tell the story, support the mission,
                and represent a lifestyle built around faith, fellowship, and the outdoors.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-[#2b241b] bg-[#141812] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-start">
              <div>
                <SectionLabel>Request a Hunt or Trip</SectionLabel>
                <h2 className="text-4xl font-black leading-tight md:text-5xl">
                  Tell us what kind of opportunity you are looking for.
                </h2>
                <p className="mt-5 leading-8 text-[#d7d0c5]">
                  Use this form for ministry hunts, fishing trips, deer hunt interest where available, nominating someone in need of an outdoor opportunity,
                  or asking about a paid guided trip that helps support the mission.
                </p>
                <div className="mt-5 rounded-2xl border border-[#5a4632] bg-black/25 p-4 text-sm leading-6 text-[#d7d0c5]">
                  <span className="font-black text-[#f3f1ec]">Safety & Availability Notice:</span> All hunts, fishing trips, and outdoor opportunities are subject to availability, safety requirements, weather conditions, land access, season dates, licensing, and all applicable state and federal regulations.
                </div>

                <div className="mt-6 space-y-3 text-[#d7d0c5]">
                  <p><span className="font-black text-[#f3f1ec]">Email:</span> {brand.email}</p>
                  <p><span className="font-black text-[#f3f1ec]">Instagram:</span> {brand.instagramHandle}</p>
                  <p><span className="font-black text-[#f3f1ec]">Location:</span> {brand.location}</p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#2b241b] bg-[#0f120c] p-6 shadow-xl shadow-black/30">
                <form onSubmit={handleFormSubmit} className="grid gap-4">
                  <input type="hidden" name="_subject" value="New Central Oak Outdoors Request" />
                  <input type="hidden" name="_replyto" value="centraloakoutdoors@gmail.com" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      className="rounded-2xl border border-[#2b241b] bg-[#151913] px-4 py-3 text-[#f3f1ec] outline-none placeholder:text-[#766f66]"
                      placeholder="Name"
                      name="name"
                      required
                    />
                    <input
                      className="rounded-2xl border border-[#2b241b] bg-[#151913] px-4 py-3 text-[#f3f1ec] outline-none placeholder:text-[#766f66]"
                      placeholder="Email"
                      type="email"
                      name="email"
                      required
                    />
                    <input
                      className="rounded-2xl border border-[#2b241b] bg-[#151913] px-4 py-3 text-[#f3f1ec] outline-none placeholder:text-[#766f66]"
                      placeholder="Phone"
                      name="phone"
                    />
                    <select
                      className="rounded-2xl border border-[#2b241b] bg-[#151913] px-4 py-3 text-[#f3f1ec] outline-none"
                      name="request_type"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>Request Type</option>
                      <option value="Ministry Hunt Request">Ministry Hunt Request</option>
                      <option value="Nominate Someone for a Hunt">Nominate Someone for a Hunt</option>
                      <option value="Fully Guided Trip Interest">Fully Guided Trip Interest</option>
                    </select>
                    <select
                      className="rounded-2xl border border-[#2b241b] bg-[#151913] px-4 py-3 text-[#f3f1ec] outline-none"
                      name="opportunity_type"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>Opportunity Type</option>
                      <option value="Duck Hunt">Duck Hunt</option>
                      <option value="Turkey Hunt">Turkey Hunt</option>
                      <option value="Deer Hunt Interest">Deer Hunt Interest</option>
                      <option value="Fishing Trip">Fishing Trip</option>
                      <option value="Either / Not Sure">Either / Not Sure</option>
                    </select>
                    <input
                      className="rounded-2xl border border-[#2b241b] bg-[#151913] px-4 py-3 text-[#f3f1ec] outline-none placeholder:text-[#766f66]"
                      placeholder="Experience Level"
                      name="experience_level"
                    />
                  </div>

                  <input
                    className="rounded-2xl border border-[#2b241b] bg-[#151913] px-4 py-3 text-[#f3f1ec] outline-none placeholder:text-[#766f66]"
                    placeholder="Preferred Dates"
                    name="preferred_dates"
                  />
                  <textarea
                    className="min-h-[140px] rounded-2xl border border-[#2b241b] bg-[#151913] px-4 py-3 text-[#f3f1ec] outline-none placeholder:text-[#766f66]"
                    placeholder="Message / story / details"
                    name="message"
                    required
                  />

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="rounded-2xl border border-[#a86a2a]/60 bg-gradient-to-r from-[#704418] to-[#a86a2a] px-7 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-black/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Send Hunt Request"}
                  </button>

                  {formMessage && (
                    <div
                      className={`rounded-2xl border p-4 text-sm font-bold leading-6 ${
                        formStatus === "success"
                          ? "border-green-800 bg-green-950/40 text-green-200"
                          : "border-red-800 bg-red-950/40 text-red-200"
                      }`}
                    >
                      {formMessage}
                    </div>
                  )}

                  <p className="text-xs leading-5 text-[#a9a195]">
                    This form submits through Formspree to Central Oak Outdoors. Submission does not guarantee a hunt or trip; all opportunities depend on availability, safety, weather, land access, season dates, licensing, and applicable regulations.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#2b241b] bg-[#0a0c08]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
          <div>
            <img src={brand.logo} alt="Central Oak Outdoors logo" className="h-14 w-auto rounded-sm" />
            <p className="mt-3 text-sm text-[#a9a195]">{brand.slogan}</p>
          </div>

          <div className="text-sm leading-7 text-[#a9a195] md:text-right">
            <p>{brand.location}</p>
            <p>{brand.email}</p>
            <a href={brand.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-[#d6c3a1]">
              {brand.instagramHandle}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
