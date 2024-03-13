import { SvgString } from "./svgString";

export const svgImageMask = (
  shapeName: string,
  thisId: string,
  viewportKey: string
) => {
  const shape = SvgString(shapeName, viewportKey, thisId);
  if (!shape) return null;
  const dataUri = btoa(unescape(encodeURIComponent(shape)));
  return {
    WebkitMaskImage: `url("${dataUri}")`,
    maskImage: `url("${dataUri}")`,
    maskRepeat: `no-repeat`,
    WebkitMaskSize: `100% AUTO`,
    maskSize: `100% AUTO`,
  };
};
