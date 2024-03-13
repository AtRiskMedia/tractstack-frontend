import { classNames } from "@tractstack/helpers";
import type { MarkdownDatum, MarkdownPaneDatum } from "../../types";

export function markdownPane(
  payload: MarkdownPaneDatum,
  markdown: MarkdownDatum[]
) {
  const hasHidden =
    payload.hiddenViewports.includes(`desktop`) ||
    payload.hiddenViewports.includes(`tablet`) ||
    payload.hiddenViewports.includes(`mobile`);
  const hidden = hasHidden
    ? ``.concat(
        payload.hiddenViewports.includes(`desktop`)
          ? `xl:hidden`
          : `xl:visible`,
        payload.hiddenViewports.includes(`tablet`) ? `md:hidden` : `md:visible`,
        payload.hiddenViewports.includes(`mobile`) ? `hidden` : `visible`
      )
    : ``;

  const thisMarkdown = markdown
    .filter((m: MarkdownDatum) => m.id === payload.markdownId)
    .at(0)!;
  //console.log(thisMarkdown);
  //console.log(payload)
  return (
    <div className={classNames(`w-full h-full`, hidden)}>
      {thisMarkdown.field_markdown_body}
    </div>
  );
}
