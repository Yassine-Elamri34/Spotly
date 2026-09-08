import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  Database,
  MapPin,
  Navigation,
  QrCode,
  Search,
  Smartphone,
  Sparkles,
  Store,
  Zap,
} from "lucide-react";

import demoVideo from "../assets/demovideo.mp4";

const About = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8fafc] text-slate-900">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 transition duration-300 hover:scale-[1.03]"
          >

            <div className="relative flex h-10 w-8 items-center justify-center">
              <div className="absolute h-8 w-8 rotate-45 rounded-[10px] bg-blue-600" />
              <div className="absolute h-5 w-5 rounded-full bg-white" />
              <div className="absolute h-2.5 w-2.5 rounded-full bg-green-500" />
            </div>

            <span className="text-3xl font-bold tracking-tight text-blue-600">
              Spotly
            </span>

          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 hover:shadow-md"
          >
            <ArrowLeft size={17} />
            Back to Spotly
          </Link>

        </div>

      </header>

      <main>

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="relative">

          {/* DECORATIVE GRADIENT */}
          <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-blue-200/30 blur-[120px]" />

          <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-green-200/30 blur-[120px]" />

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">

            {/* LEFT */}
            <div
              className={`relative z-10 transition-all duration-1000 ${
                loaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >

              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">

                <Sparkles size={16} />

                Smart in-store navigation

              </div>

              <h1 className="mt-7 max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">

                Find it.

                <br />

                Walk to it.

                <br />

                <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                  Done.
                </span>

              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                Spotly is a smart retail navigation platform that helps
                customers find products inside stores quickly, without
                downloading an app or asking an employee for directions.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium shadow-sm ring-1 ring-slate-200">

                  <Check
                    size={17}
                    className="text-green-500"
                  />

                  No app required

                </div>

                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium shadow-sm ring-1 ring-slate-200">

                  <Check
                    size={17}
                    className="text-green-500"
                  />

                  Indoor navigation

                </div>

                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium shadow-sm ring-1 ring-slate-200">

                  <Check
                    size={17}
                    className="text-green-500"
                  />

                  Real product search

                </div>

              </div>

            </div>

            {/* VIDEO */}
            <div
              className={`relative transition-all delay-200 duration-1000 ${
                loaded
                  ? "translate-x-0 opacity-100"
                  : "translate-x-16 opacity-0"
              }`}
            >

              {/* GLOW */}
              <div className="absolute -inset-8 rounded-[60px] bg-gradient-to-br from-blue-200/50 via-transparent to-green-200/50 blur-3xl" />

              <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white p-2 shadow-[0_30px_80px_rgba(15,23,42,0.18)]">

                <div className="relative overflow-hidden rounded-[30px]">

                  <video
                    src={demoVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="h-[520px] w-full object-cover sm:h-[620px]"
                  />

                  {/* DARK GRADIENT */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

                  {/* TOP STATUS */}
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-white/85 px-4 py-2 text-xs font-semibold text-slate-800 shadow-lg backdrop-blur-xl">

                    <span className="relative flex h-2.5 w-2.5">

                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />

                    </span>

                    Spotly active

                  </div>

                  {/* FLOATING NAVIGATION CARD */}
                  <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/20 bg-white/90 p-4 shadow-2xl backdrop-blur-xl sm:left-7 sm:right-auto sm:w-[330px]">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                        <Navigation size={23} />
                      </div>

                      <div className="flex-1">

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Navigation
                        </p>

                        <p className="font-bold">
                          Pasta found
                        </p>

                        <p className="text-sm text-slate-500">
                          Aisle 7 • Shelf 2
                        </p>

                      </div>

                      <ArrowRight
                        size={20}
                        className="text-blue-600"
                      />

                    </div>

                  </div>

                </div>

              </div>

              {/* FLOATING FAST BADGE */}
              <div className="absolute -right-4 top-24 hidden rounded-2xl border border-white bg-white/95 p-4 shadow-xl backdrop-blur sm:block">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <Zap size={21} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Goal
                    </p>

                    <p className="font-bold">
                      Find items faster
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* PROBLEM */}
        {/* ================================================= */}

        <section className="py-20">

          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

            <div className="overflow-hidden rounded-[40px] bg-slate-950 px-7 py-12 text-white sm:px-10 lg:px-16 lg:py-16">

              <div className="grid items-center gap-10 lg:grid-cols-2">

                <div>

                  <span className="text-sm font-semibold uppercase tracking-[3px] text-blue-400">
                    The problem
                  </span>

                  <h2 className="mt-4 text-4xl font-bold leading-tight lg:text-5xl">
                    People waste time looking for things they already know they want.
                  </h2>

                </div>

                <div className="space-y-4">

                  {[
                    "Walking through several aisles looking for one product.",
                    "Trying to understand unclear aisle signs.",
                    "Searching for an employee just to ask where something is.",
                    "Spending more time inside the store than necessary.",
                  ].map((problem) => (
                    <div
                      key={problem}
                      className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:translate-x-2 hover:bg-white/10"
                    >

                      <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500 transition group-hover:scale-150" />

                      <p className="leading-7 text-slate-300">
                        {problem}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* SOLUTION */}
        {/* ================================================= */}

        <section className="py-20">

          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <span className="text-sm font-bold uppercase tracking-[3px] text-green-500">
                One simple flow
              </span>

              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                Scan. Search. Follow.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-500">
                Spotly removes the complicated part of finding products and
                turns it into three simple actions.
              </p>

            </div>

            <div className="relative mt-14">

              {/* CONNECTION LINE */}
              <div className="absolute left-[16%] right-[16%] top-[60px] hidden h-[2px] bg-gradient-to-r from-green-300 via-blue-400 to-blue-300 md:block" />

              <div className="relative grid gap-6 md:grid-cols-3">

                {[
                  {
                    number: "01",
                    icon: QrCode,
                    title: "Scan",
                    text: "Scan the Spotly QR code at the store entrance. Spotly immediately knows your starting point.",
                    color: "green",
                  },
                  {
                    number: "02",
                    icon: Search,
                    title: "Search",
                    text: "Search for milk, pasta, bread, toothpaste or any product available in the store.",
                    color: "blue",
                  },
                  {
                    number: "03",
                    icon: Navigation,
                    title: "Navigate",
                    text: "Follow the visual path through the store directly to the correct department, aisle and shelf.",
                    color: "blue",
                  },
                ].map((step) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.number}
                      className="group relative rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-3 hover:shadow-2xl"
                    >

                      <span className="absolute right-6 top-5 text-5xl font-black text-slate-100 transition duration-500 group-hover:text-blue-50">
                        {step.number}
                      </span>

                      <div
                        className={`relative z-10 flex h-[70px] w-[70px] items-center justify-center rounded-3xl ${
                          step.color === "green"
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <Icon size={30} />
                      </div>

                      <h3 className="mt-7 text-2xl font-bold">
                        {step.title}
                      </h3>

                      <p className="mt-3 leading-7 text-slate-500">
                        {step.text}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* PRODUCT EXPERIENCE */}
        {/* ================================================= */}

        <section className="bg-white py-20">

          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

            <div className="grid items-center gap-14 lg:grid-cols-2">

              <div>

                <span className="text-sm font-bold uppercase tracking-[3px] text-blue-600">
                  Built around speed
                </span>

                <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                  The store becomes searchable.
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
                  Spotly connects the digital product catalog with the
                  physical layout of the store. The customer doesn't only
                  discover whether a product exists — they also know exactly
                  where to walk.
                </p>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                {[
                  {
                    icon: Search,
                    title: "Fast Search",
                    text: "Search the real store product catalog.",
                  },
                  {
                    icon: MapPin,
                    title: "Shelf Location",
                    text: "See the department, aisle and shelf.",
                  },
                  {
                    icon: Navigation,
                    title: "Dynamic Route",
                    text: "Spotly draws a route based on the selected product.",
                  },
                  {
                    icon: Smartphone,
                    title: "Mobile First",
                    text: "Use Spotly instantly through the browser.",
                  },
                ].map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition duration-500 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-xl"
                    >

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm transition duration-300 group-hover:rotate-6 group-hover:scale-110">
                        <Icon size={23} />
                      </div>

                      <h3 className="mt-5 text-lg font-bold">
                        {feature.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {feature.text}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* TECHNOLOGY */}
        {/* ================================================= */}

        <section className="py-20">

          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

            <div className="text-center">

              <span className="text-sm font-bold uppercase tracking-[3px] text-blue-600">
                Behind Spotly
              </span>

              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                Full-stack technology.
              </h2>

            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3">

              <div className="group rounded-[30px] bg-blue-600 p-7 text-white shadow-xl transition duration-500 hover:-translate-y-3">

                <Smartphone size={35} />

                <p className="mt-12 text-sm font-semibold text-blue-200">
                  FRONTEND
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  React
                </h3>

                <p className="mt-3 leading-7 text-blue-100">
                  React, Vite and Tailwind CSS create the fast and responsive
                  customer experience.
                </p>

              </div>

              <div className="group rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-3 hover:shadow-xl">

                <Database
                  size={35}
                  className="text-blue-600"
                />

                <p className="mt-12 text-sm font-semibold text-slate-400">
                  BACKEND
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  ASP.NET + MySQL
                </h3>

                <p className="mt-3 leading-7 text-slate-500">
                  ASP.NET Core connects the frontend with store products,
                  stock, locations and MySQL data.
                </p>

              </div>

              <div className="group rounded-[30px] border border-green-200 bg-green-50 p-7 shadow-sm transition duration-500 hover:-translate-y-3 hover:shadow-xl">

                <Brain
                  size={35}
                  className="text-green-600"
                />

                <p className="mt-12 text-sm font-semibold text-green-600">
                  NEXT
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Artificial Intelligence
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Future AI will understand natural shopping requests instead
                  of relying only on exact product names.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* FUTURE AI */}
        {/* ================================================= */}

        <section className="pb-24">

          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#071b48] via-blue-900 to-blue-600 px-7 py-14 text-white sm:px-10 lg:px-16 lg:py-20">

              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-white/5" />

              <div className="absolute -bottom-32 left-32 h-80 w-80 rounded-full bg-green-400/10 blur-3xl" />

              <div className="relative z-10 max-w-3xl">

                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">

                  <Brain size={17} />

                  The future of Spotly

                </div>

                <h2 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">

                  Eventually, customers won't even need to know what the product is called.

                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">

                  A customer could search:

                  <span className="mx-2 font-semibold text-white">
                    “I need something for sensitive teeth”
                  </span>

                  and Spotly could understand the request, recommend the right
                  product and guide the customer directly to it.

                </p>

                <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur">

                  <Sparkles
                    size={21}
                    className="text-green-300"
                  />

                  <span className="font-medium">
                    Natural-language retail discovery + indoor navigation
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default About;