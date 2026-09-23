"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Clapperboard, PenTool } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sketch } from "@/components/sketch/Sketch";
import { cn } from "@/lib/utils";
import {
  formatCode,
  getNeighbours,
  type Episode,
  type EpisodeSketch,
} from "@/data/episodes";

const section = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  }),
};

function SectionHeading({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className="mb-5 flex items-baseline gap-3 border-b border-border pb-2.5">
      <span className="font-mono text-[0.68rem] tabular-nums tracking-[0.2em] text-muted-foreground">
        {index}
      </span>
      <span className="font-serif text-xl font-semibold tracking-tight">
        {children}
      </span>
    </h2>
  );
}

/** Drops plates between paragraphs instead of stacking them at the end. */
function interleave(
  paragraphs: string[],
  sketches: EpisodeSketch[],
  plateNumber: (s: EpisodeSketch) => number,
  after = 1,
) {
  const out: React.ReactNode[] = [];
  let used = 0;
  paragraphs.forEach((text, i) => {
    out.push(
      <p key={`p-${i}`} className="mb-3.5 last:mb-0">
        {text}
      </p>,
    );
    const due = i === after || (i > after && (i - after) % 2 === 0);
    if (due && used < sketches.length) {
      const s = sketches[used++];
      out.push(
        <Sketch
          key={`s-${s.motif}-${used}`}
          motif={s.motif}
          caption={s.caption}
          index={plateNumber(s)}
        />,
      );
    }
  });
  while (used < sketches.length) {
    const s = sketches[used++];
    out.push(
      <Sketch
        key={`s-tail-${s.motif}-${used}`}
        motif={s.motif}
        caption={s.caption}
        index={plateNumber(s)}
      />,
    );
  }
  return out;
}

export interface EpisodeDetailProps {
  episode: Episode;
  onSelect: (episode: Episode) => void;
}

export function EpisodeDetail({ episode, onSelect }: EpisodeDetailProps) {
  const { prev, next } = getNeighbours(episode.id);

  const plateIndex = React.useMemo(() => {
    const map = new Map<EpisodeSketch, number>();
    episode.sketches.forEach((s, i) => map.set(s, i + 1));
    return map;
  }, [episode]);
  const numberOf = (s: EpisodeSketch) => plateIndex.get(s) ?? 1;

  const bySlot = (slot: EpisodeSketch["slot"]) =>
    episode.sketches.filter((s) => s.slot === slot);

  return (
    <article className="mx-auto w-full max-w-[860px] px-6 pb-12 pt-16 sm:px-10 sm:pt-12 lg:pb-16 lg:pt-16">
      <motion.header
        custom={0}
        initial="hidden"
        animate="show"
        variants={section}
      >
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">
          {formatCode(episode)}
        </p>
        <h1 className="mt-4 font-serif text-[2.1rem] font-semibold leading-[1.15] tracking-tight text-balance sm:text-[2.6rem]">
          {episode.titleEn}
        </h1>
        <p className="mt-2 font-serif text-xl text-muted-foreground">
          {episode.titleKo}
        </p>
        <p className="mt-6 max-w-2xl border-l-2 border-foreground/25 pl-4 text-[0.95rem] italic leading-[1.45] text-muted-foreground">
          {episode.logline}
        </p>

        <dl className="mt-7 flex flex-wrap gap-x-7 gap-y-2.5 text-[0.76rem] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 opacity-60" />
            <dt className="sr-only">방영일</dt>
            <dd className="font-mono tabular-nums">{episode.airDate}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <PenTool className="h-3.5 w-3.5 opacity-60" />
            <dt className="sr-only">각본</dt>
            <dd>{episode.writers}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Clapperboard className="h-3.5 w-3.5 opacity-60" />
            <dt className="sr-only">연출</dt>
            <dd>{episode.director}</dd>
          </div>
        </dl>
      </motion.header>

      <Separator className="my-10" />

      <motion.section
        custom={1}
        initial="hidden"
        animate="show"
        variants={section}
        className="text-[0.97rem] leading-[1.45]"
      >
        <SectionHeading index="01">줄거리</SectionHeading>
        {interleave(episode.plot, bySlot("plot"), numberOf)}
      </motion.section>

      <motion.section
        custom={2}
        initial="hidden"
        animate="show"
        variants={section}
        className="mt-14 text-[0.97rem] leading-[1.45]"
      >
        <SectionHeading index="02">제목의 의미</SectionHeading>
        {interleave(episode.titleMeaning, bySlot("meaning"), numberOf, 0)}
      </motion.section>

      {episode.quotes?.length ? (
        <motion.section
          custom={3}
          initial="hidden"
          animate="show"
          variants={section}
          className="mt-14"
        >
          <SectionHeading index="03">명대사</SectionHeading>
          <div className="space-y-7">
            {episode.quotes.map((q, i) => (
              <figure key={i} className="pencil-hatch rounded-sm px-4 py-3">
                <blockquote className="border-l-2 border-foreground/30 pl-4">
                  <p className="font-serif text-[1.05rem] italic leading-[1.5]">
                    &ldquo;{q.en}&rdquo;
                  </p>
                  <p className="mt-2 text-[0.94rem] leading-[1.45] text-muted-foreground">
                    {q.ko}
                  </p>
                </blockquote>
                <figcaption className="mt-2 pl-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                  — {q.speaker}
                </figcaption>
                <p className="mt-3 pl-4 text-[0.9rem] leading-[1.45] text-muted-foreground">
                  {q.context}
                </p>
              </figure>
            ))}
          </div>
        </motion.section>
      ) : null}

      {episode.reception?.length ? (
        <motion.section
          custom={4}
          initial="hidden"
          animate="show"
          variants={section}
          className="mt-14 text-[0.97rem] leading-[1.45]"
        >
          <SectionHeading index="04">방영 당시와 그 후</SectionHeading>
          {episode.reception.map((para, i) => (
            <p key={i} className="mb-3.5 last:mb-0">
              {para}
            </p>
          ))}
        </motion.section>
      ) : null}

      <motion.section
        custom={5}
        initial="hidden"
        animate="show"
        variants={section}
        className="mt-14"
      >
        <SectionHeading index="05">비하인드 스토리 · 커뮤니티 이슈</SectionHeading>
        <ul className="space-y-6">
          {episode.trivia.map((item, i) => (
            <li
              key={i}
              className="pencil-hatch rounded-sm px-3 py-2.5 transition-colors"
            >
              <p className="font-mono text-[0.63rem] uppercase tracking-[0.18em] text-muted-foreground">
                {item.source}
              </p>
              <p className="mt-1.5 text-[0.94rem] leading-[1.45]">{item.text}</p>
            </li>
          ))}
        </ul>
        {bySlot("trivia").map((s) => (
          <Sketch
            key={s.motif}
            motif={s.motif}
            caption={s.caption}
            index={numberOf(s)}
          />
        ))}
      </motion.section>

      {episode.redditQuestions?.length ? (
        <motion.section
          custom={6}
          initial="hidden"
          animate="show"
          variants={section}
          className="mt-14"
        >
          <SectionHeading index="06">자주 나오는 질문</SectionHeading>
          <p className="mb-6 text-[0.8rem] leading-[1.5] text-muted-foreground">
            레딧·팬덤 포럼에서 이 회차를 두고 반복해서 올라오는 질문들입니다.
            답은 이 회차까지 방송된 내용만으로 씁니다. 뒤 회차의 전개는 들어 있지
            않으니 처음 보는 중에 읽어도 됩니다.
          </p>
          <dl className="space-y-6">
            {episode.redditQuestions.map((item, i) => (
              <div
                key={i}
                className="pencil-hatch rounded-sm border-l-2 border-foreground/20 px-4 py-2.5 transition-colors"
              >
                <dt className="text-[0.92rem] font-medium leading-[1.45]">
                  {item.question}
                </dt>
                <dd className="mt-2 text-[0.92rem] leading-[1.45] text-muted-foreground">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </motion.section>
      ) : null}

      <motion.nav
        custom={7}
        initial="hidden"
        animate="show"
        variants={section}
        className="mt-14 grid gap-2 border-t border-border pt-6 sm:grid-cols-2"
      >
        {[prev, next].map((target, i) => {
          const isPrev = i === 0;
          if (!target) return <span key={i} className="hidden sm:block" />;
          return (
            <Button
              key={target.id}
              variant="outline"
              onClick={() => onSelect(target)}
              title={`${formatCode(target)} · ${target.titleKo}`}
              className={cn(
                // One row, fixed height: the label truncates instead of
                // wrapping, so a narrow pane cannot make the button grow.
                "pencil-hatch h-9 w-full min-w-0 justify-start gap-2 px-3 text-left",
                !isPrev && "sm:justify-end",
              )}
            >
              {isPrev ? <ArrowLeft className="shrink-0" /> : null}
              <span className="min-w-0 truncate text-[0.82rem] font-normal">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {formatCode(target)}
                </span>
                <span className="mx-1.5 text-muted-foreground">·</span>
                {target.titleKo}
              </span>
              {!isPrev ? <ArrowRight className="shrink-0" /> : null}
            </Button>
          );
        })}
      </motion.nav>
    </article>
  );
}
