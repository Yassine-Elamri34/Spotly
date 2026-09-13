import {
  MapPin,
  ArrowRight,
} from "lucide-react";

const ProductFound = ({
  selectedProduct,
  startNavigation,
}) => {
  return (
    <div className="min-w-0 w-full">

      {/* TITLE */}
      <h2 className="mb-4 text-xl font-bold sm:text-2xl">
        Product found
      </h2>

      {/* PRODUCT CARD */}
      <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5">

        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:gap-5 lg:flex-col xl:flex-row">

          {/* PRODUCT EMOJI */}
          <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-2xl bg-slate-50 sm:h-36 sm:w-36 lg:h-40 lg:w-full xl:w-40">

            <span className="text-[68px] sm:text-[78px] lg:text-[90px]">
              {selectedProduct.emoji || "🛒"}
            </span>

          </div>

          {/* DETAILS */}
          <div className="min-w-0 flex-1">

            {/* PRODUCT NAME */}
            <h3 className="break-words text-xl font-bold leading-tight sm:text-2xl">
              {selectedProduct.name}
            </h3>

            {/* PRICE */}
            <p className="mt-2 text-2xl font-bold sm:text-3xl">
              {selectedProduct.price}
            </p>

            {/* STOCK */}
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 sm:text-sm">

              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500 sm:h-3 sm:w-3" />

              In stock

            </div>

            {/* LOCATION */}
            <div className="mt-4 flex min-w-0 items-start gap-2 text-sm leading-6 text-slate-500 sm:text-base">

              <MapPin
                size={19}
                className="mt-0.5 shrink-0 text-blue-600 sm:h-5 sm:w-5"
              />

              <span className="min-w-0 break-words">
                {selectedProduct.location}
              </span>

            </div>

            {/* GUIDE BUTTON */}
            <button
              type="button"
              onClick={startNavigation}
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:translate-y-0 active:scale-[0.98] sm:mt-6 sm:px-5 sm:py-3.5 sm:text-base"
            >

              Guide Me

              <ArrowRight
                size={19}
                className="shrink-0"
              />

            </button>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* QUICK INFO */}
      {/* ================================= */}

      <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">

        {/* WALK TIME */}
        <div className="rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5">

          <p className="text-xs text-slate-500 sm:text-sm">
            Estimated walk
          </p>

          <p className="mt-1 text-lg font-bold sm:text-xl">
            1 min
          </p>

        </div>

        {/* DISTANCE */}
        <div className="rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5">

          <p className="text-xs text-slate-500 sm:text-sm">
            Distance
          </p>

          <p className="mt-1 text-lg font-bold sm:text-xl">
            48 m
          </p>

        </div>

      </div>

    </div>
  );
};

export default ProductFound;