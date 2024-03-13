import { markdownPane } from "./compositor/markdownPane";
import { bgPane } from "./compositor/bgPane";
import type { MarkdownDatum, MarkdownPaneDatum, BgPaneDatum } from "../types";

export function compositor(
  payload: MarkdownPaneDatum | BgPaneDatum,
  markdown: MarkdownDatum[]
) {
  if (payload.internal.type === `bgPane`) return bgPane(payload as BgPaneDatum);
  if (payload.internal.type === `markdown`)
    return markdownPane(payload as MarkdownPaneDatum, markdown);
}
