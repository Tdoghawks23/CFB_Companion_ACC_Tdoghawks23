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
    <div className="bg-bg-card rounded-2xl border border-acc-blue/12 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-acc-blue/10">
        <h2 className="font-[family-name:var(--font-oswald)] text-[17px] font-semibold uppercase tracking-[0.04em]">
          Latest Weekly Post
        </h2>
        <Link
          href="/weekly-post"
          className="flex items-center gap-1 text-acc-blue text-[13px] hover:underline"
        >
          Read Full Post <ChevronRight size={14} />
        </Link>
      </div>
      <div className="p-5 md:p-[26px_28px]">
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="bg-acc-gold/[0.16] text-acc-gold text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-[0.08em]">
            Week {week}
          </span>
          <span className="text-text-muted text-xs">{post.publishDate}</span>
        </div>
        <h3 className="font-[family-name:var(--font-oswald)] text-[23px] font-semibold leading-[1.15] mb-1.5">
          {post.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-3.5">{post.subtitle}</p>
        {firstTextSection?.content && (
          <p className="text-text-muted text-[13.5px] leading-relaxed line-clamp-3">
            {firstTextSection.content}
          </p>
        )}
      </div>
    </div>
  );
}
