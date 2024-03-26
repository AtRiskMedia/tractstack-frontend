import { useState, useEffect } from "react";
import { processGraphPayload } from "../utils/helpers";
import { getGraph } from "../api/services";
import VisNetwork from "./other/VisNetwork";
import type {
  ContentMap,
  GraphRelationshipDatum,
  GraphNodeDatum,
} from "../types";

async function goGetGraph() {
  try {
    const response = await getGraph();
    const data =
      typeof response?.data !== `undefined` &&
      typeof response?.data?.at(0) !== `undefined`
        ? processGraphPayload(response?.data)
        : null;
    return { graph: data, error: null };
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    console.log(`error`, e);
    window.location.reload();
    return {
      error: e?.response?.data?.message || e?.message,
      graph: null,
    };
  }
}

export const FastTravel = ({ contentMap }: { contentMap: ContentMap[] }) => {
  const [graphEdges, setGraphEdges] = useState<GraphRelationshipDatum[]>([]);
  const [graphNodes, setGraphNodes] = useState<GraphNodeDatum[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (import.meta.env.PROD && !loading && !loaded) {
      setLoading(true);
      goGetGraph()
        .then((res: any) => {
          if (res?.graph) {
            setGraphNodes(res?.graph?.nodes);
            setGraphEdges(res?.graph?.edges);
          }
          setLoaded(true);
        })
        .catch(e => {
          console.log(`An error occurred.`, e);
        })
        .finally(() => setLoading(false));
    }
  }, [loaded, loading]);

  return (
    <section className="xl:max-w-screen-2xl h-screen">
      <div className="h-full shadow-sm bg-myoffwhite/20">
        {!loaded ? (
          <div className="flex items-center justify-center h-full">
            <div className="max-w-xs leading-6 text-lg text-mydarkgrey">
              <p>
                <strong>LOADING</strong>
              </p>
            </div>
          </div>
        ) : (
          <VisNetwork
            nodes={graphNodes}
            edges={graphEdges}
            contentMap={contentMap}
          />
        )}
      </div>
    </section>
  );
};
