import { MorrowLanding } from '@/components/morrow-landing';
import { getBetaConfig } from '@/lib/beta-config';

export default function Home() {
  const beta = getBetaConfig({
    testFlightUrl: process.env.NEXT_PUBLIC_TESTFLIGHT_URL,
    waitlistAction: process.env.NEXT_PUBLIC_WAITLIST_ACTION,
  });

  return <MorrowLanding beta={beta} />;
}
