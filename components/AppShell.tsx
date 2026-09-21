"use client";

import * as React from "react";
import { MotionConfig, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { Hero } from "@/components/Hero";
import { EpisodeDetail } from "@/components/EpisodeDetail";
import { getEpisode, type Episode } from "@/data/episodes";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * The two-column container: a persistent sidebar and a swapping main pane.
 *
 * The selected episode lives in the URL hash so a view can be linked and the
 * back button works, but the app itself stays a single client-side surface —
 * no route transition between episodes, just a fade.
 */
export function AppShell() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const mainRef = React.useRef<HTMLDivElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const openerRef = React.useRef<HTMLElement | null>(null);

  // Hash <-> state, both directions.
  React.useEffect(() => {
    const read = () => {
      const id = window.location.hash.replace(/^#\/?/, "");
      setSelectedId(getEpisode(id) ? id : null);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  React.useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [selectedId]);

  /**
   * Drawer behaves like a modal dialog: Escape closes it, focus moves inside
   * and returns to the opener afterwards, Tab is kept within it, and the page
   * behind it stops scrolling.
   */
  React.useEffect(() => {
    if (!drawerOpen) {
      openerRef.current?.focus();
      openerRef.current = null;
      return;
    }

    openerRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // A ref on a motion.div inside AnimatePresence does not reliably reach us,
    // so the panel is looked up by role instead — it is the only dialog here.
    const panel = () =>
      drawerRef.current ??
      document.querySelector<HTMLElement>('[role="dialog"]');

    const focusables = () =>
      Array.from(
        panel()?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    // Focus the panel itself rather than its first control: it puts a screen
    // reader at the top of the dialog, and Tab still lands on the first
    // control from there. Done synchronously — the panel is already mounted
    // and visible by the time this effect runs, and a rAF callback would never
    // arrive in a backgrounded tab.
    panel()?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      // The panel itself holds focus right after opening, so shift+Tab from
      // there has to wrap to the last control rather than escape backwards.
      const root = panel();
      const atStart =
        active === first || active === root || !root?.contains(active);
      if (e.shiftKey && atStart) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [drawerOpen]);

  const select = React.useCallback((episode: Episode) => {
    window.location.hash = `/${episode.id}`;
    setSelectedId(episode.id);
    setDrawerOpen(false);
  }, []);

  const goHome = React.useCallback(() => {
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
    setSelectedId(null);
    setDrawerOpen(false);
  }, []);

  const episode = getEpisode(selectedId);

  return (
    // `reducedMotion="user"` makes Framer Motion honour the OS setting, which
    // the CSS media query in globals.css cannot reach — those animations are
    // driven from JS, not from a stylesheet.
    <MotionConfig reducedMotion="user">
      <div className="flex h-dvh w-full overflow-hidden bg-background">
        <Sidebar
          selectedId={selectedId}
          onSelect={select}
          onHome={goHome}
          instanceId="rail"
          className="hidden w-[300px] shrink-0 lg:flex xl:w-[330px]"
        />

        {/* Mobile drawer.
            Always mounted and moved with a CSS transform instead of being
            added and removed through AnimatePresence. An exit animation would
            have to run to completion before React could unmount the panel, and
            a browser that has throttled rAF — any backgrounded tab — never
            finishes it, so the drawer would stay on screen after closing.
            `invisible` when closed also takes its controls out of the tab
            order, which unmounting used to do for free. */}
        <div
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
          className={cn(
            "fixed inset-0 z-40 bg-foreground/25 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden",
            drawerOpen ? "visible opacity-100" : "invisible opacity-0",
          )}
        />
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="에피소드 목록"
          aria-hidden={!drawerOpen}
          tabIndex={-1}
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-[86vw] max-w-[330px] shadow-2xl outline-none transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden",
            drawerOpen ? "visible translate-x-0" : "invisible -translate-x-full",
          )}
        >
          <Sidebar
            selectedId={selectedId}
            onSelect={select}
            onHome={goHome}
            instanceId="drawer"
            className="h-full"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDrawerOpen(false)}
            aria-label="메뉴 닫기"
            className="absolute right-2 top-3.5"
          >
            <X />
          </Button>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* No top bar: the left rail is the only chrome. On small screens
              the rail is a drawer, so its opener floats over the content. */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDrawerOpen(true)}
            aria-label="에피소드 목록 열기"
            className="fixed left-3 top-3 z-30 h-9 w-9 bg-background/90 backdrop-blur-sm lg:hidden"
          >
            <Menu />
          </Button>

          <main
            ref={mainRef}
            className="paper-grain flex min-h-0 flex-1 flex-col overflow-y-auto scrollbar-graphite"
          >
            {/* Keyed remount, deliberately without AnimatePresence: an exiting
              child would have to finish animating before the next one mounts,
              and a browser that has throttled rAF (a backgrounded tab) never
              lets it finish, leaving the pane stuck on the old view. Enter-only
              means the swap is instant and the fade is pure decoration. */}
            <motion.div
              key={episode?.id ?? "__home"}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: EASE }}
              // Grows to fill the pane so the home poster can centre itself.
              className="flex min-h-full flex-1 flex-col"
            >
              {episode ? (
                <EpisodeDetail episode={episode} onSelect={select} />
              ) : (
                <Hero />
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}
