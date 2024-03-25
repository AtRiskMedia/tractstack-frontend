import type { ContentMap, Events, EventNodes, EventStream } from "../../types";
import { contentMap } from "../../store/events";
import { referrer } from "../../store/auth";
import { pushPayload } from "../../api/services";

export async function eventSync(payload: EventStream[]) {
  console.log(`eventSync`, payload);
  const map = contentMap.get();
  console.log(`contentMap`, map);
  const events: Events = {};
  const nodes: EventNodes = {};

  // loop through events to generate nodes object
  payload.forEach((e: EventStream, idx: number) => {
    // prepare event
    const thisEvent = { ...e };
    if (typeof thisEvent.title !== `undefined`) delete thisEvent.title;
    //if (typeof thisEvent.slug !== `undefined`) delete thisEvent.slug;
    if (typeof thisEvent.targetSlug !== `undefined`)
      delete thisEvent.targetSlug;

    // prepare nodes + push events
    switch (e.type) {
      case `Pane`: {
        const matchPane = map.filter((m: ContentMap) => m.id === e.id).at(0)!;
        const matchStoryFragment = map
          .filter((m: ContentMap) => m.id === e.parentId)
          .at(0)!;
        const matchTractStack = map
          .filter((m: ContentMap) => m.id === e.parentId)
          .at(0)!;
        nodes[matchPane.id] = {
          type: `Pane`,
          title: matchPane.title,
          slug: matchPane.slug,
        };
        nodes[matchStoryFragment.id] = {
          type: `StoryFragment`,
          title: matchStoryFragment.title,
          slug: matchStoryFragment.slug,
          parentId: matchStoryFragment.parentId,
        };
        nodes[matchTractStack.id] = {
          type: `TractStack`,
          title: matchTractStack.title,
          slug: matchTractStack.slug,
        };
        events[idx] = thisEvent;
        break;
      }

      case `Impression`: {
        nodes[e.id] = {
          type: `Impression`,
          parentId: e.targetId,
        };
        const matchStoryFragment = map
          .filter((m: ContentMap) => m.id === e.targetId)
          .at(0)!;
        nodes[matchStoryFragment.id] = {
          type: `StoryFragment`,
          title: matchStoryFragment.title,
          slug: matchStoryFragment.slug,
          parentId: matchStoryFragment.parentId,
        };
        const matchTractStack = map
          .filter((m: ContentMap) => m.id === e.parentId)
          .at(0)!;
        nodes[matchTractStack.id] = {
          type: `TractStack`,
          title: matchTractStack.title,
          slug: matchTractStack.slug,
        };
        events[idx] = thisEvent;
        break;
      }

      case `Belief`:
        events[idx] = thisEvent;
        nodes[e.id] = {
          type: `Belief`,
          title: e.id,
        };
        break;

      default:
        console.log(`miss on eventNode:`, e.type);
    }
  });

  const ref = referrer.get();
  console.log(nodes);
  console.log(events);
  console.log(ref);
  const options = {
    nodes,
    events,
    referrer: ref,
  };

  if (!import.meta.env.PROD) {
    console.log(`dev mode -- not pushing events`);
    return false;
  }
  const response = await pushPayload(options);
  console.log(response);

  return true;
}
