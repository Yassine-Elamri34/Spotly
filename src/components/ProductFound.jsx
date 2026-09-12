import {
  MapPin,
  ArrowRight,
} from "lucide-react";

const ProductFound = ({
  selectedProduct,
  startNavigation,
}) => {
  return (
    <div>

      <h2 className="mb-4 text-2xl font-bold">
        Product found
      </h2>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

        <div className="flex flex-col gap-5 sm:flex-row lg:flex-col xl:flex-row">

          {/* PRODUCT EMOJI */}
          <div className="flex h-40 w-full items-center justify-center rounded-2xl bg-slate-50 sm:w-40 lg:w-full xl:w-40">

            <span className="text-[90px]">
              {selectedProduct.emoji}
            </span>

          </div>

          {/* DETAILS */}
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
  );
};

export default ProductFound;