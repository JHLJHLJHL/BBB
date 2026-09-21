import type { MotifId } from "@/components/sketch/motifs";

/** Where inside the detail view a plate is dropped. */
export type SketchSlot = "plot" | "meaning" | "trivia";

export interface EpisodeSketch {
  motif: MotifId;
  /** Overrides the motif's default caption with an episode-specific one. */
  caption: string;
  slot: SketchSlot;
}

export interface TriviaItem {
  /** Where the item is generally circulated — shown as a small label. */
  source: string;
  text: string;
}

export interface RedditQuestion {
  /** The question as it keeps coming back on r/breakingbad. */
  question: string;
  /**
   * The answer, deliberately sealed inside this episode's own timeline: it may
   * use anything already shown up to and including this episode and nothing
   * that comes after it.
   */
  answer: string;
}

export interface EpisodeQuote {
  /** Who says it, in Korean. */
  speaker: string;
  /** The line as spoken. Kept short — quoted here for commentary. */
  en: string;
  /** Korean rendering, aiming at the tone rather than the grammar. */
  ko: string;
  /** What is happening around it, and why the line keeps getting quoted. */
  context: string;
}

export interface Episode {
  /** "s01e01" — also the value carried in the URL hash. */
  id: string;
  season: number;
  episode: number;
  titleEn: string;
  titleKo: string;
  /** ISO date of the original US broadcast. */
  airDate: string;
  writers: string;
  director: string;
  /** One line shown under the header and in search results. */
  logline: string;
  plot: string[];
  titleMeaning: string[];
  trivia: TriviaItem[];
  /** The lines from this episode that fan discussion keeps returning to. */
  quotes?: EpisodeQuote[];
  /**
   * How the episode landed: ratings, the critical verdict at the time, where
   * it sits in the retrospective rankings, and what the discussion settled on.
   */
  reception?: string[];
  /** Omitted when the episode has no recurring question worth answering. */
  redditQuestions?: RedditQuestion[];
  sketches: EpisodeSketch[];
}

export interface Season {
  number: number;
  /** Shown in the sidebar, which navigates in English. */
  titleEn: string;
  titleKo: string;
  years: string;
  summary: string;
  episodes: Episode[];
}
