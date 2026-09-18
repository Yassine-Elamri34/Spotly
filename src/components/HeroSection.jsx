import {
  Search,
  Mic,
  X,
  MapPin,
  ArrowRight,
  QrCode,
} from "lucide-react";

const popular = [
  {
    name: "Milk",
    emoji: "🥛",
  },
  {
    name: "Pasta",
    emoji: "🍝",
  },
  {
    name: "Drinks",
    emoji: "🥤",
  },
  {
    name: "sushi",
    emoji: "🍣",
  },
  {
    name: "Banana",
    emoji: "🍌",
  },
];

const HeroSection = ({
  search,
  setSearch,
  searchResults,
  loading,
  error,
  guideToProduct,
  addToList,
  listItems = [],
}) => {
  return (
    <section
      id="search-section"
      className="scroll-mt-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-14 lg:pt-16">

        <div className="grid min-w-0 items-start gap-10 lg:grid-cols-2 lg:gap-12">

          {/* ================================= */}
          {/* LEFT SIDE */}
          {/* ================================= */}

          <div className="min-w-0">

            {/* QR DETECTED */}
            <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 sm:mb-5 sm:px-4 sm:text-sm">

              <QrCode
                size={16}
                className="shrink-0"
              />

              <span className="truncate">
                Entrance QR detected
              </span>

            </div>

            {/* ================================= */}
            {/* TITLE + MOBILE / TABLET VIDEO */}
            {/* ================================= */}

            <div className="relative">

              {/* TITLE */}
              <div className="pr-28 sm:pr-40 md:pr-52 lg:pr-0">

                <h1 className="max-w-2xl text-[2.15rem] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">

                  Find what you need

                  <br />

                  in{" "}
                  <span className="text-green-500">
                    seconds.
                  </span>

                </h1>

              </div>

              {/* ================================= */}
              {/* VIDEO - PHONE / TABLET */}
              {/* ================================= */}

              <div className="absolute right-0 -top-3 flex sm:-top-4 md:-top-5 lg:hidden">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 p-1.5 sm:h-32 sm:w-32 sm:p-2 md:h-44 md:w-44 md:p-3">

                  <div className="h-full w-full overflow-hidden rounded-full border-2 border-white shadow-lg sm:border-4">

                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="h-full w-full object-cover"
                    >

                      <source
  src={`${import.meta.env.BASE_URL}videos/shopper.mp4`}
  type="video/mp4"
/>

                      Your browser does not support video.

                    </video>

                  </div>

                </div>

              </div>

            </div>

            {/* HERO DESCRIPTION */}
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
              Search for any product and Spotly will guide you directly
              to its location inside the store.
            </p>

            {/* ================================= */}
            {/* SEARCH BAR */}
            {/* ================================= */}

            <div className="mt-6 flex min-w-0 w-full max-w-2xl items-center rounded-2xl border border-blue-200 bg-white px-3 shadow-[0_8px_30px_rgba(37,99,235,0.10)] transition duration-300 focus-within:border-blue-500 focus-within:shadow-[0_10px_35px_rgba(37,99,235,0.18)] hover:shadow-lg sm:mt-8 sm:px-5">

              <Search
                size={24}
                className="shrink-0 text-slate-400 sm:h-7 sm:w-7"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search for milk, eggs, bread..."
                className="h-16 min-w-0 flex-1 bg-transparent px-3 text-base outline-none placeholder:text-slate-400 sm:h-[72px] sm:px-4"
              />

              {/* CLEAR SEARCH */}
              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  aria-label="Clear search"
                  className="mr-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 active:scale-90"
                >
                  <X size={19} />
                </button>
              )}

              {/* MICROPHONE */}
              <button
                type="button"
                aria-label="Voice search"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-blue-600 transition hover:bg-blue-50 active:scale-90"
              >
                <Mic size={23} />
              </button>

            </div>

            {/* ================================= */}
            {/* LOADING */}
            {/* ================================= */}

            {loading && (
              <div className="mt-5 flex items-center gap-2 text-sm text-slate-500 sm:text-base">

                <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />

                Searching products...

              </div>
            )}

            {/* ================================= */}
            {/* ERROR */}
            {/* ================================= */}

            {!loading && error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 sm:text-base">
                {error}
              </div>
            )}

            {/* ================================= */}
            {/* SEARCH RESULTS */}
            {/* ================================= */}

            {!loading &&
              !error &&
              search &&
              searchResults.length > 0 && (
                <div className="mt-6 min-w-0">

                  {/* RESULTS HEADER */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">

                    <h2 className="text-lg font-bold sm:text-xl">
                      Search results
                    </h2>

                    <span className="text-sm text-slate-500">
                      {searchResults.length} found
                    </span>

                  </div>

                  {/* RESULT CARDS */}
                  <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1 sm:pr-2">

                    {searchResults.map((product) => {
                      const isAdded =
                        listItems.some(
                          (item) =>
                            item.id === product.id
                        );

                      return (
                        <div
                          key={product.id}
                          className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg sm:p-4"
                        >

                          {/* PRODUCT TOP AREA */}
                          <div className="flex min-w-0 gap-3 sm:gap-4">

                            {/* EMOJI */}
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-50 transition group-hover:bg-blue-50 sm:h-20 sm:w-20">

                              <span className="text-3xl sm:text-4xl">
                                {product.emoji || "🛒"}
                              </span>

                            </div>

                            {/* DETAILS */}
                            <div className="min-w-0 flex-1">

                              {/* BRAND */}
                              {product.brand && (
                                <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-blue-600 sm:text-xs">
                                  {product.brand}
                                </p>
                              )}

                              {/* NAME */}
                              <h3 className="mt-1 break-words text-sm font-bold leading-5 text-slate-900 sm:text-base">
                                {product.name}
                              </h3>

                              {/* SIZE */}
                              {product.size && (
                                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                  {product.size}
                                </p>
                              )}

                              {/* PRICE + STOCK */}
                              <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3">

                                {product.price !== null &&
                                  product.price !== undefined && (
                                    <p className="text-base font-bold sm:text-lg">
                                      $
                                      {Number(
                                        product.price
                                      ).toFixed(2)}
                                    </p>
                                  )}

                                {product.stock > 0 ? (
                                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-medium text-green-700 sm:text-xs">
                                    In stock
                                  </span>
                                ) : (
                                  <span className="rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-medium text-red-700 sm:text-xs">
                                    Out of stock
                                  </span>
                                )}

                              </div>

                              {/* LOCATION */}
                              <div className="mt-2 flex min-w-0 items-start gap-1.5 text-xs text-slate-500 sm:text-sm">

                                <MapPin
                                  size={15}
                                  className="mt-0.5 shrink-0 text-blue-600 sm:h-4 sm:w-4"
                                />

                                <span className="break-words">
                                  Aisle {product.aisle}
                                  {" • "}
                                  {product.section}
                                  {" • "}
                                  Shelf {product.shelf}
                                </span>

                              </div>

                            </div>

                          </div>

                          {/* ================================= */}
                          {/* PRODUCT BUTTONS */}
                          {/* ================================= */}

                          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">

                            {/* ADD TO LIST */}
                            <button
                              type="button"
                              onClick={() =>
                                addToList(product)
                              }
                              disabled={isAdded}
                              className={`min-h-12 rounded-xl border px-3 py-3 text-sm font-semibold transition duration-200 active:scale-[0.98] sm:text-base ${
                                isAdded
                                  ? "cursor-default border-green-200 bg-green-50 text-green-600"
                                  : "border-blue-200 bg-white text-blue-600 hover:border-blue-600 hover:bg-blue-50"
                              }`}
                            >

                              {isAdded
                                ? "✓ Added"
                                : "+ Add to List"}

                            </button>

                            {/* GUIDE ME */}
                            <button
                              type="button"
                              onClick={() =>
                                guideToProduct(product)
                              }
                              disabled={
                                product.stock <= 0
                              }
                              className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition duration-200 sm:text-base ${
                                product.stock > 0
                                  ? "bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
                                  : "cursor-not-allowed bg-slate-200 text-slate-400"
                              }`}
                            >

                              Guide Me

                              <ArrowRight
                                size={18}
                                className="shrink-0"
                              />

                            </button>

                          </div>

                        </div>
                      );
                    })}

                  </div>

                </div>
              )}

            {/* ================================= */}
            {/* NOTHING FOUND */}
            {/* ================================= */}

            {!loading &&
              !error &&
              search &&
              searchResults.length === 0 && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-center sm:p-8">

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

            {/* ================================= */}
            {/* POPULAR SEARCHES */}
            {/* ================================= */}

            <div className="mt-6">

              <p className="mb-3 text-sm font-semibold sm:text-base">
                Popular searches
              </p>

              <div className="flex flex-wrap gap-2">

                {popular.map((item) => (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() =>
                      setSearch(item.name)
                    }
                    className={`flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition duration-200 hover:-translate-y-0.5 active:scale-95 sm:px-4 sm:py-2.5 ${
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

          {/* ================================= */}
          {/* VIDEO - LAPTOP / DESKTOP */}
          {/* ================================= */}
{/* VIDEO - LAPTOP / DESKTOP */}
<div className="hidden min-w-0 items-start justify-center lg:flex lg:justify-end">

  <div className="flex h-[320px] w-[320px] items-center justify-center rounded-full bg-blue-50 p-6 xl:h-[380px] xl:w-[380px] xl:p-7 2xl:h-[430px] 2xl:w-[430px] 2xl:p-8">

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
          src={`${import.meta.env.BASE_URL}videos/shopper.mp4`}
          type="video/mp4"
        />

        Your browser does not support video.

      </video>

    </div>

  </div>

</div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;