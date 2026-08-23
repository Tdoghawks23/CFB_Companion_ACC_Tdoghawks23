import TeamLogo from "@/components/shared/TeamLogo";

const SIZES = {
  xs: 26,
  sm: 32,
  md: 40,
  xl: 64,
} as const;

interface TeamTileProps {
  abbreviation: string;
  primaryColor: string;
  size?: keyof typeof SIZES;
}

/**
 * Named-size wrapper around TeamLogo so new components reference `xs / sm /
 * md / xl` (the scale used throughout the v2 spec) instead of ad hoc pixel
 * values. TeamLogo remains the single rendering implementation.
 */
export default function TeamTile({ abbreviation, primaryColor, size = "sm" }: TeamTileProps) {
  return (
    <TeamLogo abbreviation={abbreviation} primaryColor={primaryColor} size={SIZES[size]} />
  );
}
