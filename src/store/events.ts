import { map, atom } from "nanostores";
import type {
  Current,
  EventStream,
  ContentMapValue,
  PanesVisible,
} from "../types";

export const events = atom<EventStream[]>([]);

export const contentMap = atom<ContentMapValue[]>([]);

export const current = atom<Current>({
  id: ``,
  slug: ``,
  title: ``,
  parentId: ``,
  parentSlug: ``,
  parentTitle: ``,
});

export const panesVisible = map<PanesVisible>({});
