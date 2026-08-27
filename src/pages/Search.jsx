import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search as SearchIcon,
  MapPin,
  ArrowRight,
  X,
} from "lucide-react";

import {
  getProducts,
  searchProducts,
} from "../services/productService";

const popularSearches = [
  "Milk",
  "Eggs",
  "Bread",
  "Rice",
  "Chicken",
  "Toothpaste",
];

const Search = () => {
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("q") || ""
  );

  const [products, setProducts] = useState([]);
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
      default:
        return "🛒";
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        let data;

        if (searchTerm.trim() === "") {
          data = await getProducts();
        } else {
          data = await searchProducts(searchTerm);
        }

        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Could not connect to the Spotly server.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">

        <div>
          <p className="font-semibold text-blue-600">
            Spotly
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            What are you looking for?
          </h1>

          <p className="mt-2 text-slate-500">
            Search for a product and Spotly will show you exactly where to find it.
          </p>
        </div>

        <div className="mt-8 flex items-center rounded-2xl border border-slate-200 bg-white px-5 shadow-sm transition focus-within:border-blue-500 focus-within:shadow-lg">

          <SearchIcon
            size={25}
            className="text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search milk, bread, chicken..."
            className="h-[70px] w-full bg-transparent px-4 text-lg outline-none"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 active:scale-90"
            >
              <X size={21} />
            </button>
          )}
        </div>

        <div className="mt-6">
          <p className="font-semibold">
            Popular searches
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {popularSearches.map((item) => (
              <button
                key={item}
                onClick={() => setSearchTerm(item)}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {searchTerm
              ? `Results for "${searchTerm}"`
              : "Products"}
          </h2>

          {!loading && (
            <span className="text-sm text-slate-500">
              {products.length} products
            </span>
          )}
        </div>

        {loading && (
          <div className="py-16 text-center text-slate-500">
            Searching products...
          </div>
        )}

        {!loading && error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {products.map((product) => (
              <div
                key={product.id}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 transition group-hover:bg-blue-50">

                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-contain p-4"
                    />
                  ) : (
                    <span className="text-[80px]">
                      {getProductEmoji(product.category)}
                    </span>
                  )}
                </div>

                <p className="mt-5 text-sm font-semibold text-blue-600">
                  {product.brand}
                </p>

                <h3 className="mt-1 text-xl font-bold">
                  {product.name}
                </h3>

                {product.size && (
                  <p className="mt-1 text-sm text-slate-500">
                    {product.size}
                  </p>
                )}

                {product.price !== null && (
                  <p className="mt-3 text-2xl font-bold">
                    ${Number(product.price).toFixed(2)}
                  </p>
                )}

                {product.stock > 0 ? (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    In stock
                  </div>
                ) : (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    Out of stock
                  </div>
                )}

                <div className="mt-4 flex items-start gap-2 text-slate-500">
                  <MapPin
                    size={19}
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

                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:scale-[0.97]">
                  Guide Me
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}

          </div>
        )}

        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-12 text-center">

              <div className="text-5xl">
                🔍
              </div>

              <h3 className="mt-4 text-xl font-bold">
                No products found
              </h3>

              <p className="mt-2 text-slate-500">
                Try another search.
              </p>

            </div>
          )}

      </main>
    </div>
  );
};

export default Search;