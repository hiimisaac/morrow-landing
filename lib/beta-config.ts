export type BetaConfig = {
  testFlightUrl: string | null;
  waitlistAction: string | null;
};

/** Public, build-time destinations. A static page never needs a private API key. */
export function getBetaConfig(values: {
  testFlightUrl?: string;
  waitlistAction?: string;
}): BetaConfig {
  function httpsUrl(value: string | undefined) {
    if (!value?.trim()) return null;
    try {
      const url = new URL(value.trim());
      return url.protocol === 'https:' && !url.username && !url.password
        ? url.href
        : null;
    } catch {
      return null;
    }
  }

  const testFlightUrl = httpsUrl(values.testFlightUrl);
  const invite = testFlightUrl ? new URL(testFlightUrl) : null;

  return {
    testFlightUrl:
      invite?.hostname === 'testflight.apple.com' &&
      /^\/join\/[a-zA-Z0-9]+\/?$/.test(invite.pathname)
        ? testFlightUrl
        : null,
    waitlistAction: httpsUrl(values.waitlistAction),
  };
}
