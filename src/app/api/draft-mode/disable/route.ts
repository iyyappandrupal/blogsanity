// app/api/draft-mode/disable/route.ts

import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const draftModeInstance = draftMode(); // Get the draftMode instance
  draftModeInstance.disable();          // Disable draft mode
  return NextResponse.redirect(new URL('/', request.url));
}
