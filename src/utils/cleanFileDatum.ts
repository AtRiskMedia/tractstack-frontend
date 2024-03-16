import type { DrupalFile, FileNode } from "../types";

export function cleanFileDatum(file: DrupalFile, optimizedSrc: string|undefined) {
  const thisFile: FileNode = {
    id: file.id,
    filename: file.filename,
    optimizedSrc,
    uri: {
      value: file.uri.value,
      url: file.uri.url,
    },
  };
  return thisFile;
}
