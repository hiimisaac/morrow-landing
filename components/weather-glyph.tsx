'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import type { AnimationItem } from 'lottie-web';

export function WeatherMark({ kind, className = '', label }: { kind: string; className?: string; label?: string }) {
  return <span className={`weather-mark ${className}`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
    <img className="weather-light" src={`/weather/${kind}.svg`} width="128" height="128" alt="" />
    <img className="weather-dark" src={`/weather/${kind}-dark.svg`} width="128" height="128" alt="" />
  </span>;
}

/** Use the app's bundled keyframes, with a still fallback and cancellable loading. */
export function AnimatedWeather({ kind, active }: { kind: string; active: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const dark = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const syncRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);

  useEffect(() => { activeRef.current = active; syncRef.current(); }, [active]);
  useEffect(() => {
    const controller = new AbortController();
    const players: AnimationItem[] = [];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let visible = false;
    const sync = () => {
      for (const player of players) {
        if (reduced.matches) player.goToAndStop(0, true);
        else if (activeRef.current && visible && !document.hidden) player.play();
        else player.pause();
      }
      if (reduced.matches && root.current) {
        root.current.style.setProperty('--look-x', '0px');
        root.current.style.setProperty('--look-y', '0px');
      }
    };
    syncRef.current = sync;
    const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; sync(); });
    if (root.current) observer.observe(root.current);
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    const load = async () => {
      try {
        const [module, ...data] = await Promise.all([
          import('lottie-web/build/player/lottie_light.js'),
          ...['light', 'dark'].map(async theme => {
            const response = await fetch(`/weather/animated/${kind}-${theme}.json`, { signal: controller.signal });
            if (!response.ok) throw new Error('Weather animation unavailable');
            return response.json();
          }),
        ]);
        if (disposed || !light.current || !dark.current) return;
        let loaded = 0;
        for (const [index, container] of [light.current, dark.current].entries()) {
          const player = module.default.loadAnimation({ container, renderer: 'svg', loop: true, autoplay: false, animationData: data[index], rendererSettings: { preserveAspectRatio: 'xMidYMid meet' } });
          players.push(player);
          player.addEventListener('DOMLoaded', () => {
            if (disposed) return;
            loaded += 1;
            if (loaded === 2) setReady(true);
            sync();
          });
        }
        sync();
      } catch {
        // Bundled still artwork remains visible when animation loading fails.
      }
    };
    void load();
    return () => {
      disposed = true;
      controller.abort();
      observer.disconnect();
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      syncRef.current = () => {};
      players.forEach(player => player.destroy());
    };
  }, [kind]);

  const followPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--look-x', `${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * 12}px`);
    event.currentTarget.style.setProperty('--look-y', `${(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 7}px`);
  };
  const releasePointer = () => {
    root.current?.style.setProperty('--look-x', '0px');
    root.current?.style.setProperty('--look-y', '0px');
  };
  return <div ref={root} className={`animated-weather weather-${kind}${ready ? ' animation-ready' : ''}`} aria-hidden="true" onPointerMove={followPointer} onPointerLeave={releasePointer} onPointerUp={releasePointer} onPointerCancel={releasePointer}>
    <WeatherMark kind={kind} className="weather-still" />
    <div className="lottie-light" ref={light} />
    <div className="lottie-dark" ref={dark} />
  </div>;
}
