import type { APIRoute } from "astro";
import { getAllStoryFragments } from "../../../api/drupal";
import type { StoryFragment } from "../../../types";

export const GET: APIRoute = ({ props }) => {
  return new Response(
    JSON.stringify({
      title: props.title,
      id: props.id,
    })
  );
};

export async function getStaticPaths() {
  const storyFragments: StoryFragment[] = await getAllStoryFragments();
  const pathsPromises: Promise<{
    params: { slug: string };
    props: { title: string; id: string };
  }>[] = storyFragments.map(async (storyFragment: StoryFragment) => {
    return {
      params: { slug: storyFragment.field_slug },
      props: {
        title: storyFragment.title,
        id: storyFragment.id,
      },
    };
  });
  return Promise.all(pathsPromises);
}

export const prerender = true;
