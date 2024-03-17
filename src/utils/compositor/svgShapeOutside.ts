import { Buffer } from "buffer";
import { SvgPanes } from "@assets/shapes";
import type { SvgPaneDatum } from "@assets/shapes";

export const svgShapeOutsidePayload = (
  shapeName: string,
  viewportKey: string,
  thisId: string,
  paneHeight: number
) => {
  const shapeData =
    typeof SvgPanes[shapeName] !== `undefined` &&
    typeof SvgPanes[shapeName][viewportKey] !== `undefined`
      ? (SvgPanes[shapeName][viewportKey] as SvgPaneDatum)
      : null;
  if (shapeData === null) return null;
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
  const leftMaskSvg = `<svg
      id="svg__${thisId}--shape-outside-left-mask"
      data-name="svg-shape-outside-mask__${shapeName}-left--${viewportKey}"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox.leftMask}"
      className="svg svg-shape-outside svg-shape-outside__${shapeName}-left svg-shape-outside__${shapeName}--${viewportKey} svg-shape-outside__${shapeName}-left--${viewportKey}"
    >
      <desc id="desc">decorative background</desc>
      <mask id="svg__${thisId}--shape-outside-left-mask-cutout">
        <rect
          fill="white"
          x=${-paddingLeft}
          y=${-paddingTop}
          width=${cut + paddingLeft}
          height=${paneHeight + paddingTop}
        ></rect>
        <g>
          <path
            d=${shapeData.path}
          />
        </g>
      </mask>
      <rect
        mask="url(#svg__${thisId}--shape-outside-left-mask-cutout)"
        x=${-paddingLeft}
        y=${-paddingTop}
        width=${cut + paddingLeft}
        height=${paneHeight + paddingTop}
      ></rect>
    </svg>`;

  const rightMaskSvg = `<svg
      id="svg__${thisId}--shape-outside-right-mask"
      data-name="svg-shape-outside-mask__${shapeName}-right--${viewportKey}"
      xmlns="http://www.w3.org/2000/svg"
      viewBox=${viewBox.rightMask}
      className="svg svg-shape-outside svg-shape-outside__${shapeName}-right svg-shape-outside__${shapeName}--${viewportKey} svg-shape-outside__${shapeName}-right--${viewportKey}"
    >
      <desc id="desc">decorative background</desc>
      <mask id="svg__${thisId}--shape-outside-right-mask-cutout">
        <rect
          fill="white"
          x=${cut}
          y=${-paddingTop}
          width=${viewBox.rightMaskWidth}
          height=${paneHeight + paddingTop}
        ></rect>
        <g>
          <path d=${shapeData.path} />
        </g>
      </mask>
      <rect
        mask="url(#svg__${thisId}--shape-outside-right-mask-cutout)"
        x=${cut}
        y=${-paddingTop}
        width=${viewBox.rightMaskWidth}
        height=${paneHeight + paddingTop}
      ></rect>
    </svg>`;

  const leftMask = Buffer.from(leftMaskSvg).toString(`base64`);
  const rightMask = Buffer.from(rightMaskSvg).toString(`base64`);
  const leftSvg = `<svg
      id="svg__${thisId}--shape-outside-left"
      data-name="svg-shape-outside__${shapeName}--${viewportKey}"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox.leftMask}"
      className="svg svg-shape-outside svg-shape-outside-left svg-shape-outside__${shapeName}-left svg-shape-outside__${shapeName}-left--${viewportKey}"
      }
    >
      <desc id="desc">decorative background</desc>
      <g>
        <path d="${shapeData.path}">
      </g>
    </svg>`;
  const rightSvg = `<svg
      id="svg__${thisId}--shape-outside-right"
      data-name="svg-shape-outside__${shapeName}--${viewportKey}"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox.rightMask}"
      className="svg svg-shape-outside svg-shape-outside-right svg-shape-outside__${shapeName}-right svg-shape-outside__${shapeName}-right--${viewportKey}"
    >
      <desc id="desc">decorative background</desc>
      <g>
        <path d="${shapeData.path}" />
      </g>
    </svg>`;
  const left = Buffer.from(leftSvg).toString(`base64`);
  const right = Buffer.from(rightSvg).toString(`base64`);
  const isShapeOutside = `svg__shape-outside svg__shape-outside--${viewportKey}-${shapeName}`;
  const shapeSvg = `<svg
      id="svg__${thisId}"
      data-name="svg__${shapeName}--${viewportKey}"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 ${shapeData.viewBox[0]} ${shapeData.viewBox[1]}"
      className="svg ${isShapeOutside} svg__${shapeName}--${viewportKey}"
    >
      <desc id="desc">decorative background</desc>
      <g>
        <path d="${shapeData.path}" />
      </g>
    </svg>`;

  const shape = Buffer.from(shapeSvg).toString(`base64`);

  const cssShapeOutside =
    `#svg__${thisId}--shape-outside-left { float:left; shape-outside: url(${leftMask}); } ` +
    `#svg__${thisId}--shape-outside-right { float:right; shape-outside: url(${rightMask}); } `;

  return {
    shape,
    left,
    right,
    leftMask,
    rightMask,
    css: cssShapeOutside,
  };
};
