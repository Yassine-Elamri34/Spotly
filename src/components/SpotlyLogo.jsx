import { useState } from "react";
import { Link } from "react-router-dom";

const SpotlyLogo = () => {
  const [pupilPosition, setPupilPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const centerX =
      rect.left + rect.width / 2;

    const centerY =
      rect.top + rect.height / 2;

    const deltaX =
      event.clientX - centerX;

    const deltaY =
      event.clientY - centerY;

    const distance =
      Math.sqrt(
        deltaX * deltaX +
        deltaY * deltaY
      );

    const maxMovement = 4;

    if (distance === 0) {
      return;
    }

    const movement =
      Math.min(
        distance,
        maxMovement
      );

    setPupilPosition({
      x:
        (deltaX / distance) *
        movement,

      y:
        (deltaY / distance) *
        movement,
    });
  };

  const resetPupil = () => {
    setPupilPosition({
      x: 0,
      y: 0,
    });
  };

  return (
    <Link
      to="/"
      aria-label="Spotly home"
      className="group flex items-center gap-2.5"
    >

      {/* ================================= */}
      {/* INTERACTIVE LOGO */}
      {/* ================================= */}

      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={resetPupil}
        className="spotly-logo-container relative flex h-11 w-11 shrink-0 items-center justify-center"
      >

        {/* SOFT GLOW */}
        <div className="spotly-logo-glow absolute inset-1 rounded-full bg-blue-400/20 blur-md" />

        {/* SCANNING RING */}
        <div className="spotly-scan-ring absolute inset-0 rounded-full border border-blue-300/40" />

        {/* BLUE OUTER SHAPE */}
        <div className="spotly-logo-shape absolute flex h-9 w-9 rotate-45 items-center justify-center rounded-[11px] bg-blue-600 shadow-md transition duration-300 group-hover:scale-110 group-hover:shadow-lg">

          {/* SECONDARY GREEN ACCENT */}
          <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500 shadow-sm" />

        </div>

        {/* ================================= */}
        {/* EYE */}
        {/* ================================= */}

        <div className="spotly-eye absolute flex h-[22px] w-[22px] items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">

          {/* EYELID */}
          <div className="spotly-eyelid absolute inset-0 z-20 bg-blue-600" />

          {/* PUPIL */}
          <div
            className="spotly-pupil relative z-10 flex h-[11px] w-[11px] items-center justify-center rounded-full bg-green-500 transition-transform duration-100 ease-out"
            style={{
              transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            }}
          >

            {/* PUPIL HIGHLIGHT */}
            <div className="absolute left-[2px] top-[2px] h-[3px] w-[3px] rounded-full bg-white/90" />

          </div>

        </div>

        {/* SMALL SPARKLE */}
        <div className="spotly-sparkle absolute -right-0.5 top-0 h-1.5 w-1.5 rounded-full bg-green-400" />

      </div>

      {/* ================================= */}
      {/* WORDMARK */}
      {/* ================================= */}

      <div className="flex items-center">

        <span className="spotly-wordmark text-[1.75rem] font-extrabold tracking-[-0.04em] text-blue-600 sm:text-3xl">
          Spotly
        </span>

        {/* LITTLE ACTIVE DOT */}
        <span className="ml-1 mt-3 h-1.5 w-1.5 rounded-full bg-green-500 transition duration-300 group-hover:scale-150" />

      </div>

    </Link>
  );
};

export default SpotlyLogo;