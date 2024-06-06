import { getAllResources } from "../../../api/drupal";
import type { ResourceDatum } from "../../../types";

export interface GetResourceBySlug {
  // pass one slug, or comma separated slugs
  params: { slug: string };
}

export async function GET({ params }: GetResourceBySlug) {
  const { slug } = params;
  const slugs = slug !== `|` ? slug.split(`|`) : [];

  if (slugs.length) {
    const resourcePayload: ResourceDatum[] = await getAllResources();
    const resources = resourcePayload.filter((r: ResourceDatum) =>
      slugs.includes(r.field_slug)
    );

    if (resources)
      return new Response(JSON.stringify(resources), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
  }
  const error = { error: true };
  return new Response(JSON.stringify(error), {
    status: 404,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
