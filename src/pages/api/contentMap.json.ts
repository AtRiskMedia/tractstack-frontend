import { getAllStoryFragments, getAllPanes } from "../../api/drupal";
import type { Pane, PaneNode, StoryFragment, ContentMap } from "../../types";

export async function GET() {
  const allPanes = await getAllPanes();
  const storyFragments: StoryFragment[] = await getAllStoryFragments();
  const contentMap: ContentMap[] = storyFragments
    .map((s: StoryFragment) => {
      return {
        id: s.id,
        slug: s.field_slug,
        title: s.title,
        type: `StoryFragment`,
        parentId: s.field_tract_stack.id,
        parentSlug: s.field_tract_stack.field_slug,
        parentTitle: s.field_tract_stack.title,
        panes: s.field_panes.map((p: PaneNode) => p.id),
      } as ContentMap;
    })
    .concat(
      allPanes.map((p: Pane) => {
        return {
          id: p.id,
          slug: p.field_slug,
          title: p.title,
          isContextPane: p.field_is_context_pane,
          type: `Pane`,
        } as ContentMap;
      })
    );
  return new Response(JSON.stringify(contentMap), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
