import { getContextPaneFullDatum } from "../../../api/drupal";
import type { ContextPaneFullDatum } from "../../../types";

export interface GetContextPaneById {
  params: { id: string };
}

export async function GET({ params }: GetContextPaneById) {
  const { id } = params;
  const contextPanePayload: ContextPaneFullDatum[] =
    await getContextPaneFullDatum(id);
  const contextPane = contextPanePayload?.at(0);

  if (contextPane)
    return new Response(JSON.stringify(contextPane), {
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
