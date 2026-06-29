import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
}

export default function PageHeader({ title, subtitle, showLogo = true }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      {showLogo && (
        <Image
          src="/assets/acc-logo.png"
          alt="ACC"
          width={56}
          height={38}
          className="object-contain"
        />
      )}
      <div>
        <h1 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold tracking-wide text-text-primary uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="text-text-secondary text-sm mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
