export function WeatherMark({ kind, className = '', label }: { kind: string; className?: string; label?: string }) {
  return <span className={`weather-mark ${className}`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
    <img className="weather-light" src={`/weather/${kind}.svg`} width="128" height="128" alt="" />
    <img className="weather-dark" src={`/weather/${kind}-dark.svg`} width="128" height="128" alt="" />
  </span>;
}
