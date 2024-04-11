import { getStoryFragmentFullDatum } from "../../../api/drupal";
import type { StoryFragmentFullDatum } from "../../../types";

export interface GetStoryFragmentById {
  params: { id: string };
}

export async function GET({ params }: GetStoryFragmentById) {
  const { id } = params;
  const storyFragmentPayload: StoryFragmentFullDatum[] =
    await getStoryFragmentFullDatum(id);
  const storyFragment = storyFragmentPayload?.at(0);

  if (storyFragment)
    return new Response(JSON.stringify(storyFragment), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  const error = { error: true };
  return new Response(JSON.stringify(error), {
    status: 404,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
