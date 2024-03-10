import { map, atom } from "nanostores";

export type EventStream = {
  id: string;
  type: string;
  verb: string;
  targetId?: string;
  duration?: number;
  score?: string;
  title?: string;
  targetSlug?: string;
  isContextPane?: string;
};
//type ContentMapValue = {
//  [key: string]: {
//    title: string;
//    type: `Pane` | `StoryFragment` | `TractStack`;
//    slug: string;
//    parentId?: string;
//  };
//};
type PanesVisible = {
  [key: string]: number | null;
};

export const locked = atom<boolean>(false);

export const events = atom<EventStream[]>([]);

export const panesVisible = map<PanesVisible>({});
