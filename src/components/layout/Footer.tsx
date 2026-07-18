import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hidden md:block bg-acc-navy/80 border-t border-acc-blue/10 py-6">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/assets/acc-logo.svg"
            alt="ACC"
            width={36}
            height={10}
            className="object-contain opacity-60"
          />
          <span className="text-text-muted text-sm">
            CFB Companion ACC &middot; Dynasty League
          </span>
        </div>
        <div className="flex items-center gap-4 text-text-muted text-xs">
          <Link href="/privacy" className="hover:text-acc-blue transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-acc-blue transition-colors">
            Terms
          </Link>
          <span>Season data updated manually via JSON</span>
        </div>
      </div>
    </footer>
  );
}
