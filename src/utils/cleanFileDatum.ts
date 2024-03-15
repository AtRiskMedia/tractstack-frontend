import type { DrupalFile, FileNode } from "../types";

export function cleanFileDatum(file: DrupalFile) {
  const thisFile: FileNode = {
    id: file.id,
    filename: file.filename,
    uri: {
      value: file.uri.value,
      url: file.uri.url,
    },
  };
  return thisFile;
}
