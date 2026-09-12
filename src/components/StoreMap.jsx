import { Map } from "lucide-react";

const wallSections = [
  {
    name: "Meat",
    emoji: "🥩",
  },
  {
    name: "Deli",
    emoji: "🧀",
  },
  {
    name: "Dairy",
    emoji: "🥛",
  },
  {
    name: "Prepared Food",
    emoji: "🍱",
  },
];

const mapShelves = [
  {
    aisle: 7,
    name: "Pantry",
    emoji: "🍝",
    left: 180,
    top: 190,
    width: 190,
  },
  {
    aisle: 8,
    name: "Drinks",
    emoji: "🥤",
    left: 440,
    top: 190,
    width: 150,
  },
  {
    aisle: 9,
    name: "Personal Care",
    emoji: "🪥",
    left: 180,
    top: 315,
    width: 190,
  },
  {
    aisle: 10,
    name: "Pet",
    emoji: "🐶",
    left: 440,
    top: 315,
    width: 150,
  },
  {
    aisle: 11,
    name: "Baby",
    emoji: "👶",
    left: 180,
    top: 440,
    width: 190,
  },
  {
    aisle: 12,
    name: "Pharmacy",
    emoji: "💊",
    left: 440,
    top: 440,
    width: 150,
  },
];

const getMapLocation = (product) => {
  const text = `
    ${product?.name || ""}
    ${product?.category || ""}
    ${product?.section || ""}
  `.toLowerCase();

  const aisle = String(
    product?.aisle || ""
  );

  // PRODUCE
  if (
    text.includes("banana") ||
    text.includes("apple") ||
    text.includes("produce") ||
    aisle === "1"
  ) {
    return {
      x: 145,
      y: 275,
      route:
        "380,590 380,530 160,530 160,275 145,275",
    };
  }

  // DELI
  if (
    text.includes("cheese") ||
    text.includes("deli")
  ) {
    return {
      x: 325,
      y: 135,
      route:
        "380,590 380,530 405,530 405,150 325,150 325,135",
    };
  }

  // DAIRY
  if (
    text.includes("milk") ||
    text.includes("egg") ||
    text.includes("dairy") ||
    aisle === "2"
  ) {
    return {
      x: 435,
      y: 135,
      route:
        "380,590 380,530 405,530 405,150 435,150 435,135",
    };
  }

  // BAKERY
  if (
    text.includes("bread") ||
    text.includes("croissant") ||
    text.includes("bakery") ||
    aisle === "3"
  ) {
    return {
      x: 620,
      y: 270,
      route:
        "380,590 380,530 610,530 610,270 620,270",
    };
  }

  // MEAT
  if (
    text.includes("chicken") ||
    text.includes("beef") ||
    text.includes("meat") ||
    aisle === "4"
  ) {
    return {
      x: 215,
      y: 135,
      route:
        "380,590 380,530 405,530 405,150 215,150 215,135",
    };
  }

  // FROZEN / SEAFOOD
  if (
    text.includes("pizza") ||
    text.includes("fries") ||
    text.includes("shrimp") ||
    text.includes("seafood") ||
    text.includes("frozen") ||
    aisle === "5" ||
    aisle === "6"
  ) {
    return {
      x: 620,
      y: 470,
      route:
        "380,590 380,530 610,530 610,470 620,470",
    };
  }

  // PANTRY
  if (
    text.includes("rice") ||
    text.includes("pasta") ||
    text.includes("pantry") ||
    aisle === "7"
  ) {
    return {
      x: 390,
      y: 220,
      route:
        "380,590 380,530 405,530 405,220 390,220",
    };
  }

  // DRINKS
  if (
    text.includes("coffee") ||
    text.includes("tea") ||
    text.includes("drink") ||
    text.includes("beverage") ||
    aisle === "8"
  ) {
    return {
      x: 425,
      y: 220,
      route:
        "380,590 380,530 405,530 405,220 425,220",
    };
  }

  // PERSONAL CARE
  if (
    text.includes("toothpaste") ||
    text.includes("personal care") ||
    aisle === "9"
  ) {
    return {
      x: 390,
      y: 345,
      route:
        "380,590 380,530 405,530 405,345 390,345",
    };
  }

  // PET
  if (
    text.includes("dog") ||
    text.includes("cat") ||
    text.includes("pet") ||
    aisle === "10"
  ) {
    return {
      x: 425,
      y: 345,
      route:
        "380,590 380,530 405,530 405,345 425,345",
    };
  }

  // BABY
  if (
    text.includes("diaper") ||
    text.includes("baby") ||
    aisle === "11"
  ) {
    return {
      x: 390,
      y: 470,
      route:
        "380,590 380,530 405,530 405,470 390,470",
    };
  }

  // PHARMACY
  if (
    text.includes("medicine") ||
    text.includes("pharmacy") ||
    aisle === "12"
  ) {
    return {
      x: 425,
      y: 470,
      route:
        "380,590 380,530 405,530 405,470 425,470",
    };
  }

  // PREPARED FOOD
  if (
    text.includes("prepared") ||
    text.includes("ready meal") ||
    text.includes("ready-to-eat")
  ) {
    return {
      x: 545,
      y: 135,
      route:
        "380,590 380,530 405,530 405,150 545,150 545,135",
    };
  }

  // SANDWICH
  if (
    text.includes("sandwich")
  ) {
    return {
      x: 145,
      y: 455,
      route:
        "380,590 380,530 160,530 160,455 145,455",
    };
  }

  return {
    x: 405,
    y: 500,
    route:
      "380,590 380,530 405,530 405,500",
  };
};

const StoreMap = ({
  selectedProduct,
  navigationStarted,
  startNavigation,
}) => {
  const mapLocation =
    getMapLocation(selectedProduct);

  const routePath = mapLocation.route
    .trim()
    .split(/\s+/)
    .map((point, index) => {
      const [x, y] =
        point.split(",");

      return `${
        index === 0 ? "M" : "L"
      } ${x} ${y}`;
    })
    .join(" ");

  const checkouts = [
    {
      number: 1,
      left: 150,
    },
    {
      number: 2,
      left: 250,
    },
    {
      number: 3,
      left: 470,
    },
  ];

  return (
    <div id="store-map">

      {/* TITLE */}
      <div className="mb-4 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Store map
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            FreshMart Grocery • Main floor
          </p>

        </div>

        {navigationStarted && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            Navigation started
          </span>
        )}

      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="overflow-x-auto">

          {/* STORE CANVAS */}
          <div className="relative h-[650px] w-[760px] overflow-hidden rounded-3xl border-2 border-slate-300 bg-white">

            {/* STORE NAME */}
            <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-bold shadow-sm">
              FreshMart Grocery
            </div>

            {/* BACK WALL */}
            <div className="absolute left-[155px] top-[50px] z-10 grid h-[90px] w-[450px] grid-cols-4 gap-2">

              {wallSections.map(
                (section) => (
                  <div
                    key={section.name}
                    className="relative overflow-hidden rounded-xl border-2 border-cyan-100 bg-white shadow-sm"
                  >

                    <div className="flex h-[58px] items-center justify-center gap-2">

                      <span className="text-2xl">
                        {section.emoji}
                      </span>

                      <span className="text-xs font-bold">
                        {section.name}
                      </span>

                    </div>

                    {/* REFRIGERATOR DOORS */}
                    <div className="absolute bottom-0 left-0 right-0 grid h-[27px] grid-cols-3 gap-1 bg-cyan-50 p-1">

                      <div className="rounded border border-cyan-200 bg-white" />

                      <div className="rounded border border-cyan-200 bg-white" />

                      <div className="rounded border border-cyan-200 bg-white" />

                    </div>

                  </div>
                )
              )}

            </div>

            {/* WALKING CORRIDORS */}

            <div className="absolute left-[404px] top-[150px] h-[390px] border-l-2 border-dashed border-slate-200" />

            <div className="absolute left-[150px] top-[285px] w-[460px] border-t-2 border-dashed border-slate-200" />

            <div className="absolute left-[150px] top-[410px] w-[460px] border-t-2 border-dashed border-slate-200" />

            <div className="absolute left-[145px] top-[530px] w-[470px] border-t-2 border-dashed border-slate-200" />

            <div className="absolute left-[395px] top-[250px] text-sm font-bold text-slate-300">
              ↕
            </div>

            <div className="absolute left-[395px] top-[375px] text-sm font-bold text-slate-300">
              ↕
            </div>

            <div className="absolute left-[390px] top-[500px] whitespace-nowrap text-[8px] font-bold uppercase tracking-[2px] text-slate-300">
              Main aisle
            </div>

            {/* PRODUCE */}
            <div className="absolute left-[22px] top-[165px] z-10 flex h-[225px] w-[120px] flex-col items-center justify-center rounded-2xl border-2 border-green-100 bg-green-50 shadow-sm">

              <span className="text-5xl">
                🍎
              </span>

              <p className="mt-3 text-base font-bold">
                Produce
              </p>

              <p className="mt-1 text-center text-[10px] text-slate-500">
                Fruits & Vegetables
              </p>

              <div className="mt-5 flex gap-2 text-lg">

                <span>🍌</span>
                <span>🍎</span>
                <span>🥦</span>

              </div>

            </div>

            {/* SANDWICH */}
            <div className="absolute left-[22px] top-[410px] z-10 flex h-[105px] w-[120px] flex-col items-center justify-center rounded-2xl border-2 border-orange-100 bg-orange-50 shadow-sm">

              <span className="text-3xl">
                🥪
              </span>

              <p className="mt-1 font-bold">
                Sandwich
              </p>

              <p className="text-[9px] text-slate-500">
                Grab & Go
              </p>

            </div>

            {/* BAKERY */}
            <div className="absolute left-[620px] top-[165px] z-10 flex h-[225px] w-[115px] flex-col items-center justify-center rounded-2xl border-2 border-amber-100 bg-amber-50 shadow-sm">

              <span className="text-5xl">
                🥖
              </span>

              <p className="mt-3 text-base font-bold">
                Bakery
              </p>

              <p className="mt-1 text-center text-[10px] text-slate-500">
                Bread & Pastries
              </p>

              <div className="mt-4 flex gap-3">

                <span>🥐</span>
                <span>🍞</span>

              </div>

            </div>

            {/* FROZEN */}
            <div className="absolute left-[620px] top-[410px] z-10 flex h-[105px] w-[115px] flex-col items-center justify-center rounded-2xl border-2 border-cyan-200 bg-cyan-50 shadow-sm">

              <span className="text-3xl">
                ❄️
              </span>

              <p className="mt-1 font-bold">
                Frozen
              </p>

              <p className="text-[9px] text-slate-500">
                Frozen Foods
              </p>

              <div className="mt-2 flex gap-2">

                <span>🍕</span>
                <span>🍟</span>
                <span>🦐</span>

              </div>

            </div>

            {/* AISLES */}
            {mapShelves.map(
              (shelf) => (
                <div
                  key={shelf.aisle}
                  style={{
                    left: `${shelf.left}px`,
                    top: `${shelf.top}px`,
                    width: `${shelf.width}px`,
                  }}
                  className="absolute z-10 h-[72px]"
                >

                  <div className="absolute -top-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-[9px] font-bold text-white shadow-sm">
                    Aisle {shelf.aisle}
                  </div>

                  <div className="h-full rounded-xl border border-slate-300 bg-white shadow-md">

                    <div className="flex h-[28px] items-center justify-center gap-2 border-b border-slate-200">

                      <span>
                        {shelf.emoji}
                      </span>

                      <span className="text-xs font-bold">
                        {shelf.name}
                      </span>

                    </div>

                    <div className="space-y-1.5 px-3 pt-2">

                      <div className="h-[5px] rounded bg-slate-300" />

                      <div className="h-[5px] rounded bg-slate-300" />

                      <div className="h-[5px] rounded bg-slate-300" />

                    </div>

                  </div>

                </div>
              )
            )}

            {/* CUSTOMER SERVICE */}
            <div className="absolute bottom-[20px] left-[20px] z-10 flex h-[70px] w-[105px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">

              <span className="text-xl">
                ℹ️
              </span>

              <span className="mt-1 text-[9px] font-bold">
                Customer Service
              </span>

            </div>

            {/* CHECKOUT LABEL */}
            <div className="absolute bottom-[20px] left-[150px] z-10">

              <p className="absolute -top-5 left-0 whitespace-nowrap text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Checkout area
              </p>

            </div>

            {/* CHECKOUTS */}
            {checkouts.map(
              (checkout) => (
                <div
                  key={checkout.number}
                  style={{
                    left: `${checkout.left}px`,
                  }}
                  className="absolute bottom-[20px] z-10 flex h-[55px] w-[80px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white shadow-sm"
                >

                  <span>
                    🛒
                  </span>

                  <div>

                    <p className="text-[8px] text-slate-400">
                      Checkout
                    </p>

                    <p className="font-bold">
                      {checkout.number}
                    </p>

                  </div>

                </div>
              )
            )}

            {/* ENTRANCE */}
            <div className="absolute bottom-[15px] left-[395px] z-20 flex h-[80px] w-[90px] -translate-x-1/2 flex-col items-center justify-center rounded-xl border-2 border-green-300 bg-green-50 shadow-sm">

              <span className="text-2xl">
                🚪
              </span>

              <p className="font-bold text-green-700">
                Entrance
              </p>

              <p className="text-[8px] text-green-600">
                Scan QR here
              </p>

            </div>

            {/* EXIT */}
            <div className="absolute bottom-[20px] right-[18px] z-10 flex h-[55px] w-[72px] items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold shadow-sm">
              Exit →
            </div>

            {/* ROUTE */}
            {navigationStarted && (
              <svg
                className="pointer-events-none absolute inset-0 z-30 h-full w-full"
                viewBox="0 0 760 650"
              >

                {/* WHITE BORDER */}
                <path
                  d={routePath}
                  fill="none"
                  stroke="white"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* BLUE ROUTE */}
                <path
                  d={routePath}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* MOVING ARROW 1 */}
                <g>

                  <path
                    d="M -5 -4 L 5 0 L -5 4 Z"
                    fill="white"
                    stroke="#2563eb"
                    strokeWidth="1"
                  />

                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    rotate="auto"
                    path={routePath}
                  />

                </g>

                {/* MOVING ARROW 2 */}
                <g>

                  <path
                    d="M -5 -4 L 5 0 L -5 4 Z"
                    fill="white"
                    stroke="#2563eb"
                    strokeWidth="1"
                  />

                  <animateMotion
                    dur="3s"
                    begin="-1.5s"
                    repeatCount="indefinite"
                    rotate="auto"
                    path={routePath}
                  />

                </g>

              </svg>
            )}

            {/* YOU ARE HERE */}
            <div
              className="absolute z-40"
              style={{
                left: "380px",
                top: "590px",
              }}
            >

              <div className="relative -translate-x-1/2 -translate-y-1/2">

                <div className="absolute -inset-2 animate-ping rounded-full bg-blue-400/30" />

                <div className="relative h-5 w-5 rounded-full border-4 border-white bg-blue-600 shadow-lg" />

              </div>

              <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-2 py-1 text-[8px] font-semibold text-white shadow">
                You are here
              </span>

            </div>

            {/* DESTINATION */}
            {navigationStarted && (
              <div
                className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${mapLocation.x}px`,
                  top: `${mapLocation.y}px`,
                }}
              >

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-2.5 py-1 text-[9px] font-semibold text-white shadow-md">
                  {selectedProduct.emoji}{" "}
                  {selectedProduct.name}
                </div>

                <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-blue-400/25" />

                <div className="relative h-5 w-5 rounded-full border-4 border-white bg-blue-600 shadow-lg" />

              </div>
            )}

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={startNavigation}
          className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-blue-600 py-3.5 font-semibold text-blue-600 transition duration-200 hover:bg-blue-600 hover:text-white active:scale-[0.98]"
        >

          <Map size={22} />

          {navigationStarted
            ? `Route to ${selectedProduct.name}`
            : "Browse Store Map"}

        </button>

      </div>

    </div>
  );
};

export default StoreMap;