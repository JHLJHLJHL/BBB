"use client";

import { motion } from "framer-motion";

import { HeroPoster } from "@/components/sketch/HeroPoster";

/**
 * The default view: the poster, and nothing else.
 *
 * Navigation lives entirely in the sidebar (and in the drawer on small
 * screens), so the home screen carries no copy, no buttons and no caption —
 * it is a title plate you look at until you pick an episode.
 */
export function Hero() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 14, rotate: -0.8 }}
        animate={{ opacity: 1, y: 0, rotate: -0.8 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="sketch-frame w-full max-w-[min(560px,calc(100vh-9rem)*0.727)] overflow-hidden rounded-sm bg-paper"
      >
        <HeroPoster />
      </motion.div>
    </div>
  );
}
