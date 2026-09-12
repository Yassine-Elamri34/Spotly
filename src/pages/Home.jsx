import {
  useEffect,
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
const [listItems, setListItems] = useState([]);
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
      });
  };
const addToList = (product) => {
  setListItems((currentItems) => {
    const alreadyExists =
      currentItems.some(
        (item) => item.id === product.id
      );

    if (alreadyExists) {
      return currentItems;
    }

    return [
      ...currentItems,
      product,
    ];
  });
};

const removeFromList = (productId) => {
  setListItems((currentItems) =>
    currentItems.filter(
      (item) => item.id !== productId
    )
  );
};

const clearList = () => {
  setListItems([]);
};
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <Header />

      <main>

        {/* HERO + SEARCH */}
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

        {/* QR START LOCATION */}
        <StartPoint />

        {/* PRODUCT + MAP */}
        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">

          <ProductFound
            selectedProduct={
              selectedProduct
            }
            startNavigation={
              startNavigation
            }
          />

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

       </section>

{/* MY SHOPPING LIST */}
<MyList
  listItems={listItems}
  removeFromList={removeFromList}
  clearList={clearList}
  guideToProduct={guideToProduct}
/>

{/* HOW IT WORKS */}
<HowItWorks />

      </main>

      {/* MOBILE NAV */}
      <MobileBottomNav />

    </div>
  );
};

export default Home;