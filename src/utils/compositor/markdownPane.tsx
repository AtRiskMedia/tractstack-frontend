import PaneFromAst from "../../components/PaneFromAst";
import { classNames } from "@tractstack/helpers";
import type { MarkdownPaneProps, MarkdownPaneDatum } from "../../types";

export function markdownPane(
  payload: MarkdownPaneDatum,
  markdown: MarkdownPaneProps[]
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
    .filter((m: MarkdownPaneProps) => m.id === payload.markdownId)
    .at(0)!;

  const optionsPayload = payload.optionsPayload;
  const thisId = `markdownPane-${thisMarkdown.id}`;

  const imageDataArrayNew = thisMarkdown.image.concat(thisMarkdown.imageSvg);
  const imageDataArray =
    Object.keys(imageDataArrayNew).length > 0 ? imageDataArrayNew : [];
  const astPayload = {
    ast: thisMarkdown.htmlAst.children,
    buttonData: optionsPayload?.buttons || {},
    imageData: imageDataArray || [],
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
