import type {
  Event,
  Events,
  EventNodes,
} from "../../types";
import { contentMap } from "../../store/events";
import { referrer } from "../../store/auth";

export async function eventSync(payload: Event[]) {
  console.log(`eventSync`, payload);
  const map = contentMap.get();
  console.log(`contentMap`, map);
  const events: Events = {};
  const nodes: EventNodes = {};

  // loop through events to generate nodes object
  //Object.keys(payload).forEach(key => {
  //  console.log(key,payload[key])
    /*
    const thisKey = payload[key].id;
    events[thisKey] = { ...payload[key] };
    const e = events[thisKey];
    map
      .filter((c: ContentMap) => c.slug === e.targetSlug)
      .forEach((e: string) => {
        e.parentId = e;
      });
    if (typeof e.title !== `undefined`) delete e.title;
    if (typeof e.slug !== `undefined`) delete e.slug;
    if (typeof e.targetSlug !== `undefined`) delete e.targetSlug;

    console.log(e)
    console.log(``)
    // match from contentMap
    switch (e.type) {
      case `Impression`: // match "StoryFragment" on targetId
        if (e?.id && typeof e.id === `string` && e?.targetId) {
          nodes[e.id] = {
            title: e?.title,
            type: `Impression`,
            parentId: e.targetId,
          };
          matchPane = e.targetId;
        }
        break;

      case `Pane`: // match "Pane" on id, then StoryFragment and TractStack
      case `Context`: // match "Pane" on id, then StoryFragment and TractStack
      case `StoryFragment`: // match StoryFragment on id
        if (e.verb === `CONNECTED` && e.parentId)
          nodes[e.parentId] = {
            title: map[e.parentId].title,
            slug: map[e.parentId].slug,
            type: map[e.parentId].type,
            parentId: map[e.parentId].parentId,
          };
        matchPane = e.id;
        break;

      case `MenuItem`: {
        // match "StoryFragment" on targetSlug
        let lookup: string = ``;
        let k: keyof typeof map;
        for (k in map) {
          const thisSlug = map[k];
          if (thisSlug === e?.targetSlug) lookup = key;
        }
        if (lookup && typeof lookup === `string`)
          nodes[e.id] = {
            title: e?.title,
            type: `MenuItem`,
            parentId: lookup,
          };
        matchStoryFragment = lookup;
        break;
      }

      case `Belief`:
        // do nothing
        break;

      default:
        console.log(
          `bad event handler type`,
          key,
          payload[key],
          events[key],
          map[e.id]
        );
        break;
    }

    console.log(matchPane, matchStoryFragment, matchStoryFragment);

    if (matchTractStack && !nodes?.matchTractStack) {
      nodes[matchTractStack] = {
        title: map[matchTractStack].title,
        type: map[matchTractStack].type,
        slug: map[matchTractStack].slug,
      };
    }
    if (matchPane && !nodes?.matchPane) {
      const thisPane = map.filter((m: ContentMap) => m.id === matchPane).at(0);
      console.log(matchPane, thisPane);
      matchStoryFragment = map[matchPane]?.parentId;
      if (typeof map[matchPane] === `undefined`)
        nodes[matchPane] = {
          title: e.title,
          slug: e.slug,
          type: `Pane`,
        };
      else
        nodes[matchPane] = {
          title: map[matchPane].title,
          slug: map[matchPane].slug,
          type: map[matchPane].type,
          parentId: map[matchPane].parentId,
        };
    }
    if (matchStoryFragment && !nodes?.matchStoryFragment) {
      nodes[matchStoryFragment] = {
        title: map[matchStoryFragment].title,
        slug: map[matchStoryFragment].slug,
        type: map[matchStoryFragment].type,
        parentId: map[matchStoryFragment].parentId,
      };
      matchTractStack = map[matchStoryFragment].parentId;
      if (matchTractStack && !nodes?.matchTractStack) {
        nodes[matchTractStack] = {
          title: map[matchTractStack].title,
          type: map[matchTractStack].type,
          slug: map[matchTractStack].slug,
        };
      }
    }
*/
  //});

  const ref = referrer.get();
  console.log(nodes);
  console.log(events);
  console.log(ref);

  return true;
}
