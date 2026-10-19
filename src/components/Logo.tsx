import React from "react";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark"; // "light" means white text for dark bg, "dark" means dark blue text for light bg.
}

export default function Logo({
  className = "w-48",
  variant = "light",
}: LogoProps) {
  const isDark = variant === "dark";
  const mainColor = isDark ? "#0b2e59" : "#ffffff";
  const slotColor = isDark ? "#ffffff" : "#0b2e59";
  const boltColor = "#ffb703";

  return (
    <svg
      viewBox="0 0 580 135"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <mask id="bolt-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          {/* The thick black stroke creates the gap between the A and the lightning bolt */}
          <path
            d="M 140 25 L 85 75 H 120 L 95 125 L 150 65 H 110 Z"
            fill="black"
            stroke="black"
            strokeWidth="10"
            strokeLinejoin="round"
          />
        </mask>

        <filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow
            dx="2"
            dy="3"
            stdDeviation="3"
            floodColor="#000000"
            floodOpacity={isDark ? "0.15" : "0"}
          />
        </filter>
      </defs>

      {/* Main Symbol Group */}
      <g filter="url(#logo-shadow)">
        <g mask="url(#bolt-mask)">
          {/* The 'A' shape */}
          <path
            d="M 100 15 L 145 15 L 195 100 L 155 100 L 121 50 L 85 100 L 45 100 Z"
            fill={mainColor}
          />

          {/* Plug Body */}
          <rect x="25" y="65" width="40" height="30" rx="4" fill={mainColor} />

          {/* Plug Ribs */}
          <rect
            x="35"
            y="65"
            width="3"
            height="30"
            fill={slotColor}
            opacity="0.9"
          />
          <rect
            x="45"
            y="65"
            width="3"
            height="30"
            fill={slotColor}
            opacity="0.9"
          />
        </g>

        {/* Yellow Lightning Bolt */}
        <path
          d="M 140 25 L 85 75 H 120 L 95 125 L 150 65 H 110 Z"
          fill={boltColor}
        />

        {/* Yellow Plug Prongs */}
        <rect x="12" y="72" width="16" height="5" fill={boltColor} rx="1.5" />
        <rect x="12" y="83" width="16" height="5" fill={boltColor} rx="1.5" />
      </g>

      {/* Main Text Custom Tuned for Aspect and Impact */}
      <text
        x="385"
        y="65"
        textAnchor="middle"
        fontFamily="'Inter', 'Space Grotesk', system-ui, sans-serif"
        fontWeight="900"
        fontSize="48"
        fill={mainColor}
        letterSpacing="0.5"
      >
        AYA ELEKTRİK
      </text>

      {/* Subtext */}
      <text
        x="385"
        y="98"
        textAnchor="middle"
        fontFamily="'Inter', system-ui, sans-serif"
        fontWeight="600"
        fontSize="17"
        fill={mainColor}
        letterSpacing="3.5"
      >
        Elektrik Hizmetleri
      </text>

      {/* Subtext flank lines */}
      <line
        x1="210"
        y1="92"
        x2="255"
        y2="92"
        stroke={boltColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="515"
        y1="92"
        x2="560"
        y2="92"
        stroke={boltColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
