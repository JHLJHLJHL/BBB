/**
 * Regenerates ASSETS.md from data/season*.ts.
 *
 * The illustration list is derived from the content rather than maintained by
 * hand, so a plate that is referenced but not drawn (or drawn but never used)
 * shows up as soon as this runs. Usage: `node scripts/asset-audit.mjs`
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const MOTIF_IDS = [
  ...readFileSync(join(root, "components/sketch/motifs.tsx"), "utf8").matchAll(
    /^\s{2}\|\s"([a-z-]+)";?$/gm,
  ),
].map((m) => m[1]);

const MOTIF_LABELS = new Map(
  [
    ...readFileSync(join(root, "components/sketch/motifs.tsx"), "utf8").matchAll(
      /"?([a-z-]+)"?:\s*\{\s*\n\s*label:\s*"([^"]+)"/g,
    ),
  ].map((m) => [m[1], m[2]]),
);

const uses = [];
for (const n of [1, 2, 3, 4, 5]) {
  const src = readFileSync(join(root, `data/season${n}.ts`), "utf8");
  let current = null;
  for (const line of src.split(/\r?\n/)) {
    const id = line.match(/id:\s*"(s\d\de\d\d)"/);
    if (id) current = id[1];
    const sketch = line.match(
      /motif:\s*"([a-z-]+)",\s*caption:\s*"([^"]*)",\s*slot:\s*"(\w+)"/,
    );
    const motifOnly = line.match(/^\s*motif:\s*"([a-z-]+)",$/);
    if (sketch) {
      uses.push({ episode: current, motif: sketch[1], caption: sketch[2], slot: sketch[3] });
    } else if (motifOnly) {
      uses.push({ episode: current, motif: motifOnly[1], caption: "", slot: "" });
    }
  }
}

// Fill in captions/slots for the multi-line object form.
for (const n of [1, 2, 3, 4, 5]) {
  const src = readFileSync(join(root, `data/season${n}.ts`), "utf8");
  const blocks = [
    ...src.matchAll(
      /motif:\s*"([a-z-]+)",\s*\n\s*caption:\s*"([^"]*)",\s*\n\s*slot:\s*"(\w+)"/g,
    ),
  ];
  for (const b of blocks) {
    const hit = uses.find(
      (u) => u.motif === b[1] && u.caption === "" && u.slot === "",
    );
    if (hit) {
      hit.caption = b[2];
      hit.slot = b[3];
    }
  }
}

const byMotif = new Map(MOTIF_IDS.map((id) => [id, []]));
for (const u of uses) {
  if (!byMotif.has(u.motif)) byMotif.set(u.motif, []);
  byMotif.get(u.motif).push(u);
}

const lines = [];
lines.push("# 삽화 자산 목록 (Asset List)");
lines.push("");
lines.push(
  "`scripts/asset-audit.mjs` 로 자동 생성됩니다. 손으로 고치지 말고 스크립트를 다시 실행하세요.",
);
lines.push("");
lines.push(
  `- 모티프(도판 원본): **${MOTIF_IDS.length}종** — \`components/sketch/motifs.tsx\``,
);
lines.push(`- 에피소드 삽입 도판: **${uses.length}장** (62화 × 2장)`);
lines.push("- 규칙: 400×300 캔버스, 흑백 단색, `currentColor` 선, 종이 질감 + 연필 변위 필터");
lines.push("");
lines.push("## 모티프별 사용처");
lines.push("");
lines.push("| 모티프 ID | 기본 캡션 | 사용 횟수 | 사용 에피소드 |");
lines.push("| --- | --- | ---: | --- |");
for (const id of MOTIF_IDS) {
  const list = byMotif.get(id) ?? [];
  lines.push(
    `| \`${id}\` | ${MOTIF_LABELS.get(id) ?? "—"} | ${list.length} | ${
      list.map((u) => u.episode.toUpperCase()).join(", ") || "— (미사용)"
    } |`,
  );
}
lines.push("");
lines.push("## 에피소드별 도판");
lines.push("");
lines.push("| 에피소드 | 도판 1 | 위치 | 도판 2 | 위치 |");
lines.push("| --- | --- | --- | --- | --- |");
const byEpisode = new Map();
for (const u of uses) {
  if (!byEpisode.has(u.episode)) byEpisode.set(u.episode, []);
  byEpisode.get(u.episode).push(u);
}
for (const [ep, list] of byEpisode) {
  const [a, b] = list;
  lines.push(
    `| ${ep.toUpperCase()} | ${a ? `\`${a.motif}\` — ${a.caption}` : "—"} | ${
      a?.slot ?? "—"
    } | ${b ? `\`${b.motif}\` — ${b.caption}` : "—"} | ${b?.slot ?? "—"} |`,
  );
}
lines.push("");

const unused = MOTIF_IDS.filter((id) => (byMotif.get(id) ?? []).length === 0);
const missing = [...byMotif.keys()].filter((id) => !MOTIF_IDS.includes(id));
lines.push("## 감사 결과");
lines.push("");
lines.push(`- 미사용 모티프: ${unused.length ? unused.join(", ") : "없음"}`);
lines.push(
  `- 정의되지 않은 모티프 참조: ${missing.length ? missing.join(", ") : "없음"}`,
);
lines.push("");
lines.push("별도 자산: `app/icon.svg` (파비콘), `components/BrandIcon.tsx` (앱 내 마크), `components/sketch/HeroPoster.tsx` (홈 포스터, 480×660).");
lines.push("");

writeFileSync(join(root, "ASSETS.md"), lines.join("\n"), "utf8");
console.log(
  `ASSETS.md written — ${MOTIF_IDS.length} motifs, ${uses.length} placements, ${unused.length} unused, ${missing.length} undefined`,
);
