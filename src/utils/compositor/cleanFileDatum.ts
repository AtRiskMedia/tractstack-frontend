import type { FileNode } from "../../types";

export function cleanFileDatum(
  file: FileNode,
  optimizedSrc: string | undefined
) {
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
