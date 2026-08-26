import { useState } from "react";
import {
  Search as SearchIcon,
  MapPin,
  ArrowRight,
  X,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "2% Milk - 4L",
    category: "Dairy",
    price: "$6.49",
    aisle: "Aisle 7",
    shelf: "Shelf 2",
    emoji: "🥛",
  },
  {
    id: 2,
    name: "Large Eggs - 12 Pack",
    category: "Dairy",
    price: "$4.99",
    aisle: "Aisle 7",
    shelf: "Shelf 1",
    emoji: "🥚",
  },
  {
    id: 3,
    name: "Fresh White Bread",
    category: "Bakery",
    price: "$3.49",
    aisle: "Aisle 2",
    shelf: "Shelf 3",
    emoji: "🥖",
  },
  {
    id: 4,
    name: "Coca-Cola - 2L",
    category: "Drinks",
    price: "$2.99",
    aisle: "Aisle 9",
    shelf: "Shelf 4",
    emoji: "🥤",
  },
  {
    id: 5,
    name: "Orange Juice",
    category: "Drinks",
    price: "$5.49",
    aisle: "Aisle 8",
    shelf: "Shelf 2",
    emoji: "🧃",
  },
  {
    id: 6,
    name: "Bananas",
    category: "Produce",
    price: "$1.99",
    aisle: "Produce",
    shelf: "Section A",
    emoji: "🍌",
  },
  {
    id: 7,
    name: "Apples",
    category: "Produce",
    price: "$4.29",
    aisle: "Produce",
    shelf: "Section B",
    emoji: "🍎",
  },
  {
    id: 8,
    name: "Chocolate Cookies",
    category: "Snacks",
    price: "$3.99",
    aisle: "Aisle 5",
    shelf: "Shelf 3",
    emoji: "🍪",
  },
];

const popularSearches = [
  "Milk",
  "Eggs",
  "Bread",
  "Drinks",
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    return (
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">

        {/* TITLE */}
        <div>
          <p className="font-semibold text-blue-600">
            Spotly
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            What are you looking for?
          </h1>

          <p className="mt-2 text-slate-500">
            Search for a product and Spotly will show you
            exactly where to find it.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mt-8 flex items-center rounded-2xl border border-slate-200 bg-white px-5 shadow-sm transition duration-300 focus-within:border-blue-500 focus-within:shadow-lg">

          <SearchIcon
            size={25}
            className="text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search milk, bread, drinks..."
            className="h-[70px] w-full bg-transparent px-4 text-lg outline-none"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-800 active:scale-90"
            >
              <X size={21} />
            </button>
          )}
        </div>

        {/* POPULAR SEARCHES */}
        <div className="mt-6">
          <p className="font-semibold">
            Popular searches
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {popularSearches.map((item) => (
              <button
                key={item}
                onClick={() => setSearchTerm(item)}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 transition duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS TITLE */}
        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {searchTerm
              ? `Results for "${searchTerm}"`
              : "All products"}
          </h2>

          <span className="text-sm text-slate-500">
            {filteredProducts.length} products
          </span>
        </div>

        {/* PRODUCTS */}
        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >

                {/* PRODUCT IMAGE */}
                <div className="flex h-40 items-center justify-center rounded-2xl bg-slate-50 transition duration-300 group-hover:bg-blue-50">
                  <span className="text-[85px]">
                    {product.emoji}
                  </span>
                </div>

                {/* CATEGORY */}
                <p className="mt-5 text-sm font-semibold text-blue-600">
                  {product.category}
                </p>

                {/* NAME */}
                <h3 className="mt-1 text-xl font-bold">
                  {product.name}
                </h3>

                {/* PRICE */}
                <p className="mt-2 text-2xl font-bold">
                  {product.price}
                </p>

                {/* STOCK */}
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  In stock
                </div>

                {/* LOCATION */}
                <div className="mt-4 flex items-center gap-2 text-slate-500">
                  <MapPin
                    size={19}
                    className="text-blue-600"
                  />

                  <span>
                    {product.aisle} • {product.shelf}
                  </span>
                </div>

                {/* GUIDE BUTTON */}
                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:scale-[0.97]">
                  Guide Me
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <div className="text-5xl">
              🔍
            </div>

            <h3 className="mt-4 text-xl font-bold">
              No products found
            </h3>

            <p className="mt-2 text-slate-500">
              Try searching for another product.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;