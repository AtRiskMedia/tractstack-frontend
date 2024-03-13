import type { PaneDatum, MarkdownDatum } from "../types";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toHast } from "mdast-util-to-hast";

export function cleanPaneDatum(pane: PaneDatum) {
  const markdown = pane.field_markdown.map((m: MarkdownDatum) => {
    return {
      id: m.id,
      drupalNid: m.drupal_internal__nid,
      title: m.title,
      body: m.field_markdown_body,
      htmlAst: toHast(fromMarkdown(m.field_markdown_body)),
      slug: m.field_slug,
      image: m.field_image,
      imageSvg: m.field_image_svg,
    };
  });
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
    markdown: pane.field_markdown.length ? markdown : [],
  };
}
