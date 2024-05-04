import {
  getAllStoryFragmentsSiteMap,
  getAllContextPanesSiteMap,
} from "../api/drupal";
import type { APIRoute } from "astro";
import type { StoryFragmentSiteMap, ContextPaneSiteMap } from "../types";

const xmlTop = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`.trim();
const xmlBottom = `</urlset>`;

const storyFragments: StoryFragmentSiteMap[] =
  await getAllStoryFragmentsSiteMap();
const contextPanes: ContextPaneSiteMap[] = await getAllContextPanesSiteMap();

const v = storyFragments
  .map((u: StoryFragmentSiteMap) => {
    const thisPriority =
      u.field_slug === import.meta.env.PUBLIC_HOME ? `1.0` : `0.8`;
    const thisUrl = new URL(u.field_slug, import.meta.env.SITE).href;
    const thisChanged = +new Date(u.changed);
    const thisCreated = +new Date(u.created);
    const daysDelta = (thisChanged - thisCreated) / (1000 * 60 * 60 * 24);
    const thisFreq =
      daysDelta < 3
        ? `daily`
        : daysDelta < 10
          ? `weekly`
          : daysDelta < 90
            ? `monthly`
            : `yearly`;
    return `<url><loc>${thisUrl}</loc><lastmod>${u.changed.substring(0, 10)}</lastmod><changefreq>${thisFreq}</changefreq><priority>${thisPriority}</priority></url>`;
  })
  .concat(
    contextPanes.map((u: ContextPaneSiteMap) => {
      const thisUrl = new URL(`context/${u.field_slug}`, import.meta.env.SITE)
        .href;
      const thisChanged = +new Date(u.changed);
      const thisCreated = +new Date(u.created);
      const daysDelta = (thisChanged - thisCreated) / (1000 * 60 * 60 * 24);
      const thisFreq =
        daysDelta < 3
          ? `daily`
          : daysDelta < 10
            ? `weekly`
            : daysDelta < 90
              ? `monthly`
              : `yearly`;
      return `<url><loc>${thisUrl}</loc><lastmod>${u.changed.substring(0, 10)}</lastmod><changefreq>${thisFreq}</changefreq><priority>0.4</priority></url>`;
    })
  );

const xmlBody = v.join(``);
const xml = `${xmlTop}${xmlBody}${xmlBottom}`;

//console.log(storyFragments)
//console.log(contextPanes)

export const GET: APIRoute = () => {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
