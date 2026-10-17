import Script from 'next/script';

/**
 * Privacy-light visitor analytics (no cookies).
 * Prefer GoatCounter (free for personal sites) or Plausible.
 * Scripts load only when the matching env var is set at build time.
 */
export default function Analytics() {
  const goat = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE?.trim();
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim();
  const plausibleSrc =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SRC?.trim() || 'https://plausible.io/js/script.js';

  if (!goat && !plausible) return null;

  return (
    <>
      {goat ? (
        <Script
          data-goatcounter={`https://${goat}.goatcounter.com/count`}
          src="https://gc.zgo.at/count.js"
          strategy="afterInteractive"
          async
        />
      ) : null}
      {plausible ? (
        <Script defer data-domain={plausible} src={plausibleSrc} strategy="afterInteractive" />
      ) : null}
    </>
  );
}
