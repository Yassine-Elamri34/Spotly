import {
  QrCode,
  CircleCheck,
} from "lucide-react";

const StartPoint = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3.5 transition duration-300 hover:shadow-md sm:gap-4 sm:px-5 sm:py-4">

        {/* QR ICON */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500 text-white sm:h-14 sm:w-14">

          <QrCode
            size={24}
            className="sm:h-[27px] sm:w-[27px]"
          />

        </div>

        {/* TEXT */}
        <div className="min-w-0 flex-1">

          <h3 className="text-sm font-bold text-green-700 sm:text-base">
            Start Point
          </h3>

          <p className="mt-0.5 break-words text-sm text-slate-700 sm:text-base">
            Entrance QR detected
          </p>

        </div>

        {/* CHECK */}
        <CircleCheck
          size={30}
          className="shrink-0 fill-green-600 text-white sm:h-[35px] sm:w-[35px]"
        />

      </div>

    </section>
  );
};

export default StartPoint;