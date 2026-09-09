/** Deliberate demo fixtures. No live data, device location, or current-clock claims. */
export type WeatherKind = 'partly-cloudy-day' | 'rain' | 'clear-day' | 'clear-night' | 'overcast-day';
export type DemoForecast = {
  id: string; city: string; state: string; caption: string; photo: string;
  kind: WeatherKind; condition: string; temperature: number; low: number; high: number;
  isDay: boolean; clock: string; sunrise: string; sunset: string;
  wind: number; humidity: number; outlook: string;
  hours: { time: string; temperature: number; kind: WeatherKind }[];
  days: { day: string; low: number; high: number; kind: WeatherKind; rain: string }[];
};
const pittsburgh: DemoForecast = {
  id: 'pittsburgh', city: 'Pittsburgh', state: 'Pennsylvania', caption: 'A little room for outside', photo: 'pittsburgh',
  kind: 'partly-cloudy-day', condition: 'Partly cloudy', temperature: 52, low: 46, high: 59,
  isDay: true, clock: '12:24', sunrise: '6:34 AM', sunset: '7:18 PM', wind: 6, humidity: 64,
  outlook: 'Rain on Friday. A brighter weekend ahead.',
  hours: [
    { time: 'Now', temperature: 52, kind: 'partly-cloudy-day' }, { time: '1 PM', temperature: 53, kind: 'partly-cloudy-day' },
    { time: '2 PM', temperature: 54, kind: 'clear-day' }, { time: '3 PM', temperature: 56, kind: 'clear-day' }, { time: '4 PM', temperature: 55, kind: 'overcast-day' },
  ],
  days: [
    { day: 'Today', low: 46, high: 59, kind: 'partly-cloudy-day', rain: '10%' }, { day: 'Thu', low: 45, high: 64, kind: 'clear-day', rain: '5%' },
    { day: 'Fri', low: 49, high: 57, kind: 'rain', rain: '85%' }, { day: 'Sat', low: 47, high: 61, kind: 'overcast-day', rain: '20%' }, { day: 'Sun', low: 48, high: 66, kind: 'clear-day', rain: '5%' },
  ],
};
export const demoForecasts: DemoForecast[] = [
  pittsburgh,
  {
    id: 'seattle', city: 'Seattle', state: 'Washington', caption: 'Bring the good umbrella', photo: 'seattle',
    kind: 'rain', condition: 'Light rain', temperature: 48, low: 43, high: 51,
    isDay: true, clock: '9:24', sunrise: '6:42 AM', sunset: '7:36 PM', wind: 9, humidity: 87,
    outlook: 'Showers easing up. Sunday looks promising.',
    hours: [
      { time: 'Now', temperature: 48, kind: 'rain' }, { time: '10 AM', temperature: 48, kind: 'rain' },
      { time: '11 AM', temperature: 49, kind: 'rain' }, { time: '12 PM', temperature: 50, kind: 'overcast-day' }, { time: '1 PM', temperature: 51, kind: 'overcast-day' },
    ],
    days: [
      { day: 'Today', low: 43, high: 51, kind: 'rain', rain: '90%' }, { day: 'Thu', low: 44, high: 53, kind: 'rain', rain: '75%' },
      { day: 'Fri', low: 45, high: 55, kind: 'overcast-day', rain: '35%' }, { day: 'Sat', low: 44, high: 57, kind: 'partly-cloudy-day', rain: '15%' }, { day: 'Sun', low: 46, high: 60, kind: 'clear-day', rain: '5%' },
    ],
  },
  {
    id: 'santa-fe', city: 'Santa Fe', state: 'New Mexico', caption: 'Take the sunlit side', photo: 'santa-fe',
    kind: 'clear-day', condition: 'Clear skies', temperature: 67, low: 44, high: 72,
    isDay: true, clock: '10:24', sunrise: '6:48 AM', sunset: '7:22 PM', wind: 4, humidity: 28,
    outlook: 'Clear skies and cool mornings all week.',
    hours: [
      { time: 'Now', temperature: 67, kind: 'clear-day' }, { time: '11 AM', temperature: 69, kind: 'clear-day' },
      { time: '12 PM', temperature: 71, kind: 'clear-day' }, { time: '1 PM', temperature: 72, kind: 'clear-day' }, { time: '2 PM', temperature: 71, kind: 'partly-cloudy-day' },
    ],
    days: [
      { day: 'Today', low: 44, high: 72, kind: 'clear-day', rain: '0%' }, { day: 'Thu', low: 46, high: 74, kind: 'clear-day', rain: '0%' },
      { day: 'Fri', low: 47, high: 71, kind: 'partly-cloudy-day', rain: '10%' }, { day: 'Sat', low: 45, high: 73, kind: 'clear-day', rain: '5%' }, { day: 'Sun', low: 48, high: 76, kind: 'clear-day', rain: '0%' },
    ],
  },
  {
    ...pittsburgh, id: 'after-hours', caption: 'One more look at the sky', kind: 'clear-night', condition: 'Clear night',
    temperature: 47, isDay: false, clock: '9:24', wind: 3, humidity: 71,
    hours: [
      { time: 'Now', temperature: 47, kind: 'clear-night' }, { time: '10 PM', temperature: 47, kind: 'clear-night' },
      { time: '11 PM', temperature: 46, kind: 'clear-night' }, { time: '12 AM', temperature: 46, kind: 'clear-night' }, { time: '1 AM', temperature: 46, kind: 'clear-night' },
    ],
  },
];
