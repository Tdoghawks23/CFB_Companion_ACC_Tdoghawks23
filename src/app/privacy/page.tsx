import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Privacy Policy — CFB Companion ACC",
  description:
    "Privacy policy for the CFB Companion ACC dynasty league companion app.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader title="Privacy Policy" subtitle="Last updated: July 18, 2026" />

      <div className="prose prose-invert prose-headings:font-[family-name:var(--font-oswald)] prose-headings:uppercase prose-headings:tracking-wide prose-a:text-acc-blue max-w-none text-text-secondary">
        <p>
          CFB Companion ACC (&ldquo;the app&rdquo;) is a free, fan-made
          companion for a private <em>EA Sports College Football</em> dynasty
          league run in the ACC After Dark Discord community. This policy
          explains what information the app does and does not handle.
        </p>

        <h2>The Short Version</h2>
        <p>
          The app has no user accounts, no login, and no database. It does{" "}
          <strong>not</strong> collect, store, sell, or share any personal
          information about you.
        </p>

        <h2>Information We Collect</h2>
        <p>
          <strong>None.</strong> The app displays static, fictional dynasty
          league content (standings, rankings, schedules, and weekly write-ups)
          that is stored as files within the app itself. It does not ask you for
          any information, does not use cookies, and does not run analytics or
          advertising trackers.
        </p>

        <h2>Hosting</h2>
        <p>
          The app is hosted on Vercel. Like virtually all web hosts, Vercel may
          automatically process standard technical request data (such as IP
          address and browser type) for operational, performance, and security
          purposes. This is handled by Vercel under its own privacy practices;
          the app does not receive, retain, or use that data.
        </p>

        <h2>Use Inside Discord</h2>
        <p>
          When the app is launched as a Discord Activity, it initializes the
          Discord Embedded App SDK only to signal that it has loaded. It does{" "}
          <strong>not</strong> request authorization to your Discord identity,
          and therefore does not receive or store your Discord username, account
          ID, email, or any other account information.
        </p>

        <h2>Children&rsquo;s Privacy</h2>
        <p>
          The app is intended for members of the dynasty league and collects no
          information from anyone, including children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          This policy may be updated from time to time. Any changes will be
          reflected on this page with a new &ldquo;last updated&rdquo; date.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be directed to Tdoghawks23 in the ACC
          After Dark Discord server.
        </p>
      </div>
    </div>
  );
}
