import { markdownPane } from "./compositor/markdownPane";
import { bgPane } from "./compositor/bgPane";
import type { MarkdownDatum } from "../types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function compositor(payload: any, markdown: MarkdownDatum[]) {
  switch (payload.internal.type) {
    case `markdown`:
      return markdownPane(payload, markdown);

    case `bgPane`:
      return bgPane(payload);

    default:
      console.log(`missed type in compositor: ${payload.internal.type}`);
      return <p>{payload.internal.type}</p>;
  }
}
