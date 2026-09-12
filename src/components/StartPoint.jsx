import {
  QrCode,
  CircleCheck,
} from "lucide-react";

const StartPoint = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

      <div className="flex items-center rounded-2xl border border-green-200 bg-green-50 px-5 py-4 transition duration-300 hover:shadow-md">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white">
          <QrCode size={27} />
        </div>

        <div className="ml-4 flex-1">

          <h3 className="font-bold text-green-700">
            Start Point
          </h3>

          <p className="text-slate-700">
            Entrance QR detected
          </p>

        </div>

        <CircleCheck
          size={35}
          className="fill-green-600 text-white"
        />

      </div>

    </section>
  );
};

export default StartPoint;