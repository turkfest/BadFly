import { locales, defaultLocale } from "@/lib/i18n/config";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Static export has no middleware, so language detection happens in the browser.
const redirectScript = `(function(){try{var s=${JSON.stringify(locales)},t=${JSON.stringify(defaultLocale)},l=navigator.languages||[navigator.language||""];for(var i=0;i<l.length;i++){var c=String(l[i]).slice(0,2).toLowerCase();if(s.indexOf(c)>-1){t=c;break;}}location.replace(${JSON.stringify(basePath)}+"/"+t+"/");}catch(e){location.replace(${JSON.stringify(`${basePath}/${defaultLocale}/`)});}})();`;

export default function RootPage() {
  const fallback = `${basePath}/${defaultLocale}/`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${fallback}`} />
      </noscript>
      <div className="flex min-h-screen items-center justify-center p-8 text-center">
        <p className="text-sm text-ink-600">
          <a href={fallback} className="underline underline-offset-4">
            BadFly — Continue to website
          </a>
        </p>
      </div>
    </>
  );
}
