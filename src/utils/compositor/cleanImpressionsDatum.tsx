import type { ImpressionsDatum, ImpressionDatum } from "../../types";

export function cleanImpressionsDatum(payload: ImpressionsDatum) {
  if (!payload) return null;
  const val = Object.keys(payload).map((i: string) => {
    return payload[i];
  });
  const returnVal = val.at(0) || null;
  return returnVal as ImpressionDatum;
}
