import { stats } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function StatsBar({
  className,
  tone = "primary",
}: {
  className?: string;
  tone?: "primary" | "navy";
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 overflow-hidden rounded-xl md:grid-cols-4",
        tone === "primary"
          ? "bg-primary text-primary-foreground"
          : "bg-navy text-navy-foreground",
        className,
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex flex-col gap-1 border-current/15 p-6 odd:border-r md:border-r md:last:border-r-0 nth-[-n+2]:border-b"
        >
          <dt className="order-2 text-sm opacity-80">{stat.label}</dt>
          <dd className="order-1 font-mono text-3xl font-bold md:text-4xl">
            {stat.value.startsWith("+") ? (
              <>
                <span className="text-accent">+</span>
                {stat.value.slice(1)}
              </>
            ) : (
              stat.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
