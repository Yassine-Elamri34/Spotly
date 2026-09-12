import {
  Home as HomeIcon,
  Search,
  Navigation,
  List,
} from "lucide-react";

const MobileBottomNav = () => {
  const goHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goSearch = () => {
    document
      .getElementById("search-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const goMap = () => {
    document
      .getElementById("store-map")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4 border-t border-slate-200 bg-white px-3 pb-3 pt-3 shadow-[0_-5px_20px_rgba(15,23,42,0.05)] md:hidden">

        <button
          onClick={goHome}
          className="flex flex-col items-center gap-1 rounded-xl py-1 text-blue-600 transition active:scale-90"
        >

          <HomeIcon size={24} />

          <span className="text-xs">
            Home
          </span>

        </button>

        <button
          onClick={goSearch}
          className="flex flex-col items-center gap-1 rounded-xl py-1 text-slate-600 transition hover:text-blue-600 active:scale-90"
        >

          <Search size={24} />

          <span className="text-xs">
            Search
          </span>

        </button>

        <button
          onClick={goMap}
          className="flex flex-col items-center gap-1 rounded-xl py-1 text-slate-600 transition hover:text-blue-600 active:scale-90"
        >

          <Navigation size={24} />

          <span className="text-xs">
            Map
          </span>

        </button>

        <button className="flex flex-col items-center gap-1 rounded-xl py-1 text-slate-600 transition hover:text-blue-600 active:scale-90">

          <List size={24} />

          <span className="text-xs">
            List
          </span>

        </button>

      </nav>

      <div className="h-20 md:hidden" />
    </>
  );
};

export default MobileBottomNav;