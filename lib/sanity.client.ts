import { createClient } from "next-sanity";
import { draftMode } from 'next/headers'

// export const client = createClient({
//   projectId: "itin6a1k",
//   dataset: "production",
//   apiVersion: "2024-01-01",
//   useCdn: false,
// });

export function getClient(draft: boolean) {
  const client = createClient({
    projectId: "itin6a1k",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    perspective: draft ? 'previewDrafts' : 'published',
    token: process.env.SANITY_API_READ_TOKEN,
    stega: {
      enabled: draft,
      studioUrl: '/studio',
    },
  })

  return client;
}
