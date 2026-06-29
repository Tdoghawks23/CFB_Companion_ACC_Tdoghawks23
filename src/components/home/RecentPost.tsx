import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { WeeklyPost } from "@/lib/types";

interface RecentPostProps {
  post: WeeklyPost;
  week: number;
}

export default function RecentPost({ post, week }: RecentPostProps) {
  const firstTextSection = post.sections.find((s) => s.type === "text");

  return (
    <div className="bg-bg-card rounded-xl border border-acc-blue/10 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-acc-blue/10">
        <h2 className="font-[family-name:var(--font-oswald)] text-lg font-semibold uppercase tracking-wide">
          Latest Weekly Post
        </h2>
        <Link
          href="/weekly-post"
          className="flex items-center gap-1 text-acc-blue text-sm hover:underline"
        >
          Read Full Post <ChevronRight size={14} />
        </Link>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-acc-gold/20 text-acc-gold text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase">
            Week {week}
          </span>
          <span className="text-text-muted text-xs">{post.publishDate}</span>
        </div>
        <h3 className="font-[family-name:var(--font-oswald)] text-xl font-semibold mb-1">
          {post.title}
        </h3>
        <p className="text-text-secondary text-sm mb-3">{post.subtitle}</p>
        {firstTextSection?.content && (
          <p className="text-text-muted text-sm line-clamp-3">
            {firstTextSection.content}
          </p>
        )}
      </div>
    </div>
  );
}
