import { createClient } from "next-sanity";
import { draftMode } from 'next/headers'

// export const client = createClient({
//   projectId: "itin6a1k",
//   dataset: "production",
//   apiVersion: "2024-01-01",
//   useCdn: false,
// });

export function getClient() {
  const client = createClient({
    projectId: "itin6a1k",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    token: process.env.SANITY_API_READ_TOKEN,
    stega: {
      enabled: draftMode().isEnabled,
      studioUrl: '/studio',
    },
  })

  return client;
}
