import { Link } from "react-router-dom";

const SpotlyLogo = () => {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2"
    >
      {/* LOGO ICON */}
      <div className="spotly-logo-eye relative flex h-10 w-9 items-center justify-center">

        {/* BLUE OUTER SHAPE */}
        <div className="absolute h-8 w-8 rotate-45 rounded-[10px] bg-blue-600 transition duration-300 group-hover:scale-110" />

        {/* WHITE EYE */}
        <div className="spotly-eye-white absolute flex h-5 w-5 items-center justify-center rounded-full bg-white">

          {/* MOVING GREEN PUPIL */}
          <div className="spotly-pupil h-2.5 w-2.5 rounded-full bg-green-500" />

        </div>

      </div>

      {/* TEXT */}
      <span className="text-3xl font-bold tracking-tight text-blue-600">
        Spotly
      </span>
    </Link>
  );
};

export default SpotlyLogo;