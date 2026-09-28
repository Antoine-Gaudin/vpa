// Coordonnées réelles du magasin (reprises de l'ancien site, pas de la maquette)
export const PHONE_DISPLAY = "02 32 55 59 20";
export const PHONE_HREF = "tel:+33232555920";

export const ADDRESS_STREET = "5 avenue de Verdun";
export const ADDRESS_CITY = "27140 Gisors";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Vexin+Pi%C3%A8ces+Autos+5+avenue+de+Verdun+27140+Gisors";

export const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2602.6545194955966!2d1.7751617122719534!3d49.282943271273616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6e1704c7ef199%3A0x97f1114378ab3c9a!2sVexin%20Pi%C3%A8ces%20Auto!5e0!3m2!1sfr!2sfr!4v1765142535725!5m2!1sfr!2sfr";

export const OPENING_HOURS = [
  { days: "Lundi", hours: "9h – 12h · 13h30 – 18h" },
  { days: "Mardi – Vendredi", hours: "8h30 – 12h · 13h30 – 18h" },
  { days: "Samedi", hours: "9h – 12h" },
  { days: "Dimanche", hours: "Fermé" },
];

// Créneaux en minutes depuis minuit, index 0 = dimanche (Date.getDay)
const MORNING_MON_SAT = [9 * 60, 12 * 60];
const MORNING_TUE_FRI = [8 * 60 + 30, 12 * 60];
const AFTERNOON = [13 * 60 + 30, 18 * 60];

export const SCHEDULE: number[][][] = [
  [],
  [MORNING_MON_SAT, AFTERNOON],
  [MORNING_TUE_FRI, AFTERNOON],
  [MORNING_TUE_FRI, AFTERNOON],
  [MORNING_TUE_FRI, AFTERNOON],
  [MORNING_TUE_FRI, AFTERNOON],
  [MORNING_MON_SAT],
];
