import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

const edgestoreRouter = es.router({
    myPublicImages: es.imageBucket()
})

const handler = createEdgeStoreNextHandler({
    router: edgestoreRouter,
})

export {handler as GET, handler as POST}

export type EdgestoreRouter = typeof edgestoreRouter;