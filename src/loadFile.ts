import MusicXML from "./MusicXML";
import { Score } from "./MusicXML/types";
import { importInstrument } from "./sound/sound";
import { getInstrumentName } from "./sound/getInstrumentName";

export const loadFile = async (file: string): Promise<Score> => {
  const reponse = await fetch(file);
  const score: Score = MusicXML.parse(await reponse.text());
  const promises: Promise<void>[] = [];
  Object.entries(score.parts).forEach(([pid, part]) => {
    Object.entries(part.instruments).forEach(([iid, instrument]) => {
      promises.push(
        new Promise<void>(async (resolve) => {
          const ins = await importInstrument(
            getInstrumentName(Number(instrument.midi_program)),
            Number(instrument.midi_unpitched) !== 0
          );
          score.parts[pid].instruments[iid] = {
            ...score.parts[pid].instruments[iid],
            midi: ins,
            real:
              ins === "unpitched"
                ? String(Number(instrument.midi_unpitched) - 1)
                : instrument.sound,
          };
          resolve();
        })
      );
    });
  });
  await Promise.all(promises);
  return score;
};
