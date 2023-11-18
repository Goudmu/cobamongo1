'use client';

import { type EdgestoreRouter } from '../api/edgestore/[...edgestore]/route';
import { createEdgeStoreProvider } from '@edgestore/react';

export const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgestoreRouter>();