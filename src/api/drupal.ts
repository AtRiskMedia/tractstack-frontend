import { Jsona } from "jsona";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import type { DrupalFile, DrupalNode } from "../types.ts";
import type { TJsonApiBody } from "jsona/lib/JsonaTypes";

interface DrupalApiBody extends TJsonApiBody {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  links?: any;
}

export const baseUrl: string = import.meta.env.DRUPAL_BASE_URL;

export const fetchUrl = async (url: string): Promise<any> => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const data: any = [];
  let more = true;
  while (more) {
    const request: Response = await fetch(url);
    const json: string | DrupalApiBody = await request.json();
    const dataFormatter: Jsona = new Jsona();
    const thisData: any = dataFormatter.deserialize(json);
    data.push(...thisData);
    url = typeof json !== `string` ? json?.links?.next?.href : null;
    if (typeof url === `undefined`) more = false;
  }
  return data;
};

export const getFiles = async (): Promise<DrupalFile[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params.addFields("file--file", ["type", "id"]).addFilter("status", "1");
  const path: string = params.getQueryString();

  return await fetchUrl(baseUrl + "/jsonapi/file/file?" + path);
};

export const getAllStoryFragments = async (): Promise<DrupalNode[]> => {
  const params: DrupalJsonApiParams = new DrupalJsonApiParams();
  params
    .addFields("node--story_fragment", ["type", "id", "title"])
    .addFilter("status", "1");
  const path: string = params.getQueryString();

  console.log(baseUrl + "/jsonapi/node/story_fragment?" + path);
  return await fetchUrl(baseUrl + "/jsonapi/node/story_fragment?" + path);
};

export default fetchUrl;
