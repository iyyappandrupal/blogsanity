// app/api/draft-mode/enable/route.ts

import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { createClient }  from '@sanity/client'


export async function GET(request: NextRequest) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    createClient({
      projectId: 'itin6a1k',
      dataset: 'production',
      apiVersion: '2023-10-28',
      useCdn: true,
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
      token: process.env.SANITY_API_READ_TOKEN,
    }),
    request.url
  )

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  await draftMode().enable()
  return NextResponse.redirect(new URL(redirectTo, request.url))
}
