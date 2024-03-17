import { SvgPanes } from "@assets/shapes";

export const SvgInsideLeft = ({
  shapeName,
  viewportKey,
  id,
  paneHeight,
}: {
  shapeName: string;
  viewportKey: string;
  id: string;
  paneHeight: number;
}) => {
  console.log(paneHeight);
  const shapeData =
    typeof SvgPanes[shapeName] !== `undefined` &&
    typeof SvgPanes[shapeName][viewportKey] !== `undefined`
      ? SvgPanes[shapeName][viewportKey]
      : null;
  if (!shapeData) return <></>;
  const thisWidth =
    viewportKey === `mobile` ? 600 : viewportKey === `tablet` ? 1080 : 1920;
  const width = shapeData.viewBox[0];
  const height = shapeData.viewBox[1];
  const cut =
    shapeData && typeof shapeData.cut === `number`
      ? shapeData.cut
      : thisWidth * 0.5;
  const paddingLeft = 0;
  const paddingTop = 0;
  const viewBox = {
    left: `0 0 ${cut} ${width}`,
    right: `${cut} 0 ${width - cut} ${height}`,
    leftMask: `0 0 ${cut} ${height}`,
    rightMask: `${cut} 0 ${width - cut} ${height}`,
    rightMaskWidth: thisWidth - cut,
  };
  return (
    <svg
      id={`svg__${id}--shape-outside-left-mask`}
      data-name={`svg-shape-outside-mask__${shapeName}-left--${viewportKey}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${viewBox.leftMask}`}
      className={`svg svg-shape-outside svg-shape-outside__${shapeName}-left svg-shape-outside__${shapeName}--${viewportKey} svg-shape-outside__${shapeName}-left--${viewportKey}`}
    >
      <desc id="desc">decorative background</desc>
      <mask id={`svg__${id}--shape-outside-left-mask-cutout`}>
        <rect
          fill="white"
          x={-paddingLeft}
          y={-paddingTop}
          width={cut + paddingLeft}
          height={paneHeight + paddingTop}
        ></rect>
        <g>
          <path d={shapeData.path} />
        </g>
      </mask>
      <rect
        mask={`url(#svg__${id}--shape-outside-left-mask-cutout)`}
        x={-paddingLeft}
        y={-paddingTop}
        width={cut + paddingLeft}
        height={paneHeight + paddingTop}
      ></rect>
    </svg>
  );
};
