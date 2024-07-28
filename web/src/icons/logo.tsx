export default function RefrigelLogo({
  color,
  size,
}: {
  color?: string;
  size?: string;
}) {
  return (
    <>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width={size ?? "101.000000pt"}
        height={size ?? "101.000000pt"}
        viewBox="0 0 101.000000 101.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,101.000000) scale(0.100000,-0.100000)"
          fill={color ?? "000"}
          stroke="none"
        >
          <path
            d="M0 505 l0 -505 50 0 50 0 0 455 0 455 405 0 405 0 0 -225 0 -225
                -137 0 -138 0 185 -185 185 -185 0 72 0 72 -63 63 -62 63 62 0 62 0 0 325 0
                325 -505 0 -505 0 0 -505z"
          />
          <path
            d="M180 415 l0 -415 50 0 50 0 0 365 0 365 225 0 225 0 0 -40 0 -40 
                -185 0 -185 0 0 -325 0 -325 50 0 50 0 0 275 0 275 185 0 185 0 0 140 0 140 
                -325 0 -325 0 0 -415z"
          />
          <path d="M540 370 l0 -75 148 -148 148 -148 72 0 72 0 -220 220 -220 220 0 -75z" />
          <path d="M540 116 l0 -75 148 -148 148 -148 72 0 72 0 -220 220 -220 220 0 -75z" />
        </g>
      </svg>
    </>
  );
}
