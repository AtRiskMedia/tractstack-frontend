import { Jsona } from "jsona";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import type {
  DrupalFile,
  Markdown,
  MarkdownDatum,
  Pane,
  PaneDatum,
  StoryFragment,
  StoryFragmentDatum,
  TractStack,
  TractStackDatum,
  Menu,
  MenuDatum,
  Resource,
  ResourceDatum,
  ContextPaneDatum,
} from "../types.ts";
import type { TJsonApiBody, TJsonaModel } from "jsona/lib/JsonaTypes";

interface DrupalApiBody extends TJsonApiBody {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  links?: any;
}

export const baseUrl: string = import.meta.env.DRUPAL_BASE_URL;

export const fetchUrl = async (url: string): Promise<any> => {
  let data: TJsonaModel = [];
  let more = true;
  while (more) {
    try {
      const request: Response = await fetch(url);
      const json: string | DrupalApiBody = await request.json();
      const dataFormatter: Jsona = new Jsona();
      const thisData = dataFormatter.deserialize(json);
      if (thisData.length) data = data.concat(thisData);
      else data.push(thisData);
      url = typeof json !== `string` ? json?.links?.next?.href : null;
      if (typeof url === `undefined`) more = false;
    } catch (e) {
      console.log(`error connecting to Drupal`, e);
      more = false;
    }
  }
  return data;
};

export const getAllFiles = async (): Promise<DrupalFile[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("file--file", ["type", "id", "filename", "uri"])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/file/file?" + path);
};

export const getStoryFragmentDatum = async (
  id: string
): Promise<StoryFragmentDatum[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--story_fragment", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_slug",
      "field_social_image_path",
      "field_tailwind_background_colour",
      "field_tract_stack",
      "field_panes",
      "field_menu",
      "changed",
      "created",
    ])
    .addInclude(["field_tract_stack"])
    .addFields("node--tractstack", ["title", "field_slug"])
    .addInclude(["field_panes"])
    .addFields("node--pane", ["field_slug"])
    .addInclude(["field_menu"])
    .addFields("node--menu", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_theme",
      "field_options",
    ])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(
    baseUrl + "/jsonapi/node/story_fragment/" + id + "?" + path
  );
};

export const getAllStoryFragmentDatum = async (): Promise<
  StoryFragmentDatum[]
> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--story_fragment", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_slug",
      "field_social_image_path",
      "field_tailwind_background_colour",
      "field_tract_stack",
      "field_panes",
      "field_menu",
      "changed",
      "created",
    ])
    .addInclude(["field_tract_stack"])
    .addFields("node--tractstack", ["title", "field_slug"])
    .addInclude(["field_panes"])
    .addFields("node--pane", ["field_slug"])
    .addInclude(["field_menu"])
    .addFields("node--menu", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_theme",
      "field_options",
    ])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/story_fragment?" + path);
};

export const getAllStoryFragments = async (): Promise<StoryFragment[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--story_fragment", [
      "type",
      "id",
      "title",
      "field_slug",
      "field_tract_stack",
    ])
    .addInclude(["field_tract_stack"])
    .addFields("node--tractstack", ["type", "id", "title", "field_slug"])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/story_fragment?" + path);
};

export const getTractStack = async (id: string): Promise<TractStackDatum[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--tractstack", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_slug",
      "field_social_image_path",
      "field_story_fragments",
    ])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(
    baseUrl + "/jsonapi/node/tractstack/" + id + "?" + path
  );
};

export const getAllTractStacks = async (): Promise<TractStack[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--tractstack", ["type", "id", "title", "field_slug"])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/tractstack?" + path);
};

export const getPane = async (id: string): Promise<PaneDatum[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--pane", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_slug",
      "field_markdown",
      "field_image",
      "field_image_svg",
    ])
    .addFields("node--markdown", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_slug",
      "field_markdown_body",
      "field_image",
      "field_image_svg",
    ])
    .addInclude(["field_markdown"])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/pane/" + id + "?" + path);
};

export const getAllPanes = async (): Promise<Pane[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--pane", ["type", "id", "title", "field_slug"])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/pane?" + path);
};

export const getAllContextPanes = async (): Promise<Pane[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--pane", ["type", "id", "title", "field_slug"])
    .addFilter("field_is_context_pane", "1")
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/pane?" + path);
};

export const getAllContextPaneDatum = async (): Promise<ContextPaneDatum[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--pane", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_slug",
      "field_options",
      "field_is_context_pane",
      "field_height_ratio_desktop",
      "field_height_ratio_tablet",
      "field_height_ratio_mobile",
      "field_height_offset_desktop",
      "field_height_offset_tablet",
      "field_height_offset_mobile",
      "field_markdown",
      "field_image",
      "field_image_svg",
      "changed",
      "created",
    ])
    .addFields("node--markdown", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_slug",
      "field_markdown_body",
      "field_image",
      "field_image_svg",
    ])
    .addInclude(["field_markdown"])
    .addFilter("field_is_context_pane", "1")
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/pane?" + path);
};

export const getAllPaneDatum = async (): Promise<PaneDatum[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--pane", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_slug",
      "field_options",
      "field_is_context_pane",
      "field_height_ratio_desktop",
      "field_height_ratio_tablet",
      "field_height_ratio_mobile",
      "field_height_offset_desktop",
      "field_height_offset_tablet",
      "field_height_offset_mobile",
      "field_markdown",
      "field_image",
      "field_image_svg",
    ])
    .addFields("node--markdown", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_slug",
      "field_markdown_body",
      "field_image",
      "field_image_svg",
    ])
    .addInclude(["field_markdown"])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/pane?" + path);
};

export const getMarkdown = async (id: string): Promise<MarkdownDatum[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--markdown", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_slug",
      "field_markdown_body",
      "field_image",
      "field_image_svg",
    ])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/markdown/" + id + "?" + path);
};

export const getAllMarkdowns = async (): Promise<Markdown[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--markdown", [
      "type",
      "id",
      "title",
      "field_slug",
      "field_category_slug",
    ])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/markdown?" + path);
};

export const getResource = async (id: string): Promise<ResourceDatum[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--resource", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_slug",
      "field_category_slug",
      "field_options",
      "field_action_lisp",
      "field_oneliner",
    ])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/resource/" + id + "?" + path);
};

export const getAllResources = async (): Promise<Resource[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--resource", [
      "type",
      "id",
      "title",
      "field_slug",
      "field_category_slug",
    ])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/resource?" + path);
};

export const getMenu = async (id: string): Promise<MenuDatum[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--menu", [
      "type",
      "id",
      "drupal_internal__nid",
      "title",
      "field_theme",
      "field_options",
    ])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/menu/" + id + "?" + path);
};

export const getAllMenus = async (): Promise<Menu[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--menu", ["type", "id", "title", "field_theme"])
    .addFilter("status", "1");
  const path: string = params.getQueryString();
  return await fetchUrl(baseUrl + "/jsonapi/node/menu?" + path);
};

export default fetchUrl;
