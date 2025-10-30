// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { matchesUA } from 'browserslist-useragent'
// import browserslist from 'browserslist'

// export function middleware(req: NextRequest) {
//   const ua = req.headers.get('user-agent') || ''
//   const supportedBrowsers = browserslist() // lit la config du package.json

//   const isSupported = matchesUA(ua, {
//     browsers: supportedBrowsers,
//     ignoreMinor: true,
//     allowHigherVersions: true,
//   })

//   if (!isSupported) {
//     return NextResponse.redirect(new URL('/unsupported', req.url))
//   }

//   return NextResponse.next()
// }