import { useEffect, useState } from "react";
import { searchProducts } from "../services/productService";

import {
  Search,
  Mic,
  Store,
  ChevronDown,
  QrCode,
  CircleCheck,
  MapPin,
  ArrowRight,
  Map,
  Home as HomeIcon,
  List,
  Navigation,
  Menu,
  X,
} from "lucide-react";

const demoProducts = [
  {
    id: 1,
    name: "2% Milk - 4L",
    category: "Milk",
    price: "$6.49",
    location: "Aisle 7 • Dairy • Shelf 2",
    emoji: "🥛",
  },
  {
    id: 2,
    name: "Large Eggs - 12 Pack",
    category: "Eggs",
    price: "$4.99",
    location: "Aisle 6 • Dairy • Shelf 1",
    emoji: "🥚",
  },
  {
    id: 3,
    name: "Fresh White Bread",
    category: "Bread",
    price: "$3.49",
    location: "Aisle 2 • Bakery • Shelf 3",
    emoji: "🥖",
  },
  {
    id: 4,
    name: "Coca-Cola 2L",
    category: "Drinks",
    price: "$2.99",
    location: "Aisle 9 • Drinks • Shelf 4",
    emoji: "🥤",
  },
];

const popular = [
  { name: "Milk", emoji: "🥛" },
  { name: "Bread", emoji: "🥖" },
  { name: "Drinks", emoji: "🥤" },
];

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(demoProducts[0]);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [navigationStarted, setNavigationStarted] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getProductEmoji = (category) => {
    switch (category?.toLowerCase()) {
      case "dairy":
        return "🥛";

      case "bakery":
        return "🥖";

      case "produce":
        return "🍎";

      case "beverages":
      case "drinks":
        return "🥤";

      case "meat":
        return "🥩";

      case "seafood":
        return "🐟";

      case "frozen":
        return "❄️";

      case "snacks":
        return "🍪";

      case "household":
        return "🧼";

      case "personal care":
        return "🧴";

      case "baby":
        return "👶";

      case "pet":
        return "🐶";

      case "pharmacy":
        return "💊";

      case "international":
        return "🌍";

      default:
        return "🛒";
    }
  };

  const selectPopular = (category) => {
    setSearch(category);
  };

  const startNavigation = () => {
    setNavigationStarted(true);

    document
      .getElementById("store-map")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const guideToProduct = (product) => {
    setSelectedProduct({
      id: product.id,
      name: product.name,
      category: product.category,
      price:
        product.price !== null
          ? `$${Number(product.price).toFixed(2)}`
          : "Price unavailable",
      location: `Aisle ${product.aisle} • ${product.section} • Shelf ${product.shelf}`,
      emoji: getProductEmoji(product.category),
    });

    setNavigationStarted(true);

    setTimeout(() => {
      document
        .getElementById("store-map")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  useEffect(() => {
    const loadProducts = async () => {
      if (search.trim() === "") {
        setSearchResults([]);
        setError("");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await searchProducts(search.trim());

        setSearchResults(data);
      } catch (error) {
        console.error(error);
        setError("Unable to search products.");
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(() => {
      loadProducts();
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <button className="flex items-center gap-2 transition hover:scale-[1.02]">

            <div className="relative flex h-10 w-8 items-center justify-center">
              <div className="absolute h-8 w-8 rotate-45 rounded-[10px] bg-blue-600" />
              <div className="absolute h-5 w-5 rounded-full bg-white" />
              <div className="absolute h-2.5 w-2.5 rounded-full bg-green-500" />
            </div>

            <span className="text-3xl font-bold tracking-tight text-blue-600">
              Spotly
            </span>

          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">

            <button
              onClick={() => window.scrollTo({
                top: 0,
                behavior: "smooth",
              })}
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              Home
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("search-section")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              Search
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("store-map")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              Store Map
            </button>

            <button className="font-medium text-slate-600 transition hover:text-blue-600">
              My List
            </button>

          </nav>

          {/* STORE */}
          <div className="hidden sm:block">
            <button className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2.5 font-semibold transition duration-200 hover:bg-blue-100 active:scale-95">

              <Store
                size={19}
                className="text-blue-600"
              />

              FreshMart Grocery

              <ChevronDown size={17} />

            </button>
          </div>

          {/* MOBILE MENU */}
          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="rounded-lg p-2 transition hover:bg-slate-100 active:scale-90 md:hidden"
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>

        </div>

        {mobileMenu && (
          <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">

            <div className="flex flex-col gap-4">

              <button
                onClick={() => {
                  setMobileMenu(false);

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="text-left font-medium"
              >
                Home
              </button>

              <button
                onClick={() => {
                  setMobileMenu(false);

                  document
                    .getElementById("search-section")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="text-left font-medium"
              >
                Search
              </button>

              <button
                onClick={() => {
                  setMobileMenu(false);

                  document
                    .getElementById("store-map")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
                className="text-left font-medium"
              >
                Store Map
              </button>

              <button className="text-left font-medium">
                My List
              </button>

            </div>

          </div>
        )}

      </header>

      <main>

        {/* HERO */}
        <section className="mx-auto max-w-7xl px-5 pb-8 pt-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-16">

          <div className="grid items-start gap-10 lg:grid-cols-2">

            {/* LEFT */}
            <div>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                <QrCode size={16} />
                Entrance QR detected
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">

                Find what you need

                <br />

                in{" "}
                <span className="text-green-500">
                  seconds.
                </span>

              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Search for any product and Spotly will guide you directly
                to its location inside the store.
              </p>

              {/* SEARCH BAR */}
              <div
                id="search-section"
                className="mt-8 flex max-w-2xl items-center rounded-2xl border border-blue-200 bg-white px-5 shadow-[0_8px_30px_rgba(37,99,235,0.10)] transition duration-300 focus-within:border-blue-500 focus-within:shadow-[0_10px_35px_rgba(37,99,235,0.18)] hover:shadow-lg"
              >

                <Search
                  size={28}
                  className="shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search for milk, eggs, bread..."
                  className="h-[72px] w-full bg-transparent px-4 text-base outline-none placeholder:text-slate-400"
                />

                {search && (
                  <button
                    onClick={() =>
                      setSearch("")
                    }
                    className="mr-1 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 active:scale-90"
                  >
                    <X size={20} />
                  </button>
                )}

                <button className="rounded-full p-2 text-blue-600 transition hover:bg-blue-50 active:scale-90">
                  <Mic size={27} />
                </button>

              </div>

              {/* LOADING */}
              {loading && (
                <div className="mt-5 flex items-center gap-2 text-slate-500">

                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />

                  Searching products...

                </div>
              )}

              {/* ERROR */}
              {!loading && error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
                  {error}
                </div>
              )}

              {/* SEARCH RESULTS */}
              {!loading &&
                !error &&
                search &&
                searchResults.length > 0 && (
                  <div className="mt-6">

                    <div className="mb-4 flex items-center justify-between">

                      <h2 className="text-xl font-bold">
                        Search results
                      </h2>

                      <span className="text-sm text-slate-500">
                        {searchResults.length} found
                      </span>

                    </div>

                    <div className="max-h-[520px] space-y-3 overflow-y-auto pr-2">

                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                        >

                          <div className="flex gap-4">

                            {/* ICON */}
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-50 transition group-hover:bg-blue-50">

                              <span className="text-4xl">
                                {getProductEmoji(
                                  product.category
                                )}
                              </span>

                            </div>

                            {/* PRODUCT */}
                            <div className="min-w-0 flex-1">

                              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                                {product.brand}
                              </p>

                              <h3 className="mt-1 font-bold text-slate-900">
                                {product.name}
                              </h3>

                              {product.size && (
                                <p className="mt-1 text-sm text-slate-500">
                                  {product.size}
                                </p>
                              )}

                              <div className="mt-2 flex flex-wrap items-center gap-3">

                                {product.price !== null && (
                                  <p className="text-lg font-bold">
                                    $
                                    {Number(
                                      product.price
                                    ).toFixed(2)}
                                  </p>
                                )}

                                {product.stock > 0 ? (
                                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                                    In stock
                                  </span>
                                ) : (
                                  <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                                    Out of stock
                                  </span>
                                )}

                              </div>

                              <div className="mt-2 flex items-start gap-1.5 text-sm text-slate-500">

                                <MapPin
                                  size={16}
                                  className="mt-0.5 shrink-0 text-blue-600"
                                />

                                <span>
                                  Aisle {product.aisle}
                                  {" • "}
                                  {product.section}
                                  {" • "}
                                  Shelf {product.shelf}
                                </span>

                              </div>

                            </div>

                          </div>

                          <button
                            onClick={() =>
                              guideToProduct(product)
                            }
                            disabled={product.stock <= 0}
                            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition duration-200 ${
                              product.stock > 0
                                ? "bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
                                : "cursor-not-allowed bg-slate-200 text-slate-400"
                            }`}
                          >
                            Guide Me
                            <ArrowRight size={18} />
                          </button>

                        </div>
                      ))}

                    </div>

                  </div>
                )}

              {/* NOTHING FOUND */}
              {!loading &&
                !error &&
                search &&
                searchResults.length === 0 && (
                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center">

                    <div className="text-4xl">
                      🔍
                    </div>

                    <h3 className="mt-3 font-bold">
                      No products found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Try searching for something else.
                    </p>

                  </div>
                )}

              {/* POPULAR */}
              <div className="mt-6">

                <p className="mb-3 font-semibold">
                  Popular searches
                </p>

                <div className="flex flex-wrap gap-2">

                  {popular.map((item) => (
                    <button
                      key={item.name}
                      onClick={() =>
                        selectPopular(item.name)
                      }
                      className={`flex items-center gap-2 rounded-full border px-4 py-2.5 transition duration-200 hover:-translate-y-0.5 active:scale-95 ${
                        search.toLowerCase() ===
                        item.name.toLowerCase()
                          ? "border-blue-300 bg-blue-50 text-blue-600"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >

                      <span>
                        {item.emoji}
                      </span>

                      {item.name}

                    </button>
                  ))}

                </div>

              </div>

            </div>

            {/* RIGHT HERO */}
            <div className="hidden justify-center lg:flex">

              <div className="relative flex h-[430px] w-[430px] items-center justify-center rounded-full bg-blue-50">

                <div className="absolute h-[340px] w-[340px] rounded-full bg-blue-100/40" />

                <div className="relative text-center">

                  <div className="text-[150px]">
                    🛒
                  </div>

                  <div className="absolute -left-6 top-3 text-7xl">
                    🥛
                  </div>

                  <div className="absolute -right-4 top-8 rotate-12 text-7xl">
                    🥖
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CURRENT LOCATION */}
        <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="flex items-center rounded-2xl border border-green-200 bg-green-50 px-5 py-4 transition duration-300 hover:shadow-md">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white">
              <QrCode size={27} />
            </div>

            <div className="ml-4 flex-1">

              <h3 className="font-bold text-green-700">
                Start Point
              </h3>

              <p className="text-slate-700">
                Entrance QR detected
              </p>

            </div>

            <CircleCheck
              size={35}
              className="fill-green-600 text-white"
            />

          </div>

        </section>

        {/* PRODUCT + MAP */}
        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">

          {/* SELECTED PRODUCT */}
          <div>

            <h2 className="mb-4 text-2xl font-bold">
              Product found
            </h2>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="flex flex-col gap-5 sm:flex-row lg:flex-col xl:flex-row">

                <div className="flex h-40 w-full items-center justify-center rounded-2xl bg-slate-50 sm:w-40 lg:w-full xl:w-40">

                  <span className="text-[90px]">
                    {selectedProduct.emoji}
                  </span>

                </div>

                <div className="flex-1">

                  <h3 className="text-2xl font-bold">
                    {selectedProduct.name}
                  </h3>

                  <p className="mt-1 text-3xl font-bold">
                    {selectedProduct.price}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700">

                    <span className="h-3 w-3 rounded-full bg-green-500" />

                    In stock

                  </div>

                  <div className="mt-4 flex items-start gap-2 text-slate-500">

                    <MapPin
                      size={20}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    {selectedProduct.location}

                  </div>

                  <button
                    onClick={startNavigation}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
                  >
                    Guide Me
                    <ArrowRight size={19} />
                  </button>

                </div>

              </div>

            </div>

            {/* QUICK INFO */}
            <div className="mt-6 grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                <p className="text-sm text-slate-500">
                  Estimated walk
                </p>

                <p className="mt-1 text-xl font-bold">
                  1 min
                </p>

              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                <p className="text-sm text-slate-500">
                  Distance
                </p>

                <p className="mt-1 text-xl font-bold">
                  48 m
                </p>

              </div>

            </div>

          </div>

          {/* STORE MAP */}
          <div id="store-map">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                Store map
              </h2>

              {navigationStarted && (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                  Navigation started
                </span>
              )}

            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="relative min-h-[420px] overflow-hidden rounded-2xl bg-slate-50">

                {/* PRODUCE */}
                <div className="absolute left-4 top-6 flex h-[320px] w-[100px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <span className="text-sm font-medium">
                    Produce
                  </span>

                  <span className="mt-4 text-3xl">
                    🍏
                  </span>

                </div>

                {/* BAKERY */}
                <div className="absolute right-4 top-6 flex h-[320px] w-[100px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <span className="text-sm font-medium">
                    Bakery
                  </span>

                  <span className="mt-4 text-3xl">
                    🥖
                  </span>

                </div>

                {/* AISLES */}
                <div className="absolute bottom-20 left-[135px] right-[135px] top-7 grid grid-cols-5 gap-4">

                  {[1, 2, 3, 4, 5].map((aisle) => (
                    <div
                      key={aisle}
                      className="space-y-3"
                    >

                      {[1, 2, 3, 4, 5, 6, 7].map(
                        (shelf) => (
                          <div
                            key={shelf}
                            className="h-5 rounded bg-blue-100 transition hover:bg-blue-200"
                          />
                        )
                      )}

                    </div>
                  ))}

                </div>

                {/* ROUTE */}
                {navigationStarted && (
                  <>

                    <div className="absolute bottom-[75px] left-1/2 h-[110px] border-l-4 border-dashed border-blue-600" />

                    <div className="absolute bottom-[181px] left-1/2 w-[150px] border-t-4 border-dashed border-blue-600" />

                    <div className="absolute bottom-[170px] left-[calc(50%+140px)]">

                      <MapPin
                        size={40}
                        className="fill-blue-600 text-blue-600"
                      />

                    </div>

                  </>
                )}

                {/* YOU */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">

                  <div className="mx-auto h-5 w-5 rounded-full border-4 border-white bg-blue-600 shadow-lg" />

                  <span className="mt-1 block rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
                    You are here
                  </span>

                </div>

              </div>

              <button
                onClick={startNavigation}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-blue-600 py-3.5 font-semibold text-blue-600 transition duration-200 hover:bg-blue-600 hover:text-white active:scale-[0.98]"
              >
                <Map size={22} />
                Browse Store Map
              </button>

            </div>

          </div>

        </section>

        {/* HOW IT WORKS */}
        <section className="bg-white py-16">

          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

            <div className="text-center">

              <h2 className="text-3xl font-bold">
                How Spotly works
              </h2>

              <p className="mt-3 text-slate-500">
                No download. No account. Just scan and find.
              </p>

            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">

              {[
                {
                  icon: "📱",
                  title: "1. Scan",
                  text: "Scan the Spotly QR code when you enter the store.",
                },
                {
                  icon: "🔎",
                  title: "2. Search",
                  text: "Search for the product you are trying to find.",
                },
                {
                  icon: "📍",
                  title: "3. Follow",
                  text: "Follow the store map directly to the product.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-100 bg-slate-50 p-7 text-center transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-xl"
                >

                  <div className="text-5xl">
                    {item.icon}
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-500">
                    {item.text}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </section>

      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4 border-t border-slate-200 bg-white px-3 pb-3 pt-3 shadow-[0_-5px_20px_rgba(15,23,42,0.05)] md:hidden">

        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="flex flex-col items-center gap-1 rounded-xl py-1 text-blue-600 transition active:scale-90"
        >

          <HomeIcon size={24} />

          <span className="text-xs">
            Home
          </span>

        </button>

        <button
          onClick={() =>
            document
              .getElementById("search-section")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
          className="flex flex-col items-center gap-1 rounded-xl py-1 text-slate-600 transition hover:text-blue-600 active:scale-90"
        >

          <Search size={24} />

          <span className="text-xs">
            Search
          </span>

        </button>

        <button
          onClick={() =>
            document
              .getElementById("store-map")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
          className="flex flex-col items-center gap-1 rounded-xl py-1 text-slate-600 transition hover:text-blue-600 active:scale-90"
        >

          <Navigation size={24} />

          <span className="text-xs">
            Map
          </span>

        </button>

        <button className="flex flex-col items-center gap-1 rounded-xl py-1 text-slate-600 transition hover:text-blue-600 active:scale-90">

          <List size={24} />

          <span className="text-xs">
            List
          </span>

        </button>

      </nav>

      <div className="h-20 md:hidden" />

    </div>
  );
};

export default Home;