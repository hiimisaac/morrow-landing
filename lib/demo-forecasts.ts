/** Selector labels for the real app's lib/demo/demo_weather_repository.dart fixtures. */
export type WeatherKind =
  | 'partly-cloudy-day'
  | 'rain'
  | 'clear-day'
  | 'clear-night';
export type DemoForecast = {
  id: string;
  city: string;
  state: string;
  photo: string;
  kind: WeatherKind;
  condition: string;
  temperature: number;
  isDay: boolean;
};

export const demoForecasts: DemoForecast[] = [
  {
    id: 'pittsburgh',
    city: 'Pittsburgh',
    state: 'Pennsylvania',
    photo: 'pittsburgh',
    kind: 'partly-cloudy-day',
    condition: 'Partly cloudy',
    temperature: 52,
    isDay: true,
  },
  {
    id: 'seattle',
    city: 'Seattle',
    state: 'Washington',
    photo: 'seattle',
    kind: 'rain',
    condition: 'Steady rain',
    temperature: 48,
    isDay: true,
  },
  {
    id: 'santa-fe',
    city: 'Santa Fe',
    state: 'New Mexico',
    photo: 'santa-fe',
    kind: 'clear-day',
    condition: 'Clear sky',
    temperature: 67,
    isDay: true,
  },
  {
    id: 'after-hours',
    city: 'Pittsburgh',
    state: 'Pennsylvania',
    photo: 'pittsburgh',
    kind: 'clear-night',
    condition: 'Clear sky',
    temperature: 47,
    isDay: false,
  },
];
