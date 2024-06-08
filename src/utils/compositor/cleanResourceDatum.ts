import type { ResourceDatum, ResourceDatumProps } from "../../types";

export function cleanResourceDatum(resources: ResourceDatum[]) {
  if (!resources.length) return [];
  const thisResources: ResourceDatumProps[] = resources.map(
    (resource: ResourceDatum) => {
      return {
        title: resource.title,
        slug: resource.field_slug,
        category: resource.field_category_slug,
        actionLisp: resource.field_action_lisp,
        oneliner: resource.field_oneliner,
        optionsPayload: JSON.parse(resource.field_options),
      };
    }
  );
  return thisResources;
}
