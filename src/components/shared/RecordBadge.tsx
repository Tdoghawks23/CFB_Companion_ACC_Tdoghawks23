import { clsx } from "clsx";

interface RecordBadgeProps {
  wins: number;
  losses: number;
  label?: string;
  size?: "sm" | "md";
}

export default function RecordBadge({ wins, losses, label, size = "md" }: RecordBadgeProps) {
  return (
    <div className="flex items-center gap-1.5">
      {label && <span className="text-text-muted text-xs">{label}</span>}
      <span
        className={clsx(
          "font-[family-name:var(--font-oswald)] font-semibold",
          size === "sm" ? "text-sm" : "text-base"
        )}
      >
        {wins}-{losses}
      </span>
    </div>
  );
}
