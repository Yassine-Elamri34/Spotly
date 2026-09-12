import {
  Trash2,
  MapPin,
  Navigation,
  ShoppingBasket,
} from "lucide-react";

const MyList = ({
  listItems,
  removeFromList,
  clearList,
  guideToProduct,
}) => {
  return (
    <section
      id="my-list"
      className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            <ShoppingBasket size={17} />
            My Shopping List
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            Everything you need,
            <span className="text-blue-600">
              {" "}in one trip.
            </span>
          </h2>

          <p className="mt-2 text-slate-500">
            Add products while searching and Spotly will keep them here.
          </p>
        </div>

        {listItems.length > 0 && (
          <button
            onClick={clearList}
            className="flex items-center gap-2 self-start rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <Trash2 size={17} />
            Clear list
          </button>
        )}
      </div>

      {listItems.length === 0 && (
        <div className="mt-10 rounded-3xl border-2 border-dashed border-slate-200 bg-white px-6 py-14 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <ShoppingBasket
              size={30}
              className="text-blue-600"
            />
          </div>

          <h3 className="mt-5 text-xl font-bold">
            Your list is empty
          </h3>

          <p className="mx-auto mt-2 max-w-md text-slate-500">
            Search for products above and click Add to List.
          </p>

        </div>
      )}

      {listItems.length > 0 && (
        <div className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <p className="font-semibold">
              {listItems.length}{" "}
              {listItems.length === 1
                ? "product"
                : "products"}
            </p>

            <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
              Ready to shop
            </span>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {listItems.map((product, index) => (
              <div
                key={product.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >

                <div className="flex gap-4">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-4xl">
                    {product.emoji || "🛒"}
                  </div>

                  <div className="min-w-0 flex-1">

                    {product.brand && (
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        {product.brand}
                      </p>
                    )}

                    <h3 className="mt-1 text-lg font-bold">
                      {product.name}
                    </h3>

                    {product.price !== null && (
                      <p className="mt-1 font-bold">
                        ${Number(product.price).toFixed(2)}
                      </p>
                    )}

                    <div className="mt-2 flex items-start gap-1.5 text-sm text-slate-500">

                      <MapPin
                        size={15}
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

                <div className="mt-5 grid grid-cols-[1fr_auto] gap-3">

                  <button
                    onClick={() =>
                      guideToProduct(product)
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                  >
                    <Navigation size={18} />
                    Guide Me
                  </button>

                  <button
                    onClick={() =>
                      removeFromList(product.id)
                    }
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={19} />
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>
      )}
    </section>
  );
};

export default MyList;