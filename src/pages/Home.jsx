import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { searchProducts } from "../services/productService";

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import StartPoint from "../components/StartPoint";
import ProductFound from "../components/ProductFound";
import StoreMap from "../components/StoreMap";
import HowItWorks from "../components/HowItWorks";
import MobileBottomNav from "../components/MobileBottomNav";
import MyList from "../components/MyList";

const defaultProduct = {
  id: 1,
  name: "2% Milk - 4L",
  category: "Milk",
  price: "$6.49",
  aisle: "2",
  section: "Dairy",
  shelf: "2",
  location: "Aisle 2 • Dairy • Shelf 2",
  emoji: "🥛",
};

const Home = () => {
  const [search, setSearch] =
    useState("");

  const [listItems, setListItems] =
    useState([]);

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(defaultProduct);

  const [
    navigationStarted,
    setNavigationStarted,
  ] = useState(false);

  const [
    searchResults,
    setSearchResults,
  ] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");
    const productRef = useRef(null);
const mapRef = useRef(null);
const routeRef = useRef(null);

const [showRouteSummary, setShowRouteSummary] =
  useState(false);

useLayoutEffect(() => {
  const checkRouteSpace = () => {
    if (
      !productRef.current ||
      !mapRef.current ||
      !routeRef.current
    ) {
      return;
    }

    // Never show on phone/tablet.
    if (window.innerWidth < 1024) {
      setShowRouteSummary(false);
      return;
    }

    const productHeight =
      productRef.current.getBoundingClientRect().height;

    const mapHeight =
      mapRef.current.getBoundingClientRect().height;

    const routeHeight =
      routeRef.current.getBoundingClientRect().height;

    // 16px = mt-4 between ProductFound and Quick Navigation.
    const availableSpace =
      mapHeight - productHeight - 16;

    // Give ourselves a little safety room
    const fits =
      availableSpace >= routeHeight + 8;

    setShowRouteSummary(fits);
  };

  const frame =
    requestAnimationFrame(checkRouteSpace);

  const observer =
    new ResizeObserver(checkRouteSpace);

  if (productRef.current) {
    observer.observe(productRef.current);
  }

  if (mapRef.current) {
    observer.observe(mapRef.current);
  }

  if (routeRef.current) {
    observer.observe(routeRef.current);
  }

  window.addEventListener(
    "resize",
    checkRouteSpace
  );

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();

    window.removeEventListener(
      "resize",
      checkRouteSpace
    );
  };
}, []);


  /* ================================= */
  /* SEARCH DATABASE */
  /* ================================= */

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

        const data =
          await searchProducts(
            search.trim()
          );

        setSearchResults(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to search products."
        );

        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(() => {
      loadProducts();
    }, 400);

    return () =>
      clearTimeout(delay);
  }, [search]);

  /* ================================= */
  /* GUIDE TO PRODUCT */
  /* ================================= */

  const guideToProduct = (
    product
  ) => {
    setSelectedProduct({
      id: product.id,

      name: product.name,

      category:
        product.category,

      price:
        product.price !== null
          ? `$${Number(
              product.price
            ).toFixed(2)}`
          : "Price unavailable",

      aisle:
        product.aisle,

      section:
        product.section,

      shelf:
        product.shelf,

      location: `Aisle ${product.aisle} • ${product.section} • Shelf ${product.shelf}`,

      emoji:
        product.emoji || "🛒",
    });

    setNavigationStarted(true);

    setTimeout(() => {
      document
        .getElementById(
          "store-map"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  /* ================================= */
  /* START NAVIGATION */
  /* ================================= */

  const startNavigation = () => {
    setNavigationStarted(true);

    document
      .getElementById(
        "store-map"
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  /* ================================= */
  /* ADD TO LIST */
  /* ================================= */

  const addToList = (product) => {
    setListItems(
      (currentItems) => {
        const alreadyExists =
          currentItems.some(
            (item) =>
              item.id === product.id
          );

        if (alreadyExists) {
          return currentItems;
        }

        return [
          ...currentItems,
          product,
        ];
      }
    );
  };

  /* ================================= */
  /* REMOVE FROM LIST */
  /* ================================= */

  const removeFromList = (
    productId
  ) => {
    setListItems(
      (currentItems) =>
        currentItems.filter(
          (item) =>
            item.id !== productId
        )
    );
  };

  /* ================================= */
  /* CLEAR LIST */
  /* ================================= */

  const clearList = () => {
    setListItems([]);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <Header />
<main className="min-w-0">

  {/* ================================= */}
  {/* HERO + SEARCH */}
  {/* ================================= */}

  <HeroSection
    search={search}
    setSearch={setSearch}
    searchResults={searchResults}
    loading={loading}
    error={error}
    guideToProduct={guideToProduct}
    addToList={addToList}
    listItems={listItems}
  />

  {/* ================================= */}
  {/* START POINT */}
  {/* ================================= */}

  <StartPoint />

  {/* ================================= */}
  {/* PRODUCT + STORE MAP */}
  {/* ================================= */}

  <section className="mx-auto grid min-w-0 max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8">
      {/* PRODUCT */}
<div className="relative min-w-0 self-start">

  {/* PRODUCT FOUND */}
  <div ref={productRef}>
    <ProductFound
      selectedProduct={
        selectedProduct
      }
      startNavigation={
        startNavigation
      }
    />
  </div>

  {/* DESKTOP ROUTE SUMMARY */}
  <div
    ref={routeRef}
    className={`
  mt-4 rounded-2xl border border-slate-200
bg-white p-3 shadow-sm
  transition-opacity duration-200
  ${
    showRouteSummary
      ? "relative block opacity-100"
      : "invisible absolute left-0 right-0 top-full pointer-events-none opacity-0"
  }
`}
  >

    {/* HEADER */}
    <div className="mb-2 flex items-center justify-between">

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Your Route
        </p>

        <h3 className="text-base font-bold text-slate-900">
          Quick navigation
        </h3>
      </div>

      <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
        1 min
      </div>

    </div>

    {/* ROUTE STEPS */}
    <div>

      {/* START */}
      <div className="flex gap-3">

        <div className="flex flex-col items-center">

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
            📍
          </div>

          <div className="h-4 w-px bg-blue-200" />

        </div>

        <div className="pt-1">

          <p className="text-[13px] font-semibold text-slate-900">
            Store Entrance
          </p>

          <p className="text-[11px] text-slate-500">
            Your starting point
          </p>

        </div>

      </div>

      {/* AISLE */}
      <div className="flex gap-3">

        <div className="flex flex-col items-center">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm">
            🚶
          </div>

          <div className="h-6 w-px bg-blue-200" />

        </div>

        <div className="pt-1">

          <p className="text-sm font-semibold text-slate-900">
            Walk to Aisle {selectedProduct?.aisle}
          </p>

          <p className="text-xs text-slate-500">
            Follow the highlighted path
          </p>

        </div>

      </div>

      {/* DESTINATION */}
      <div className="flex gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm">
          {selectedProduct?.emoji || "🛒"}
        </div>

        <div className="pt-1">

          <p className="text-sm font-semibold text-slate-900">
            {selectedProduct?.section || "Product"}
          </p>

          <p className="text-xs text-slate-500">
            Aisle {selectedProduct?.aisle}
            {" • "}
            Shelf {selectedProduct?.shelf}
          </p>

        </div>

      </div>

    </div>

    {/* STATUS */}
    <div className="mt-3 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2">

      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
        ✓
      </div>

      <div>

        <p className="text-sm font-semibold text-green-800">
          Product in stock
        </p>

        <p className="text-xs text-green-700">
          Ready to find in store
        </p>

      </div>

    </div>

   

  </div>

</div>

      {/* STORE MAP */}
<div className="min-w-0 self-start">
  <div ref={mapRef}>
    <StoreMap
      selectedProduct={
        selectedProduct
      }
      navigationStarted={
        navigationStarted
      }
      startNavigation={
        startNavigation
      }
    />
  </div>
</div>

        </section>

        {/* ================================= */}
        {/* MY SHOPPING LIST */}
        {/* ================================= */}

        <MyList
          listItems={listItems}
          removeFromList={
            removeFromList
          }
          clearList={clearList}
          guideToProduct={
            guideToProduct
          }
        />

        {/* ================================= */}
        {/* HOW IT WORKS */}
        {/* ================================= */}

        <HowItWorks />

      </main>

      {/* ================================= */}
      {/* MOBILE BOTTOM NAVIGATION */}
      {/* ================================= */}

      <MobileBottomNav />

    </div>
  );
};

export default Home;