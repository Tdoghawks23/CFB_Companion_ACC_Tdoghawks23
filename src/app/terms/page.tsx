import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Terms of Service — CFB Companion ACC",
  description:
    "Terms of service for the CFB Companion ACC dynasty league companion app.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-10">
      <PageHeader title="Terms of Service" subtitle="Last updated: July 18, 2026" />

      <div className="prose prose-invert prose-headings:font-[family-name:var(--font-oswald)] prose-headings:uppercase prose-headings:tracking-wide prose-a:text-acc-blue max-w-none text-text-secondary">
        <p>
          These terms govern your use of CFB Companion ACC (&ldquo;the
          app&rdquo;), a free, fan-made companion for a private{" "}
          <em>EA Sports College Football</em> dynasty league run in the ACC
          After Dark Discord community. By using the app, you agree to these
          terms.
        </p>

        <h2>Use of the App</h2>
        <p>
          The app is provided free of charge for the personal, non-commercial
          use of the dynasty league&rsquo;s members and guests. You agree to use
          it lawfully and not to attempt to disrupt, misuse, or gain
          unauthorized access to it.
        </p>

        <h2>Content</h2>
        <p>
          All league data shown in the app (standings, rankings, schedules, and
          write-ups) is fictional content created for the dynasty league and is
          for entertainment purposes only.
        </p>

        <h2>Non-Affiliation</h2>
        <p>
          The app is an independent fan project. It is{" "}
          <strong>not</strong> affiliated with, endorsed by, sponsored by, or
          associated with the Atlantic Coast Conference (ACC), Electronic Arts /
          EA Sports, Discord, or any college, university, or athletic program.
          All team names, mascots, logos, and related marks are the property of
          their respective owners and are used here only for identification and
          informational purposes.
        </p>

        <h2>No Warranty</h2>
        <p>
          The app is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo;
          without warranties of any kind. Data may be incomplete, delayed, or
          inaccurate, and the app may be unavailable at times. You use it at your
          own discretion.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, the app&rsquo;s operator is
          not liable for any damages arising out of your use of, or inability to
          use, the app.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          These terms may be updated from time to time. Any changes will be
          reflected on this page with a new &ldquo;last updated&rdquo; date.
          Continued use of the app after changes constitutes acceptance of the
          updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be directed to Tdoghawks23 in the ACC
          After Dark Discord server.
        </p>
      </div>
    </div>
  );
}
