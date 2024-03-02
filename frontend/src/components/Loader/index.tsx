export default function Loader({
  width = 10,
  height = 10,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <div className={`relative flex items-center w-${width} h-${height}`}>
      <svg className="absolute animate-spin" viewBox="25 25 50 50">
        <circle
          className="animate-loading [stroke-dasharray:1,200] [stroke-dashoffset:0] [stroke-linecap:round]"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
}
