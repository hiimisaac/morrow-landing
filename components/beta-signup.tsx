import { ArrowRight, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { BetaConfig } from '@/lib/beta-config';

export function BetaSignup({ beta, id }: { beta: BetaConfig; id: string }) {
  if (beta.testFlightUrl) {
    return (
      <div className="beta-signup">
        <a className="primary-cta" href={beta.testFlightUrl}>
          <Smartphone size={19} aria-hidden="true" /> Join the iPhone beta
          <ArrowRight size={18} aria-hidden="true" />
        </a>
        <p className="signup-note">
          Available through TestFlight. Android follows.
        </p>
      </div>
    );
  }

  const enabled = Boolean(beta.waitlistAction);

  return (
    <div className="beta-signup">
      <form
        className="signup-form"
        action={beta.waitlistAction ?? undefined}
        method="post"
        aria-label="Morrow beta waitlist"
        aria-describedby={`${id}-note`}
        onSubmit={enabled ? undefined : (event) => event.preventDefault()}
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          Your email address
        </label>
        <Input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          required
          disabled={!enabled}
          className="signup-input"
        />
        <input type="hidden" name="source" value="morrow-landing" />
        <Button type="submit" disabled={!enabled} className="signup-button">
          {enabled ? 'Join the waitlist' : 'Signups open soon'}
          {enabled && <ArrowRight size={17} aria-hidden="true" />}
        </Button>
      </form>
      <p className="signup-note" id={`${id}-note`}>
        {enabled
          ? 'Be first in line for the iPhone beta. Android follows.'
          : 'iPhone beta on the horizon. Android follows.'}
      </p>
    </div>
  );
}
