import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Store,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import SpotlyLogo from "./SpotlyLogo";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const goHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setMobileMenu(false);
  };

  const goToSearch = () => {
    document
      .getElementById("search-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setMobileMenu(false);
  };

  const goToMap = () => {
    document
      .getElementById("store-map")
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setMobileMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <SpotlyLogo />

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 md:flex">

          <button
            onClick={goHome}
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Home
          </button>

          <button
            onClick={goToSearch}
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Search
          </button>

          <button
            onClick={goToMap}
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Store Map
          </button>

          <button className="font-medium text-slate-600 transition hover:text-blue-600">
            My List
          </button>

          <Link
            to="/about"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            About
          </Link>

        </nav>

        {/* STORE */}
        <div className="hidden sm:block">

          <button className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2.5 font-semibold transition duration-200 hover:bg-blue-100 active:scale-95">

            <Store
              size={19}
              className="text-blue-600"
            />

            FreshMart Grocery

            <ChevronDown size={17} />

          </button>

        </div>

        {/* MOBILE MENU */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="rounded-lg p-2 transition hover:bg-slate-100 active:scale-90 md:hidden"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>

      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenu && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">

          <div className="flex flex-col gap-4">

            <button
              onClick={goHome}
              className="text-left font-medium"
            >
              Home
            </button>

            <button
              onClick={goToSearch}
              className="text-left font-medium"
            >
              Search
            </button>

            <button
              onClick={goToMap}
              className="text-left font-medium"
            >
              Store Map
            </button>

            <button className="text-left font-medium">
              My List
            </button>

            <Link
              to="/about"
              onClick={() => setMobileMenu(false)}
              className="font-medium"
            >
              About
            </Link>

          </div>

        </div>
      )}

    </header>
  );
};

export default Header;