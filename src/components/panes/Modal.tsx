import { SvgModal } from "@components/widgets/SvgModal";
import { classNames } from "../../utils/helpers";
import type { MarkdownPaneDatum } from "../../types";

export function Modal({
  payload,
  modalPayload,
}: {
  payload: MarkdownPaneDatum;
  modalPayload: {
    [key: string]: {
      zoomFactor: number;
      paddingLeft: number;
      paddingTop: number;
    };
  };
}) {
  const optionsPayload = payload.optionsPayload;
  const baseClasses: { [key: string]: string } = {
    mobile: `md:hidden`,
    tablet: `hidden md:grid xl:hidden`,
    desktop: `hidden xl:grid`,
  };

  return [`mobile`, `tablet`, `desktop`]
    .map((viewportKey: string) => {
      if (payload.hiddenViewports.includes(viewportKey)) return null;

      const shapeName =
        viewportKey === `desktop`
          ? payload.textShapeOutsideDesktop
          : viewportKey === `tablet`
            ? payload.textShapeOutsideTablet
            : viewportKey === `mobile`
              ? payload.textShapeOutsideMobile
              : payload.textShapeOutside;
      if (!shapeName)
        return <div key={`t8k-${payload.id}-parent-${viewportKey}`} />;

      const thisId = `${viewportKey}-${payload.id}-modal`;

      // check for tailwind classes
      const hasClassNamesParent = optionsPayload?.classNamesParent;
      const classNamesParent =
        hasClassNamesParent &&
        typeof optionsPayload?.classNamesParent?.all !== `undefined`
          ? optionsPayload.classNamesParent.all
          : typeof optionsPayload?.classNamesParent !== `undefined` &&
              typeof optionsPayload?.classNamesParent[viewportKey] !==
                `undefined`
            ? optionsPayload.classNamesParent[viewportKey]
            : ``;
      const hasClassNamesModal = optionsPayload?.classNamesModal;
      const classNamesModal =
        hasClassNamesModal &&
        typeof optionsPayload?.classNamesModal?.all !== `undefined`
          ? optionsPayload.classNamesModal.all
          : typeof optionsPayload?.classNamesModal !== `undefined` &&
              typeof optionsPayload?.classNamesModal[viewportKey] !==
                `undefined`
            ? optionsPayload.classNamesModal[viewportKey]
            : ``;

      return (
        <div
          key={`${viewportKey}-${payload.id}`}
          className={classNames(
            baseClasses[viewportKey],
            classNamesParent,
            classNamesModal
          )}
        >
          <SvgModal
            shapeName={shapeName}
            viewportKey={viewportKey}
            id={thisId}
            modalPayload={modalPayload[viewportKey]}
          />
        </div>
      );
    })
    .filter(n => n);
}
