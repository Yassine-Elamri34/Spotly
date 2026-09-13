import {
  Home as HomeIcon,
  Search,
  Navigation,
  List,
} from "lucide-react";

const MobileBottomNav = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const goHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 shadow-[0_-5px_20px_rgba(15,23,42,0.05)] backdrop-blur md:hidden">

        <div className="grid grid-cols-4 px-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2">

          {/* HOME */}
          <button
            type="button"
            onClick={goHome}
            className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-blue-600 transition active:scale-90"
          >
            <HomeIcon size={22} />

            <span className="text-[11px] font-medium sm:text-xs">
              Home
            </span>
          </button>

          {/* SEARCH */}
          <button
            type="button"
            onClick={() =>
              scrollToSection("search-section")
            }
            className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-slate-600 transition hover:text-blue-600 active:scale-90"
          >
            <Search size={22} />

            <span className="text-[11px] font-medium sm:text-xs">
              Search
            </span>
          </button>

          {/* MAP */}
          <button
            type="button"
            onClick={() =>
              scrollToSection("store-map")
            }
            className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-slate-600 transition hover:text-blue-600 active:scale-90"
          >
            <Navigation size={22} />

            <span className="text-[11px] font-medium sm:text-xs">
              Map
            </span>
          </button>

          {/* LIST */}
          <button
            type="button"
            onClick={() =>
              scrollToSection("my-list")
            }
            className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-slate-600 transition hover:text-blue-600 active:scale-90"
          >
            <List size={22} />

            <span className="text-[11px] font-medium sm:text-xs">
              List
            </span>
          </button>

        </div>

      </nav>

      {/* SPACE SO CONTENT IS NOT HIDDEN BEHIND NAV */}
      <div className="h-24 md:hidden" />
    </>
  );
};

export default MobileBottomNav;