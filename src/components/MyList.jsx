import {
  Trash2,
  MapPin,
  Navigation,
  ShoppingBasket,
} from "lucide-react";

const MyList = ({
  listItems = [],
  removeFromList,
  clearList,
  guideToProduct,
}) => {
  return (
    <section
      id="my-list"
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div className="min-w-0">

            <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 sm:px-4 sm:text-sm">

              <ShoppingBasket
                size={17}
                className="shrink-0"
              />

              <span className="truncate">
                My Shopping List
              </span>

            </div>

            <h2 className="mt-4 max-w-2xl text-2xl font-bold leading-tight sm:text-3xl">

              Everything you need,

              <span className="text-blue-600">
                {" "}in one trip.
              </span>

            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              Add products while searching and Spotly will keep them here.
            </p>

          </div>

          {/* CLEAR LIST */}
          {listItems.length > 0 && (
            <button
              type="button"
              onClick={clearList}
              className="flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 active:scale-[0.98]"
            >

              <Trash2 size={17} />

              Clear list

            </button>
          )}

        </div>

        {/* ================================= */}
        {/* EMPTY LIST */}
        {/* ================================= */}

        {listItems.length === 0 && (
          <div className="mt-8 rounded-3xl border-2 border-dashed border-slate-200 bg-white px-4 py-10 text-center sm:mt-10 sm:px-6 sm:py-14">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 sm:h-16 sm:w-16">

              <ShoppingBasket
                size={28}
                className="text-blue-600 sm:h-[30px] sm:w-[30px]"
              />

            </div>

            <h3 className="mt-5 text-lg font-bold sm:text-xl">
              Your list is empty
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
              Search for products above and click Add to List.
            </p>

          </div>
        )}

        {/* ================================= */}
        {/* PRODUCTS */}
        {/* ================================= */}

        {listItems.length > 0 && (
          <div className="mt-8 sm:mt-10">

            {/* LIST SUMMARY */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

              <p className="text-sm font-semibold sm:text-base">
                {listItems.length}{" "}
                {listItems.length === 1
                  ? "product"
                  : "products"}
              </p>

              <span className="whitespace-nowrap rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 sm:text-sm">
                Ready to shop
              </span>

            </div>

            {/* PRODUCT GRID */}
            <div className="grid min-w-0 gap-4 md:grid-cols-2">

              {listItems.map((product, index) => (
                <div
                  key={product.id}
                  className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-5"
                >

                  {/* PRODUCT INFORMATION */}
                  <div className="flex min-w-0 items-start gap-3 sm:gap-4">

                    {/* NUMBER */}
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
                      {index + 1}
                    </div>

                    {/* PRODUCT EMOJI */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-3xl sm:h-20 sm:w-20 sm:text-4xl">
                      {product.emoji || "🛒"}
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="min-w-0 flex-1">

                      {product.brand && (
                        <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-blue-600 sm:text-xs">
                          {product.brand}
                        </p>
                      )}

                      <h3 className="mt-1 break-words text-sm font-bold leading-5 text-slate-900 sm:text-lg sm:leading-6">
                        {product.name}
                      </h3>

                      {product.price !== null &&
                        product.price !== undefined && (
                          <p className="mt-1 text-sm font-bold sm:text-base">
                            $
                            {Number(
                              product.price
                            ).toFixed(2)}
                          </p>
                        )}

                      {/* LOCATION */}
                      <div className="mt-2 flex min-w-0 items-start gap-1.5 text-xs leading-5 text-slate-500 sm:text-sm">

                        <MapPin
                          size={15}
                          className="mt-0.5 shrink-0 text-blue-600"
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
                  {/* ACTION BUTTONS */}
                  {/* ================================= */}

                  <div className="mt-5 grid min-w-0 grid-cols-[minmax(0,1fr)_48px] gap-2 sm:gap-3">

                    {/* GUIDE */}
                    <button
                      type="button"
                      onClick={() =>
                        guideToProduct(product)
                      }
                      className="flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] sm:text-base"
                    >

                      <Navigation
                        size={18}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        Guide Me
                      </span>

                    </button>

                    {/* DELETE */}
                    <button
                      type="button"
                      onClick={() =>
                        removeFromList(product.id)
                      }
                      aria-label={`Remove ${product.name} from list`}
                      title="Remove product"
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:scale-90"
                    >

                      <Trash2 size={19} />

                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default MyList;