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

    aisle: product.aisle,
    section: product.section,
    shelf: product.shelf,

    location: `Aisle ${product.aisle} • ${product.section} • Shelf ${product.shelf}`,

    emoji: product.emoji || "🛒",
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
const storeAisles = [
  {
    number: 1,
    name: "Pantry",
    emoji: "🍝",
    items: "Rice • Pasta • Sauces",
  },
  {
    number: 2,
    name: "Drinks",
    emoji: "🥤",
    items: "Water • Juice • Soda",
  },
  {
    number: 3,
    name: "Household",
    emoji: "🧼",
    items: "Cleaning • Paper",
  },
  {
    number: 4,
    name: "Pet",
    emoji: "🐶",
    items: "Dog • Cat",
  },
  {
    number: 5,
    name: "Baby",
    emoji: "👶",
    items: "Diapers • Baby Care",
  },
  {
    number: 6,
    name: "Pharmacy",
    emoji: "💊",
    items: "Health • Personal Care",
  },
];

const wallSections = [
  {
    name: "Meat",
    emoji: "🥩",
  },
  {
    name: "Deli",
    emoji: "🧀",
  },
  {
    name: "Dairy",
    emoji: "🥛",
  },
  {
    name: "Prepared Food",
    emoji: "🍱",
  },
];

const mapShelves = [
  {
    aisle: 7,
    name: "Pantry",
    emoji: "🍝",
    items: "Rice • Pasta • Sauces",
    left: 180,
    top: 190,
    width: 190,
  },
  {
    aisle: 8,
    name: "Drinks",
    emoji: "🥤",
    items: "Water • Juice • Soda",
    left: 440,
    top: 190,
    width: 150,
  },
  {
    aisle: 9,
    name: "Personal Care",
    emoji: "🪥",
    items: "Oral • Body • Hygiene",
    left: 180,
    top: 315,
    width: 190,
  },
  {
    aisle: 10,
    name: "Pet",
    emoji: "🐶",
    items: "Dog • Cat • Pet Care",
    left: 440,
    top: 315,
    width: 150,
  },
  {
    aisle: 11,
    name: "Baby",
    emoji: "👶",
    items: "Diapers • Baby Care",
    left: 180,
    top: 440,
    width: 190,
  },
  {
    aisle: 12,
    name: "Pharmacy",
    emoji: "💊",
    items: "Health • Medicine",
    left: 440,
    top: 440,
    width: 150,
  },
];


const getMapLocation = (product) => {
  const text = `
    ${product?.name || ""}
    ${product?.category || ""}
    ${product?.section || ""}
  `.toLowerCase();

  const aisle = String(product?.aisle || "");

  // PRODUCE
  if (
    text.includes("banana") ||
    text.includes("apple") ||
    text.includes("produce") ||
    aisle === "1"
  ) {
    return {
      x: 145,
      y: 275,
      label: "Produce",
      route:
        "380,590 380,530 160,530 160,275 145,275",
    };
  }

  // DELI / CHEESE
  if (
    text.includes("cheese") ||
    text.includes("deli")
  ) {
    return {
      x: 325,
      y: 135,
      label: "Deli",
      route:
        "380,590 380,530 405,530 405,150 325,150 325,135",
    };
  }

  // DAIRY
  if (
    text.includes("milk") ||
    text.includes("egg") ||
    text.includes("dairy") ||
    aisle === "2"
  ) {
    return {
      x: 435,
      y: 135,
      label: "Dairy",
      route:
        "380,590 380,530 405,530 405,150 435,150 435,135",
    };
  }

  // BAKERY
  if (
    text.includes("bread") ||
    text.includes("croissant") ||
    text.includes("bakery") ||
    aisle === "3"
  ) {
    return {
      x: 620,
      y: 270,
      label: "Bakery",
      route:
        "380,590 380,530 610,530 610,270 620,270",
    };
  }

  // MEAT
  if (
    text.includes("chicken") ||
    text.includes("beef") ||
    text.includes("meat") ||
    aisle === "4"
  ) {
    return {
      x: 215,
      y: 135,
      label: "Meat",
      route:
        "380,590 380,530 405,530 405,150 215,150 215,135",
    };
  }

  // FROZEN / SEAFOOD
  if (
    text.includes("pizza") ||
    text.includes("fries") ||
    text.includes("shrimp") ||
    text.includes("seafood") ||
    text.includes("frozen") ||
    aisle === "5" ||
    aisle === "6"
  ) {
    return {
      x: 620,
      y: 470,
      label: "Frozen",
      route:
        "380,590 380,530 610,530 610,470 620,470",
    };
  }

  // PANTRY
  if (
    text.includes("rice") ||
    text.includes("pasta") ||
    text.includes("pantry") ||
    aisle === "7"
  ) {
    return {
      x: 390,
      y: 220,
      label: "Aisle 7",
      route:
        "380,590 380,530 405,530 405,220 390,220",
    };
  }

  // DRINKS
  if (
    text.includes("coffee") ||
    text.includes("tea") ||
    text.includes("drink") ||
    text.includes("beverage") ||
    aisle === "8"
  ) {
    return {
      x: 425,
      y: 220,
      label: "Aisle 8",
      route:
        "380,590 380,530 405,530 405,220 425,220",
    };
  }

  // PERSONAL CARE
  if (
    text.includes("toothpaste") ||
    text.includes("personal care") ||
    aisle === "9"
  ) {
    return {
      x: 390,
      y: 345,
      label: "Aisle 9",
      route:
        "380,590 380,530 405,530 405,345 390,345",
    };
  }

  // PET
  if (
    text.includes("dog") ||
    text.includes("cat") ||
    text.includes("pet") ||
    aisle === "10"
  ) {
    return {
      x: 425,
      y: 345,
      label: "Aisle 10",
      route:
        "380,590 380,530 405,530 405,345 425,345",
    };
  }

  // BABY
  if (
    text.includes("diaper") ||
    text.includes("baby") ||
    aisle === "11"
  ) {
    return {
      x: 390,
      y: 470,
      label: "Aisle 11",
      route:
        "380,590 380,530 405,530 405,470 390,470",
    };
  }

  // PHARMACY
  if (
    text.includes("medicine") ||
    text.includes("pharmacy") ||
    aisle === "12"
  ) {
    return {
      x: 425,
      y: 470,
      label: "Aisle 12",
      route:
        "380,590 380,530 405,530 405,470 425,470",
    };
  }

  // PREPARED FOOD
  if (
    text.includes("prepared") ||
    text.includes("ready meal") ||
    text.includes("ready-to-eat")
  ) {
    return {
      x: 545,
      y: 135,
      label: "Prepared Food",
      route:
        "380,590 380,530 405,530 405,150 545,150 545,135",
    };
  }

  // SANDWICH
  if (text.includes("sandwich")) {
    return {
      x: 145,
      y: 455,
      label: "Sandwich",
      route:
        "380,590 380,530 160,530 160,455 145,455",
    };
  }

  return {
    x: 405,
    y: 500,
    label: "Main aisle",
    route:
      "380,590 380,530 405,530 405,500",
  };
};

const mapLocation = getMapLocation(selectedProduct);

const routePath = mapLocation.route
  .trim()
  .split(/\s+/)
  .map((point, index) => {
    const [x, y] = point.split(",");

    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
  })
  .join(" ");
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
  {product.emoji || "🛒"}
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

          {/* RIGHT HERO VIDEO */}
<div className="hidden justify-center lg:flex">

  <div className="flex h-[430px] w-[430px] items-center justify-center rounded-full bg-blue-50 p-8">

    <div className="h-full w-full overflow-hidden rounded-full border-8 border-white shadow-lg">

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
      >
        <source
          src="/videos/shopper.mp4"
          type="video/mp4"
        />

        Your browser does not support video.
      </video>

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
{/* STORE MAP */}
<div id="store-map">

  <div className="mb-4 flex items-center justify-between">

    <div>
      <h2 className="text-2xl font-bold">
        Store map
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        FreshMart Grocery • Main floor
      </p>
    </div>

    {navigationStarted && (
      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
        Navigation started
      </span>
    )}

  </div>

  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">

    <div className="overflow-x-auto">

      {/* COMPLETE STORE */}
    <div className="relative h-[650px] w-[760px] overflow-hidden rounded-3xl border-2 border-slate-300 bg-white">

        {/* STORE NAME */}
        <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-bold shadow-sm">
          FreshMart Grocery
        </div>

        {/* BACK WALL */}
        <div className="absolute left-[155px] top-[50px] z-10 grid h-[90px] w-[450px] grid-cols-4 gap-2">

          {wallSections.map((section) => (
            <div
              key={section.name}
              className="relative overflow-hidden rounded-xl border-2 border-cyan-100 bg-white shadow-sm"
            >

              <div className="flex h-[58px] items-center justify-center gap-2">

                <span className="text-2xl">
                  {section.emoji}
                </span>

                <span className="text-xs font-bold">
                  {section.name}
                </span>

              </div>

              {/* REFRIGERATOR / COUNTER DOORS */}
              <div className="absolute bottom-0 left-0 right-0 grid h-[27px] grid-cols-3 gap-1 bg-cyan-50 p-1">

                <div className="rounded border border-cyan-200 bg-white" />
                <div className="rounded border border-cyan-200 bg-white" />
                <div className="rounded border border-cyan-200 bg-white" />

              </div>

            </div>
          ))}

        </div>

        {/* ===================== */}
        {/* WALKING CORRIDORS */}
        {/* ===================== */}
{/* ===================== */}
{/* WALKING CORRIDORS */}
{/* ===================== */}

{/* CENTER WALKING PATH */}
<div className="absolute left-[404px] top-[150px] h-[390px] border-l-2 border-dashed border-slate-200" />

{/* HORIZONTAL WALKWAY 1 */}
<div className="absolute left-[150px] top-[285px] w-[460px] border-t-2 border-dashed border-slate-200" />

{/* HORIZONTAL WALKWAY 2 */}
<div className="absolute left-[150px] top-[410px] w-[460px] border-t-2 border-dashed border-slate-200" />

{/* FRONT MAIN WALKWAY */}
<div className="absolute left-[145px] top-[530px] w-[470px] border-t-2 border-dashed border-slate-200" />

{/* WALKING DIRECTION */}
<div className="absolute left-[395px] top-[250px] text-sm font-bold text-slate-300">
  ↕
</div>

<div className="absolute left-[395px] top-[375px] text-sm font-bold text-slate-300">
  ↕
</div>

<div className="absolute left-[390px] top-[500px] whitespace-nowrap text-[8px] font-bold uppercase tracking-[2px] text-slate-300">
  Main aisle
</div>
        {/* ===================== */}
        {/* PRODUCE */}
        {/* ===================== */}

        <div className="absolute left-[22px] top-[165px] z-10 flex h-[225px] w-[120px] flex-col items-center justify-center rounded-2xl border-2 border-green-100 bg-green-50 shadow-sm">

          <span className="text-5xl">
            🍎
          </span>

          <p className="mt-3 text-base font-bold">
            Produce
          </p>

          <p className="mt-1 text-center text-[10px] text-slate-500">
            Fruits & Vegetables
          </p>

          <div className="mt-5 flex gap-2 text-lg">
            <span>🍌</span>
            <span>🍎</span>
            <span>🥦</span>
          </div>

        </div>

        {/* SANDWICH */}
        <div className="absolute left-[22px] top-[410px] z-10 flex h-[105px] w-[120px] flex-col items-center justify-center rounded-2xl border-2 border-orange-100 bg-orange-50 shadow-sm">

          <span className="text-3xl">
            🥪
          </span>

          <p className="mt-1 font-bold">
            Sandwich
          </p>

          <p className="text-[9px] text-slate-500">
            Grab & Go
          </p>

        </div>

        {/* ===================== */}
        {/* BAKERY */}
        {/* ===================== */}

        <div className="absolute left-[620px] top-[165px] z-10 flex h-[225px] w-[115px] flex-col items-center justify-center rounded-2xl border-2 border-amber-100 bg-amber-50 shadow-sm">

          <span className="text-5xl">
            🥖
          </span>

          <p className="mt-3 text-base font-bold">
            Bakery
          </p>

          <p className="mt-1 text-center text-[10px] text-slate-500">
            Bread & Pastries
          </p>

          <div className="mt-4 flex gap-3">
            <span>🥐</span>
            <span>🍞</span>
          </div>

        </div>

        {/* ===================== */}
        {/* FROZEN */}
        {/* ===================== */}

        <div className="absolute left-[620px] top-[410px] z-10 flex h-[105px] w-[115px] flex-col items-center justify-center rounded-2xl border-2 border-cyan-200 bg-cyan-50 shadow-sm">

          <span className="text-3xl">
            ❄️
          </span>

          <p className="mt-1 font-bold">
            Frozen
          </p>

          <p className="text-[9px] text-slate-500">
            Frozen Foods
          </p>

          <div className="mt-2 flex gap-2">
            <span>🍕</span>
            <span>🍟</span>
            <span>🦐</span>
          </div>

        </div>

        {/* ===================== */}
        {/* REAL STORE SHELVES */}
        {/* ===================== */}

        {mapShelves.map((shelf) => (
          <div
            key={shelf.aisle}
            style={{
              left: `${shelf.left}px`,
              top: `${shelf.top}px`,
              width: `${shelf.width}px`,
            }}
            className="absolute z-10 h-[72px]"
          >

            {/* AISLE LABEL */}
            <div className="absolute -top-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-[9px] font-bold text-white shadow-sm">
              Aisle {shelf.aisle}
            </div>

            <div className="h-full rounded-xl border border-slate-300 bg-white shadow-md">

              {/* SHELF HEADER */}
              <div className="flex h-[28px] items-center justify-center gap-2 border-b border-slate-200">

                <span>
                  {shelf.emoji}
                </span>

                <span className="text-xs font-bold">
                  {shelf.name}
                </span>

              </div>

              {/* SHELF LINES */}
              <div className="space-y-1.5 px-3 pt-2">

                <div className="h-[5px] rounded bg-slate-300" />
                <div className="h-[5px] rounded bg-slate-300" />
                <div className="h-[5px] rounded bg-slate-300" />

              </div>

            </div>

          </div>
        ))}

        {/* ===================== */}
        {/* CUSTOMER SERVICE */}
        {/* ===================== */}

        <div className="absolute bottom-[20px] left-[20px] z-10 flex h-[70px] w-[105px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">

          <span className="text-xl">
            ℹ️
          </span>

          <span className="mt-1 text-[9px] font-bold">
            Customer Service
          </span>

        </div>

       
{/* ===================== */}
{/* CHECKOUT AREA */}
{/* ===================== */}

<div className="absolute bottom-[20px] left-[150px] z-10">

  <p className="absolute -top-5 left-0 whitespace-nowrap text-[9px] font-bold uppercase tracking-wider text-slate-400">
    Checkout area
  </p>

</div>

{/* CHECKOUT 1 */}
<div className="absolute bottom-[20px] left-[150px] z-10 flex h-[55px] w-[80px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white shadow-sm">

  <span>
    🛒
  </span>

  <div>
    <p className="text-[8px] text-slate-400">
      Checkout
    </p>

    <p className="font-bold">
      1
    </p>
  </div>

</div>

{/* CHECKOUT 2 */}
<div className="absolute bottom-[20px] left-[250px] z-10 flex h-[55px] w-[80px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white shadow-sm">

  <span>
    🛒
  </span>

  <div>
    <p className="text-[8px] text-slate-400">
      Checkout
    </p>

    <p className="font-bold">
      2
    </p>
  </div>

</div>

{/* CHECKOUT 3 */}
<div className="absolute bottom-[20px] left-[470px] z-10 flex h-[55px] w-[80px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white shadow-sm">

  <span>
    🛒
  </span>

  <div>
    <p className="text-[8px] text-slate-400">
      Checkout
    </p>

    <p className="font-bold">
      3
    </p>
  </div>

</div>

        {/* ===================== */}
        {/* CENTER ENTRANCE */}
        {/* ===================== */}

        <div className="absolute bottom-[15px] left-[395px] z-20 flex h-[80px] w-[90px] -translate-x-1/2 flex-col items-center justify-center rounded-xl border-2 border-green-300 bg-green-50 shadow-sm">

          <span className="text-2xl">
            🚪
          </span>

          <p className="font-bold text-green-700">
            Entrance
          </p>

          <p className="text-[8px] text-green-600">
            Scan QR here
          </p>

        </div>

        {/* EXIT */}
        <div className="absolute bottom-[20px] right-[18px] z-10 flex h-[55px] w-[72px] items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold shadow-sm">
          Exit →
        </div>

        {/* ===================== */}
        {/* ROUTE */}
        {/* ===================== */}
  
{navigationStarted && (
  <svg
    className="pointer-events-none absolute inset-0 z-30 h-full w-full"
    viewBox="0 0 760 650"
  >

    {/* WHITE BORDER */}
    <path
      d={routePath}
      fill="none"
      stroke="white"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* BLUE ROUTE */}
    <path
      d={routePath}
      fill="none"
      stroke="#2563eb"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* MOVING ARROW 1 */}
    <g>
      <path
        d="M -5 -4 L 5 0 L -5 4 Z"
        fill="white"
        stroke="#2563eb"
        strokeWidth="1"
      />

      <animateMotion
        dur="3s"
        repeatCount="indefinite"
        rotate="auto"
        path={routePath}
      />
    </g>

    {/* MOVING ARROW 2 */}
    <g>
      <path
        d="M -5 -4 L 5 0 L -5 4 Z"
        fill="white"
        stroke="#2563eb"
        strokeWidth="1"
      />

      <animateMotion
        dur="3s"
        begin="-1.5s"
        repeatCount="indefinite"
        rotate="auto"
        path={routePath}
      />
    </g>

  </svg>
)}


        {/* ===================== */}
        {/* YOU ARE HERE */}
        {/* ===================== */}

        <div
          className="absolute z-40"
          style={{
            left: "380px",
            top: "590px",
          }}
        >

          <div className="relative -translate-x-1/2 -translate-y-1/2">

            <div className="absolute -inset-2 animate-ping rounded-full bg-blue-400/30" />

            <div className="relative h-5 w-5 rounded-full border-4 border-white bg-blue-600 shadow-lg" />

          </div>

          <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-2 py-1 text-[8px] font-semibold text-white shadow">
            You are here
          </span>

        </div>

        {/* ===================== */}
        {/* DESTINATION */}
        {/* ===================== */}

        {navigationStarted && (
          <div
            className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${mapLocation.x}px`,
              top: `${mapLocation.y}px`,
            }}
          >

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-2.5 py-1 text-[9px] font-semibold text-white shadow-md">
              {selectedProduct.emoji} {selectedProduct.name}
            </div>

            <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/25 animate-ping" />

            <div className="relative h-5 w-5 rounded-full border-4 border-white bg-blue-600 shadow-lg" />

          </div>
        )}

      </div>

    </div>

    {/* ROUTE BUTTON */}
    <button
      onClick={startNavigation}
      className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-blue-600 py-3.5 font-semibold text-blue-600 transition duration-200 hover:bg-blue-600 hover:text-white active:scale-[0.98]"
    >

      <Map size={22} />

      {navigationStarted
        ? `Route to ${selectedProduct.name}`
        : "Browse Store Map"}

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