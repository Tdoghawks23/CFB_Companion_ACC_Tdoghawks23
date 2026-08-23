interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  showLogo?: boolean;
}

export default function PageHeader({ title, subtitle, eyebrow, showLogo = true }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6 md:mb-8">
      {showLogo && (
        <img
          src="/assets/acc-logo.svg"
          alt="ACC"
          width={56}
          height={16}
          className="hidden sm:block object-contain"
        />
      )}
      <div>
        {eyebrow && (
          <div className="font-[family-name:var(--font-oswald)] text-[10px] tracking-[0.18em] uppercase text-acc-gold font-semibold mb-1">
            {eyebrow}
          </div>
        )}
        <h1 className="font-[family-name:var(--font-oswald)] text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-text-primary uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="text-text-secondary text-[12.5px] sm:text-sm mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
