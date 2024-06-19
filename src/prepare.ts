import { PartContent, Score } from "./MusicXML/types";
import { convertNote } from "./sound/convertNote";
import { Timeline } from "./types";

const accidental = (type: string): number => {
  if (type === "natural") return 0;
  else if (type === "sharp") return 1;
  return -1;
};

export const prepareOrchestra = (score: Score): Timeline => {
  const timeline: Timeline = {};
  Object.values(score.parts).forEach((part: PartContent) => {
    let tick: number;
    let division: number;
    let signature: number;
    let time = 0;
    Object.entries(part.measures).forEach(([mid, measure]) => {
      const m = Number(mid);
      if (score.metronomes[m])
        tick = Math.round(1 / (score.metronomes[m].perMinute / 60)) * 1000;
      if (measure.divisions) division = measure.divisions;
      if (measure.signature) signature = measure.signature;
      let staff = 0;
      let delay = 0;
      measure.notes.forEach((note) => {
        if (note.staff && note.staff !== staff) {
          delay = 0;
          staff = note.staff;
        }
        if (note.note) {
          const instrument = part.instruments[note.instrument];
          if (!timeline[time + delay]) timeline[time + delay] = [];
          if (!timeline[time + delay]) timeline[time + delay] = [];
          timeline[time + delay].push({
            instrument: instrument.midi || "",
            note:
              instrument.midi === "unpitched"
                ? instrument.real || ""
                : convertNote(
                    note.note,
                    instrument.transpose || 0,
                    note.accidental !== ""
                      ? accidental(note.accidental)
                      : signature || 0
                  ),
            duration: (note.duration / division) * tick,
            volume: (note.volume || instrument.midi_volume || 0) / 100,
          });
        }
        delay += Math.round((note.duration / division) * tick);
      });
      time += delay;
    });
  });
  return timeline;
};
