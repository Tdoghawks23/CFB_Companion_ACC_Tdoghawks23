import { clsx } from "clsx";
import { Quote, BarChart3, User } from "lucide-react";
import type { WeeklyPost, Team, PostSection } from "@/lib/types";
import TeamLogo from "@/components/shared/TeamLogo";

interface PostViewerProps {
  post: WeeklyPost;
  teamsMap: Map<string, Team>;
}

function TextSection({ section }: { section: PostSection }) {
  return (
    <div className="mb-8">
      <h3 className="font-[family-name:var(--font-oswald)] text-xl font-semibold mb-3 text-text-primary uppercase tracking-wide">
        {section.heading}
      </h3>
      <p className="text-text-secondary leading-relaxed">{section.content}</p>
    </div>
  );
}

function StatsSection({ section, teamsMap }: { section: PostSection; teamsMap: Map<string, Team> }) {
  return (
    <div className="mb-8">
      <h3 className="font-[family-name:var(--font-oswald)] text-xl font-semibold mb-3 text-text-primary uppercase tracking-wide flex items-center gap-2">
        <BarChart3 size={18} className="text-acc-blue" />
        {section.heading}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {section.stats?.map((stat) => {
          const team = teamsMap.get(stat.teamId);
          return (
            <div
              key={`${stat.playerName}-${stat.teamId}`}
              className="bg-bg-elevated rounded-lg p-4 border border-acc-blue/10"
              style={{ borderLeft: `3px solid ${team?.primaryColor || "#4B5563"}` }}
            >
              <div className="flex items-center gap-2 mb-2">
                {team && (
                  <TeamLogo abbreviation={team.abbreviation} primaryColor={team.primaryColor} size={24} />
                )}
                <div>
                  <div className="flex items-center gap-1">
                    <User size={12} className="text-text-muted" />
                    <span className="font-medium text-sm">{stat.playerName}</span>
                  </div>
                  {team && <span className="text-text-muted text-[10px]">{team.name}</span>}
                </div>
              </div>
              <p className="text-acc-blue text-sm font-mono font-medium">{stat.statLine}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HighlightSection({ section }: { section: PostSection }) {
  return (
    <div className="mb-8">
      <div className="bg-acc-gold/5 border-l-4 border-acc-gold rounded-r-lg p-5">
        <div className="flex items-start gap-3">
          <Quote size={20} className="text-acc-gold shrink-0 mt-0.5" />
          <div>
            <h3 className="font-[family-name:var(--font-oswald)] text-lg font-semibold mb-2 text-acc-gold uppercase">
              {section.heading}
            </h3>
            <p className="text-text-secondary leading-relaxed">{section.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PostViewer({ post, teamsMap }: PostViewerProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold tracking-wide text-text-primary">
          {post.title}
        </h2>
        <p className="text-text-secondary text-lg mt-2">{post.subtitle}</p>
        <div className="flex items-center gap-4 mt-4 text-text-muted text-sm">
          <span>By {post.author}</span>
          <span>&middot;</span>
          <span>{post.publishDate}</span>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-bg-elevated text-text-muted text-xs px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-acc-blue/10 pt-8">
        {post.sections.map((section, i) => {
          switch (section.type) {
            case "stats":
              return <StatsSection key={i} section={section} teamsMap={teamsMap} />;
            case "highlight":
              return <HighlightSection key={i} section={section} />;
            default:
              return <TextSection key={i} section={section} />;
          }
        })}
      </div>
    </div>
  );
}
