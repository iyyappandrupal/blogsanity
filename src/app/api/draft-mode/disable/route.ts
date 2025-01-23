// app/api/draft-mode/disable/route.ts

import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const draftModeInstance = await draftMode(); // Await the promise
  draftModeInstance.disable(); // Now you can access `disable` correctly
  return NextResponse.redirect(new URL('/', request.url));
}
