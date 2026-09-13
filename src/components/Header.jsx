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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMobileMenu(false);
  };

  const goHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setMobileMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-xl">

      {/* MAIN HEADER */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">

        {/* LOGO */}
        <div className="shrink-0">
          <SpotlyLogo />
        </div>

        {/* ================================= */}
        {/* DESKTOP NAVIGATION */}
        {/* ================================= */}

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8">

          <button
            type="button"
            onClick={goHome}
            className="whitespace-nowrap text-sm font-medium text-slate-600 transition hover:text-blue-600 xl:text-base"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection("search-section")
            }
            className="whitespace-nowrap text-sm font-medium text-slate-600 transition hover:text-blue-600 xl:text-base"
          >
            Search
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection("store-map")
            }
            className="whitespace-nowrap text-sm font-medium text-slate-600 transition hover:text-blue-600 xl:text-base"
          >
            Store Map
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection("my-list")
            }
            className="whitespace-nowrap text-sm font-medium text-slate-600 transition hover:text-blue-600 xl:text-base"
          >
            My List
          </button>

          <Link
            to="/about"
            className="whitespace-nowrap text-sm font-medium text-slate-600 transition hover:text-blue-600 xl:text-base"
          >
            About
          </Link>

        </nav>

        {/* ================================= */}
        {/* STORE - LARGE DESKTOP ONLY */}
        {/* ================================= */}

        <div className="hidden shrink-0 xl:block">

          <button
            type="button"
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-blue-50 px-4 py-2.5 text-sm font-semibold transition duration-200 hover:bg-blue-100 active:scale-95"
          >

            <Store
              size={18}
              className="shrink-0 text-blue-600"
            />

            <span>
              FreshMart Grocery
            </span>

            <ChevronDown
              size={16}
              className="shrink-0"
            />

          </button>

        </div>

        {/* ================================= */}
        {/* MOBILE / TABLET MENU BUTTON */}
        {/* ================================= */}

        <button
          type="button"
          aria-label={
            mobileMenu
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          onClick={() =>
            setMobileMenu((current) => !current)
          }
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 active:scale-90 lg:hidden"
        >
          {mobileMenu ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>

      {/* ================================= */}
      {/* MOBILE + TABLET MENU */}
      {/* ================================= */}

      {mobileMenu && (
        <div className="border-t border-slate-100 bg-white lg:hidden">

          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">

            {/* STORE */}
            <div className="mb-5">

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-2xl bg-blue-50 px-4 py-3.5"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                    <Store
                      size={19}
                      className="text-blue-600"
                    />
                  </div>

                  <div className="min-w-0 text-left">

                    <p className="text-xs text-slate-500">
                      Current store
                    </p>

                    <p className="truncate font-semibold text-slate-900">
                      FreshMart Grocery
                    </p>

                  </div>

                </div>

                <ChevronDown
                  size={18}
                  className="shrink-0 text-slate-500"
                />

              </button>

            </div>

            {/* LINKS */}
            <nav className="flex flex-col">

              <button
                type="button"
                onClick={goHome}
                className="rounded-xl px-3 py-3.5 text-left font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
              >
                Home
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollToSection("search-section")
                }
                className="rounded-xl px-3 py-3.5 text-left font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
              >
                Search
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollToSection("store-map")
                }
                className="rounded-xl px-3 py-3.5 text-left font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
              >
                Store Map
              </button>

              <button
                type="button"
                onClick={() =>
                  scrollToSection("my-list")
                }
                className="rounded-xl px-3 py-3.5 text-left font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
              >
                My List
              </button>

              <Link
                to="/about"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="rounded-xl px-3 py-3.5 font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
              >
                About
              </Link>

            </nav>

          </div>

        </div>
      )}

    </header>
  );
};

export default Header;