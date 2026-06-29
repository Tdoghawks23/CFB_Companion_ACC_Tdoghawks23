import Image from "next/image";

export default function Footer() {
  return (
    <footer className="hidden md:block bg-acc-navy/80 border-t border-acc-blue/10 py-6">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/acc-logo.png"
            alt="ACC"
            width={36}
            height={24}
            className="object-contain opacity-60"
          />
          <span className="text-text-muted text-sm">
            CFB Companion ACC &middot; Dynasty League
          </span>
        </div>
        <span className="text-text-muted text-xs">
          Season data updated manually via JSON
        </span>
      </div>
    </footer>
  );
}
