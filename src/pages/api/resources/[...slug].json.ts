import { getAllResources } from "../../../api/drupal";
import type { ResourceDatum } from "../../../types";

export interface GetResourceByCategorySlug {
  // pass one slug, or comma separated slugs
  params: { slug: string };
}

export async function GET({ params }: GetResourceByCategorySlug) {
  const { slug } = params;
  const slugs = slug !== `|` ? slug.split(`|`) : [];

  if (slugs.length) {
    const resourcePayload: ResourceDatum[] = await getAllResources();
    const resources = resourcePayload.filter(
      (r: ResourceDatum) =>
        typeof r?.field_category_slug === `string` &&
        slugs.includes(r.field_category_slug)
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
