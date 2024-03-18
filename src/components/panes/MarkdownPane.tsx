import PaneFromAst from "./PaneFromAst";
import { classNames } from "../../utils/helpers";
import type {
  FileNode,
  MarkdownPaneProps,
  MarkdownPaneDatum,
} from "../../types";

export function MarkdownPane({
  payload,
  markdown,
  files,
}: {
  payload: MarkdownPaneDatum;
  markdown: MarkdownPaneProps[];
  files: FileNode[];
}) {
  const hasHidden =
    payload.hiddenViewports.includes(`desktop`) ||
    payload.hiddenViewports.includes(`tablet`) ||
    payload.hiddenViewports.includes(`mobile`);
  const hidden = hasHidden
    ? ``.concat(
        payload.hiddenViewports.includes(`desktop`) ? `xl:hidden` : `xl:grid`,
        payload.hiddenViewports.includes(`tablet`) ? `md:hidden` : `md:grid`,
        payload.hiddenViewports.includes(`mobile`) ? `hidden` : `grid`
      )
    : ``;
  const thisMarkdown = markdown
    .filter((m: MarkdownPaneProps) => m.id === payload.markdownId)
    .at(0)!;

  const optionsPayload = payload.optionsPayload;
  const thisId = `markdownPane-${thisMarkdown.id}`;

  const astPayload = {
    ast: thisMarkdown.htmlAst.children,
    buttonData: optionsPayload?.buttons || {},
    imageData: files,
  };
  const injectClassNames = optionsPayload?.classNames?.all || {};
  const classNamesParent = optionsPayload?.classNamesParent
    ? optionsPayload.classNamesParent?.all
    : ``;

  if (typeof classNamesParent === `string`) {
    return (
      <div
        className={classNames(hidden, classNamesParent)}
        id={thisId}
        key={`t8k-${thisMarkdown.id}-parent`}
      >
        <PaneFromAst
          payload={astPayload}
          thisClassNames={injectClassNames}
          memory={{}}
          id={thisMarkdown.id}
          idx={0}
        />
      </div>
    );
  }

  // multiple parent layers
  const wrap = (children: string[], idx: number) => {
    if (children.length === 1)
      return (
        <div
          key={`t8k-${thisMarkdown.id}-parent-${idx}`}
          className={classNames(idx === 0 ? hidden : ``, children?.at(0) || ``)}
        >
          <PaneFromAst
            payload={astPayload}
            thisClassNames={injectClassNames}
            memory={{}}
            id={thisMarkdown.id}
            idx={0}
          />
        </div>
      );
    return (
      <div
        key={`t8k-${thisMarkdown.id}-parent-${idx}`}
        className={classNames(idx === 0 ? hidden : ``, children?.at(0) || ``)}
      >
        {wrap(children.slice(1), idx + 1)}
      </div>
    );
  };
  return wrap(classNamesParent, 0);
}
