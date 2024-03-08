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
type ContentMapValue = {
  [key: string]: {
    title: string;
    type: `Pane` | `StoryFragment` | `TractStack`;
    slug: string;
    parentId?: string;
  };
};

export const lastRun = atom<string>(`0`);

export const contentMap = map<ContentMapValue>({});

export const events = atom<EventStream[]>([]);
