import type { SeasonMeta } from "@/lib/types";

export default function SeasonBanner({ meta }: { meta: SeasonMeta }) {
  const phaseLabel: Record<string, string> = {
    preseason: "Preseason",
    regular: "Regular Season",
    postseason: "Postseason",
    offseason: "Offseason",
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-acc-navy via-bg-elevated to-acc-navy border border-acc-blue/20 p-8 md:p-12 mb-8">
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(75,156,211,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(75,156,211,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative flex flex-col md:flex-row items-center gap-6">
        <img
          src="/assets/acc-logo.svg"
          alt="ACC Conference"
          width={120}
          height={35}
          className="object-contain"
        />
        <div className="text-center md:text-left">
          <h1 className="font-[family-name:var(--font-oswald)] text-4xl md:text-5xl font-bold tracking-wide uppercase text-text-primary">
            CFB Companion
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
            <span className="bg-acc-blue/20 text-acc-blue px-3 py-1 rounded-full text-sm font-medium">
              Season {meta.currentSeason}
            </span>
            <span className="bg-acc-gold/20 text-acc-gold px-3 py-1 rounded-full text-sm font-medium">
              Week {meta.currentWeek}
            </span>
            <span className="bg-white/10 text-text-secondary px-3 py-1 rounded-full text-sm">
              {phaseLabel[meta.seasonPhase] || meta.seasonPhase}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
