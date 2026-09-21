"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrandIcon } from "@/components/BrandIcon";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { SEASONS, type Episode } from "@/data/episodes";

const OWNER = "LJH2026";
const EMAIL = "honeymath.gbe@gmail.com";

/** Clipboard API needs a secure context; fall back to the old selection trick. */
async function copyText(value: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

export interface SidebarProps {
  selectedId: string | null;
  onSelect: (episode: Episode) => void;
  onHome: () => void;
  className?: string;
  /**
   * Distinguishes the desktop rail from the mobile drawer. Both are mounted at
   * once while the drawer is open, and a shared `layoutId` would make Framer
   * Motion treat their two markers as one element and fly it between them.
   */
  instanceId?: string;
}

export function Sidebar({
  selectedId,
  onSelect,
  onHome,
  className,
  instanceId = "rail",
}: SidebarProps) {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);
  const [open, setOpen] = React.useState<string[]>(["season-1"]);

  // Keep the selected episode's season expanded, including on deep links.
  React.useEffect(() => {
    if (!selectedId) return;
    const key = `season-${Number(selectedId.slice(1, 3))}`;
    setOpen((prev) => (prev.includes(key) ? prev : [...prev, key]));
  }, [selectedId]);

  const handleCopy = async () => {
    const ok = await copyText(EMAIL);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      toast({ title: "메일 주소가 복사되었습니다." });
    } else {
      toast({
        title: "복사에 실패했습니다.",
        description: EMAIL,
        variant: "destructive",
      });
    }
  };

  return (
    <aside
      className={cn(
        "paper-grain flex h-full flex-col border-r border-border bg-paper",
        className,
      )}
    >
      <button
        type="button"
        onClick={onHome}
        className="group flex items-center gap-3 border-b border-border px-5 py-4 text-left transition-colors hover:bg-accent/60"
      >
        <BrandIcon className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:-rotate-3" />
        <span className="min-w-0 truncate font-serif text-lg font-semibold leading-tight tracking-[0.06em]">
          BBB
        </span>
      </button>

      <ScrollArea className="min-h-0 flex-1 scrollbar-graphite">
        <nav aria-label="Episodes" className="px-3 py-2">
          <Accordion
            type="multiple"
            value={open}
            onValueChange={setOpen}
            className="w-full"
          >
            {SEASONS.map((season) => {
              const key = `season-${season.number}`;
              const active = season.episodes.some((e) => e.id === selectedId);
              return (
                <AccordionItem
                  key={key}
                  value={key}
                  className="border-b-border/60 last:border-b-0"
                >
                  <AccordionTrigger className="px-2 py-2 leading-[1.2] hover:no-underline">
                    <span className="flex min-w-0 items-baseline gap-2.5">
                      <span
                        className={cn(
                          "font-mono text-[0.7rem] tabular-nums tracking-widest text-muted-foreground transition-colors",
                          active && "text-foreground",
                        )}
                      >
                        S{season.number}
                      </span>
                      <span className="truncate font-medium">
                        {season.titleEn}
                      </span>
                      <span className="shrink-0 text-[0.68rem] text-muted-foreground">
                        {season.episodes.length} ep
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <ul className="space-y-0">
                      {season.episodes.map((episode) => {
                        const isActive = episode.id === selectedId;
                        return (
                          <li key={episode.id}>
                            <button
                              type="button"
                              onClick={() => onSelect(episode)}
                              data-active={isActive}
                              aria-current={isActive ? "page" : undefined}
                              className={cn(
                                "pencil-hatch group relative flex w-full items-baseline gap-2.5 rounded-sm px-2 py-1 text-left leading-[1.2] transition-colors",
                                isActive
                                  ? "text-foreground"
                                  : "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              {isActive ? (
                                <motion.span
                                  layoutId={`episode-marker-${instanceId}`}
                                  transition={{
                                    type: "spring",
                                    stiffness: 420,
                                    damping: 38,
                                  }}
                                  className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-foreground"
                                />
                              ) : null}
                              <span className="w-6 shrink-0 font-mono text-[0.68rem] tabular-nums opacity-70">
                                {String(episode.episode).padStart(2, "0")}
                              </span>
                              <span className="min-w-0 flex-1 truncate text-[0.82rem] leading-[1.2]">
                                {episode.titleEn}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </nav>
      </ScrollArea>

      <footer className="border-t border-border px-5 py-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
          {OWNER}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          title="Click to copy this address"
          className="pencil-underline group mt-1.5 flex max-w-full items-center gap-1.5 text-[0.78rem] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground"
        >
          <Mail className="h-3.5 w-3.5 shrink-0 opacity-60" />
          <span className="truncate">{EMAIL}</span>
          {copied ? (
            <Check className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <Copy className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
          )}
        </button>
      </footer>
    </aside>
  );
}
