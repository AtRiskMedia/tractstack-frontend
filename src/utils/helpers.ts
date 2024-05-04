//import { storySteps } from "../store/events";
import type {
  GraphNodes,
  GraphNode,
  GraphNodeDatum,
  GraphRelationshipDatum,
} from "../types";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(` `);
}

export function handleResize() {
  const thisWidth = document.documentElement.clientWidth;
  const thisScale =
    thisWidth < 801
      ? thisWidth / 600
      : thisWidth < 1367
        ? thisWidth / 1080
        : thisWidth / 1920;
  document.documentElement.style.setProperty(`--scale`, thisScale.toString());
}

export function scrollToTop() {
  const button = document.querySelector("button#top");
  button?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  });
}

//export function closeContextPane() {
//  const lastStep =
//    storySteps.get()?.length > 2 ? storySteps.get().at(-2) : null;
//  const goto =
//    lastStep && typeof lastStep.slug === `string` && lastStep.slug.length
//      ? lastStep.slug
//      : ``;
//  const button = document.querySelector("button#close");
//  button?.setAttribute("href", document.referrer);
//  button?.addEventListener("click", () => {
//    window.location.href = `/${goto}`;
//  });
//  const button2 = document.querySelector("button#close-main");
//  button2?.setAttribute("href", document.referrer);
//  button2?.addEventListener("click", () => {
//    window.location.href = `/${goto}`;
//  });
//}

//export function closeCart() {
//  const lastStep =
//    storySteps.get()?.length > 2 ? storySteps.get().at(-2) : null;
//  const goto =
//    lastStep && typeof lastStep.slug === `string` && lastStep.slug.length
//      ? lastStep.slug
//      : ``;
//  const button = document.querySelector("button#close-cart");
//  button?.setAttribute("href", document.referrer);
//  button?.addEventListener("click", () => {
//    window.location.href = `/${goto}`;
//  });
//}
//
//export function closeGraph() {
//  const lastStep =
//    storySteps.get()?.length > 2 ? storySteps.get().at(-2) : null;
//  const goto =
//    lastStep && typeof lastStep.slug === `string` && lastStep.slug.length
//      ? lastStep.slug
//      : ``;
//  const button = document.querySelector("button#close-graph");
//  button?.setAttribute("href", document.referrer);
//  button?.addEventListener("click", () => {
//    window.location.href = `/${goto}`;
//  });
//}
//
//export function closeProfile() {
//  const lastStep =
//    storySteps.get()?.length > 2 ? storySteps.get().at(-2) : null;
//  const goto =
//    lastStep && typeof lastStep.slug === `string` && lastStep.slug.length
//      ? lastStep.slug
//      : ``;
//  const button = document.querySelector("button#close-profile");
//  button?.setAttribute("href", document.referrer);
//  button?.addEventListener("click", () => {
//    window.location.href = `/${goto}`;
//  });
//}

export const processGraphPayload = (rows: GraphNodes[]) => {
  const graphNodes: GraphNode[] = [];
  const graphNodeIds: string[] = [];
  const graphRelationships: GraphNode[] = [];
  const graphRelationshipIds: string[] = [];
  rows.forEach((row: GraphNodes) => {
    if (row?.v?.id && !graphNodeIds.includes(row.v.id)) {
      graphNodes.push(row.v);
      graphNodeIds.push(row.v.id);
    }
    if (row?.b?.id && !graphNodeIds.includes(row.b.id)) {
      graphNodes.push(row.b);
      graphNodeIds.push(row.b.id);
    }
    if (row?.c?.id && !graphNodeIds.includes(row.c.id)) {
      graphNodes.push(row.c);
      graphNodeIds.push(row.c.id);
    }
    if (row?.f?.id && !graphNodeIds.includes(row.f.id)) {
      graphNodes.push(row.f);
      graphNodeIds.push(row.f.id);
    }
    if (row?.s?.id && !graphNodeIds.includes(row.s.id)) {
      graphNodes.push(row.s);
      graphNodeIds.push(row.s.id);
    }
    if (row?.t?.id && !graphNodeIds.includes(row.t.id)) {
      graphNodes.push(row.t);
      graphNodeIds.push(row.t.id);
    }
    if (row?.a?.id && !graphRelationshipIds.includes(row.a.id)) {
      graphRelationships.push(row.a);
      graphRelationshipIds.push(row.a.id);
    }
    if (row?.bb?.id && !graphRelationshipIds.includes(row.bb.id)) {
      graphRelationships.push(row.bb);
      graphRelationshipIds.push(row.bb.id);
    }
    if (row?.cc?.id && !graphRelationshipIds.includes(row.cc.id)) {
      graphRelationships.push(row.cc);
      graphRelationshipIds.push(row.cc.id);
    }
    if (row?.d?.id && !graphRelationshipIds.includes(row.d.id)) {
      graphRelationships.push(row.d);
      graphRelationshipIds.push(row.d.id);
    }
    if (row?.r?.id && !graphRelationshipIds.includes(row.r.id)) {
      graphRelationships.push(row.r);
      graphRelationshipIds.push(row.r.id);
    }
    if (row?.rsf?.id && !graphRelationshipIds.includes(row.rsf.id)) {
      graphRelationships.push(row.rsf);
      graphRelationshipIds.push(row.rsf.id);
    }
    if (row?.ts1?.id && !graphRelationshipIds.includes(row.ts1.id)) {
      graphRelationships.push(row.ts1);
      graphRelationshipIds.push(row.ts1.id);
    }
    if (row?.ts2?.id && !graphRelationshipIds.includes(row.ts2.id)) {
      graphRelationships.push(row.ts2);
      graphRelationshipIds.push(row.ts2.id);
    }
    if (row?.rc?.id && !graphRelationshipIds.includes(row.rc.id)) {
      graphRelationships.push(row.rc);
      graphRelationshipIds.push(row.rc.id);
    }
  });

  const nodes: GraphNodeDatum[] = [];
  graphNodes.forEach((e: GraphNode) => {
    // colours by https://github.com/catppuccin/catppuccin Macchiato theme
    const color =
      e?.labels?.at(0) === `StoryFragment`
        ? `#f4dbd6`
        : e?.labels?.at(0) === `TractStack`
          ? `#f0c6c6`
          : e?.labels?.at(0) === `Corpus`
            ? `#f5bde6`
            : e?.labels?.at(0) === `Visit`
              ? `#c6a0f6`
              : e?.labels?.at(0) === `Belief`
                ? `#ed8796`
                : e?.labels?.at(0) === `Fingerprint`
                  ? `#ee99a0`
                  : `#f5a97f`;
    if (e?.id && e?.properties?.object_type && e?.properties?.object_name)
      nodes.push({
        id: e.id,
        title: e.properties.object_type,
        label: e.properties.object_name,
        value: e.properties.pageRank || 0,
        color: color,
      });
    else if (e?.id && e?.properties?.fingerprint_id)
      nodes.push({
        id: e.id,
        title: `You`,
        label: `You`,
        color: color,
      });
    else if (e?.id && e?.properties?.belief_id)
      nodes.push({
        id: e.id,
        title: `Belief`,
        label: e.properties.belief_id,
        color: color,
      });
    else if (e?.id && e?.properties?.visit_id)
      nodes.push({
        id: e.id,
        title: `Visit`,
        label: `Visit`,
        color: color,
      });
  });
  const edges: GraphRelationshipDatum[] = graphRelationships.map(
    (e: GraphNode) => {
      return {
        from: e.startNodeId,
        to: e.endNodeId,
        label: e.type || `unknown`,
        font: { align: `top`, size: `8` },
        arrows: {
          to: {
            enabled: true,
            type: `triangle`,
          },
        },
      };
    }
  );

  return { nodes, edges };
};
