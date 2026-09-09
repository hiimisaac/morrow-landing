'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { demoForecasts } from '@/lib/demo-forecasts';

type DemoState = { scenario: string; dark: boolean };
type Props = DemoState & { onChange: (state: DemoState) => void };

/** The phone runs the release web build of MorrowApp from hiimisaac/morrow. */
export function FlutterDemo({ scenario, dark, onChange }: Props) {
  const frame = useRef<HTMLIFrameElement>(null);
  const desired = useRef({ scenario, dark });
  const change = useRef(onChange);
  const ready = useRef(false);
  const revision = useRef(0);
  const lastSent = useRef('');
  const send = useRef(() => {});
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );
  const [attempt, setAttempt] = useState(0);
  desired.current = { scenario, dark };
  change.current = onChange;

  useEffect(() => {
    ready.current = false;
    lastSent.current = '';
    setStatus('loading');
    const timeout = window.setTimeout(() => {
      if (!ready.current) setStatus('error');
    }, 45000);
    send.current = () => {
      if (!ready.current || !frame.current?.contentWindow) return;
      const state = desired.current;
      const key = `${state.scenario}:${state.dark}`;
      if (lastSent.current === key) return;
      lastSent.current = key;
      frame.current.contentWindow.postMessage(
        {
          type: 'morrow-demo:set',
          scenario: state.scenario,
          appearance: state.dark ? 'dark' : 'light',
          revision: ++revision.current,
        },
        window.location.origin,
      );
    };
    const receive = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frame.current?.contentWindow
      )
        return;
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'morrow-demo:ready') {
        ready.current = true;
        window.clearTimeout(timeout);
        setStatus('ready');
        lastSent.current = '';
        send.current();
      } else if (data.type === 'morrow-demo:error') {
        ready.current = false;
        window.clearTimeout(timeout);
        setStatus('error');
      } else if (
        data.type === 'morrow-demo:state' &&
        data.revision === revision.current &&
        demoForecasts.some((item) => item.id === data.scenario) &&
        ['light', 'dark', 'system'].includes(data.appearance)
      ) {
        const state = {
          scenario: data.scenario as string,
          dark:
            data.appearance === 'system'
              ? window.matchMedia('(prefers-color-scheme: dark)').matches
              : data.appearance === 'dark',
        };
        lastSent.current = `${state.scenario}:${state.dark}`;
        desired.current = state;
        change.current(state);
      }
    };
    window.addEventListener('message', receive);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('message', receive);
      send.current = () => {};
    };
  }, [attempt]);

  useEffect(() => {
    send.current();
  }, [scenario, dark]);

  return (
    <div className="app-preview" id="forecast-demo">
      <div className="app-preview-label">
        <span>Try Morrow</span>
        <span>Sample forecast</span>
      </div>
      <div className="app-surface">
        <iframe
          key={attempt}
          ref={frame}
          className="flutter-app"
          src="/app-demo/index.html"
          title="Try Morrow — interactive app with sample forecasts"
          tabIndex={status === 'ready' ? 0 : -1}
          aria-hidden={status !== 'ready'}
          onError={() => setStatus('error')}
        />
        {status !== 'ready' && (
          <div className="app-loading" role="status">
            <span className="loading-weather" aria-hidden="true" />
            <p>
              {status === 'error' ? 'Morrow couldn’t load.' : 'Loading Morrow…'}
            </p>
            {status === 'error' && (
              <Button
                variant="outline"
                onClick={() => setAttempt((value) => value + 1)}
              >
                Try again
              </Button>
            )}
          </div>
        )}
      </div>
      <p className="app-preview-caption">
        Scroll to explore <span aria-hidden="true">↓</span>
      </p>
    </div>
  );
}
