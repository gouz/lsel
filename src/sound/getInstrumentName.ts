import midi from "./instruments.json";
export const getInstrumentName = (id: number): string => midi[id];
