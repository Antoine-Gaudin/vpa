import { SCHEDULE } from "./contact";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_NAMES = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

// Jour et minute courants à l'heure de Paris, quel que soit le fuseau du visiteur
function parisNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: WEEKDAYS.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
}

export type StoreStatus = { open: boolean; nextOpening: string | null };

export function getStoreStatus(): StoreStatus {
  const { day, minutes } = parisNow();
  const today = SCHEDULE[day] ?? [];

  if (today.some(([start, end]) => minutes >= start && minutes < end)) {
    return { open: true, nextOpening: null };
  }

  // Prochain créneau : plus tard aujourd'hui, sinon les jours suivants
  const laterToday = today.find(([start]) => start > minutes);
  if (laterToday) {
    return { open: false, nextOpening: `aujourd'hui à ${formatTime(laterToday[0])}` };
  }
  for (let offset = 1; offset <= 7; offset++) {
    const d = (day + offset) % 7;
    const first = SCHEDULE[d]?.[0];
    if (first) {
      const label = offset === 1 ? "demain" : DAY_NAMES[d];
      return { open: false, nextOpening: `${label} à ${formatTime(first[0])}` };
    }
  }
  return { open: false, nextOpening: null };
}
