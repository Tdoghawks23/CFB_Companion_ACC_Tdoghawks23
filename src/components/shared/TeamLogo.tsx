interface TeamLogoProps {
  abbreviation: string;
  primaryColor: string;
  size?: number;
}

export default function TeamLogo({ abbreviation, primaryColor, size = 40 }: TeamLogoProps) {
  return (
    <div
      className="flex items-center justify-center rounded-lg font-[family-name:var(--font-oswald)] font-bold text-white shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: primaryColor,
        fontSize: size * 0.3,
      }}
    >
      {abbreviation}
    </div>
  );
}
