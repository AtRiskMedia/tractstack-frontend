import type { APIRoute } from "astro";
import { getAllPanes } from "../../../api/drupal";
import type { Pane } from "../../../types";

export const GET: APIRoute = ({ props }) => {
  return new Response(
    JSON.stringify({
      title: props.title,
      id: props.id,
    })
  );
};

export async function getStaticPaths() {
  const panes: Pane[] = await getAllPanes();
  const pathsPromises: Promise<{
    params: { slug: string };
    props: { title: string; id: string };
  }>[] = panes.map(async (pane: Pane) => {
    return {
      params: { slug: pane.field_slug },
      props: {
        title: pane.title,
        id: pane.id,
      },
    };
  });
  return Promise.all(pathsPromises);
}

export const prerender = true;
