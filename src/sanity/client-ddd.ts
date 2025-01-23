import { createClient } from "next-sanity";
import { draftMode } from 'next/headers';

let cachedClient: ReturnType<typeof createClient> | null = null;

export async function getClient() {
  // If the client has already been created, return the cached instance
  if (cachedClient) {
    return cachedClient;
  }

  // Await draftMode to ensure we can access the `isEnabled` property
  const draft = await draftMode();

  // Create a new client instance based on draftMode
  cachedClient = createClient({
    projectId: "itin6a1k",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    perspective: draft.isEnabled ? 'previewDrafts' : 'published',
    token: process.env.SANITY_API_READ_TOKEN,
    stega: {
      enabled: draft.isEnabled,
      studioUrl: '/studio',
    },
  });

  return cachedClient;
}
