import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import EditorWrapper from "components/serverEditor";
import { getQueryClient, trpc } from "server/trpc/server";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.getSnapshot.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditorWrapper />
    </HydrationBoundary>
  );
}
