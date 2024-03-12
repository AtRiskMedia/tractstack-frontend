import type { PaneDatum, PaneDatumProps } from "../types";

export function cleanPaneDatum(panes: PaneDatum[]) {
  const payload: PaneDatumProps[] = panes.map((pane: PaneDatum) => {
    return {
      title: pane.title,
      id: pane.id,
      slug: pane.field_slug,
      drupalNid: pane.drupal_internal__nid,
      optionsPayload: JSON.parse(pane.field_options),
      isContextPane: pane.field_is_context_pane,
      heightRatioDesktop: pane.field_height_ratio_desktop,
      heightRatioTablet: pane.field_height_ratio_tablet,
      heightRatioMobile: pane.field_height_ratio_mobile,
      heightOffsetDesktop: pane.field_height_offset_desktop,
      heightOffsetTablet: pane.field_height_offset_tablet,
      heightOffsetMobile: pane.field_height_offset_mobile,
      images: pane.field_image,
      imageSvgs: pane.field_image_svg,
      markdown: pane.field_markdown,
    };
  });
  return payload;
}

export function cleanPaneDatum2(pane: PaneDatum) {
  return {
    title: pane.title,
    id: pane.id,
    slug: pane.field_slug,
    drupalNid: pane.drupal_internal__nid,
    optionsPayload: JSON.parse(pane.field_options),
    isContextPane: pane.field_is_context_pane,
    heightRatioDesktop: pane.field_height_ratio_desktop,
    heightRatioTablet: pane.field_height_ratio_tablet,
    heightRatioMobile: pane.field_height_ratio_mobile,
    heightOffsetDesktop: pane.field_height_offset_desktop,
    heightOffsetTablet: pane.field_height_offset_tablet,
    heightOffsetMobile: pane.field_height_offset_mobile,
    images: pane.field_image,
    imageSvgs: pane.field_image_svg,
    markdown: pane.field_markdown,
  };
}
