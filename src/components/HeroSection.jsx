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
    name: "Bread",
    emoji: "🥖",
  },
  {
    name: "Drinks",
    emoji: "🥤",
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
    <section className="mx-auto max-w-7xl px-5 pb-8 pt-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-16">

      <div className="grid items-start gap-10 lg:grid-cols-2">

        {/* ================================= */}
        {/* LEFT SIDE */}
        {/* ================================= */}

        <div>

          {/* QR DETECTED */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">

            <QrCode size={16} />

            Entrance QR detected

          </div>

          {/* HERO TITLE */}
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">

            Find what you need

            <br />

            in{" "}
            <span className="text-green-500">
              seconds.
            </span>

          </h1>

          {/* HERO DESCRIPTION */}
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Search for any product and Spotly will guide you directly
            to its location inside the store.
          </p>

          {/* ================================= */}
          {/* SEARCH BAR */}
          {/* ================================= */}

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

            {/* CLEAR SEARCH */}
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mr-1 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 active:scale-90"
              >
                <X size={20} />
              </button>
            )}

            {/* MICROPHONE */}
            <button
              type="button"
              className="rounded-full p-2 text-blue-600 transition hover:bg-blue-50 active:scale-90"
            >
              <Mic size={27} />
            </button>

          </div>

          {/* ================================= */}
          {/* LOADING */}
          {/* ================================= */}

          {loading && (
            <div className="mt-5 flex items-center gap-2 text-slate-500">

              <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />

              Searching products...

            </div>
          )}

          {/* ================================= */}
          {/* ERROR */}
          {/* ================================= */}

          {!loading && error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
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
              <div className="mt-6">

                {/* RESULTS HEADER */}
                <div className="mb-4 flex items-center justify-between">

                  <h2 className="text-xl font-bold">
                    Search results
                  </h2>

                  <span className="text-sm text-slate-500">
                    {searchResults.length} found
                  </span>

                </div>

                {/* RESULT CARDS */}
                <div className="max-h-[520px] space-y-3 overflow-y-auto pr-2">

                  {searchResults.map((product) => {
                    const isAdded = listItems.some(
                      (item) =>
                        item.id === product.id
                    );

                    return (
                      <div
                        key={product.id}
                        className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                      >

                        {/* PRODUCT TOP AREA */}
                        <div className="flex gap-4">

                          {/* EMOJI */}
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-50 transition group-hover:bg-blue-50">

                            <span className="text-4xl">
                              {product.emoji || "🛒"}
                            </span>

                          </div>

                          {/* DETAILS */}
                          <div className="min-w-0 flex-1">

                            {/* BRAND */}
                            {product.brand && (
                              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                                {product.brand}
                              </p>
                            )}

                            {/* NAME */}
                            <h3 className="mt-1 font-bold text-slate-900">
                              {product.name}
                            </h3>

                            {/* SIZE */}
                            {product.size && (
                              <p className="mt-1 text-sm text-slate-500">
                                {product.size}
                              </p>
                            )}

                            {/* PRICE + STOCK */}
                            <div className="mt-2 flex flex-wrap items-center gap-3">

                              {product.price !== null &&
                                product.price !== undefined && (
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

                            {/* LOCATION */}
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

                        {/* ================================= */}
                        {/* PRODUCT BUTTONS */}
                        {/* ================================= */}

                        <div className="mt-4 grid gap-2 sm:grid-cols-2">

                          {/* ADD TO LIST */}
                          <button
                            type="button"
                            onClick={() =>
                              addToList(product)
                            }
                            disabled={isAdded}
                            className={`rounded-xl border py-3 font-semibold transition duration-200 active:scale-[0.98] ${
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
                            disabled={product.stock <= 0}
                            className={`flex items-center justify-center gap-2 rounded-xl py-3 font-semibold transition duration-200 ${
                              product.stock > 0
                                ? "bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
                                : "cursor-not-allowed bg-slate-200 text-slate-400"
                            }`}
                          >

                            Guide Me

                            <ArrowRight size={18} />

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

          {/* ================================= */}
          {/* POPULAR SEARCHES */}
          {/* ================================= */}

          <div className="mt-6">

            <p className="mb-3 font-semibold">
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

        {/* ================================= */}
        {/* RIGHT HERO VIDEO */}
        {/* ================================= */}

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
  );
};

export default HeroSection;