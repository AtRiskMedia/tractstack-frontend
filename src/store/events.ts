import { map, atom } from "nanostores";
import type { Current, EventStream, ContentMap, PanesVisible } from "../types";

export const events = atom<EventStream[]>([]);

export const contentMap = atom<ContentMap[]>([]);

export const current = atom<Current>({
  id: ``,
  slug: ``,
  title: ``,
});

export const loaded = atom<boolean>(false);
export const panesVisible = map<PanesVisible>({});
