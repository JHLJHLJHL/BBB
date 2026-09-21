import type { Episode, Season } from "@/data/types";
import { season1 } from "@/data/season1";
import { season2 } from "@/data/season2";
import { season3 } from "@/data/season3";
import { season4 } from "@/data/season4";
import { season5 } from "@/data/season5";

export type { Episode, Season, EpisodeSketch, TriviaItem } from "@/data/types";

export const SEASONS: Season[] = [season1, season2, season3, season4, season5];

export const EPISODES: Episode[] = SEASONS.flatMap((s) => s.episodes);

const BY_ID = new Map(EPISODES.map((e) => [e.id, e]));

export function getEpisode(id: string | null | undefined): Episode | undefined {
  return id ? BY_ID.get(id) : undefined;
}

/** Previous / next across season boundaries, for the detail-view footer. */
export function getNeighbours(id: string) {
  const index = EPISODES.findIndex((e) => e.id === id);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? EPISODES[index - 1] : undefined,
    next: index < EPISODES.length - 1 ? EPISODES[index + 1] : undefined,
  };
}

export function formatCode(episode: Episode) {
  return `S${String(episode.season).padStart(2, "0")}E${String(
    episode.episode,
  ).padStart(2, "0")}`;
}

export const TOTAL_EPISODES = EPISODES.length;
