import type { APIRoute } from "astro";
import { getAllTractStacks } from "../../../api/drupal";
import type { TractStack } from "../../../types";

export const GET: APIRoute = ({ props }) => {
  return new Response(
    JSON.stringify({
      title: props.title,
      id: props.id,
    })
  );
};

export async function getStaticPaths() {
  const tractStacks: TractStack[] = await getAllTractStacks();
  const pathsPromises: Promise<{
    params: { slug: string };
    props: { title: string; id: string };
  }>[] = tractStacks.map(async (tractStack: TractStack) => {
    return {
      params: { slug: tractStack.field_slug },
      props: {
        title: tractStack.title,
        id: tractStack.id,
      },
    };
  });
  return Promise.all(pathsPromises);
}

export const prerender = true;
