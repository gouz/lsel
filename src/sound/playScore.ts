import { play } from "./sound";
import { Timeline, TimelineNote } from "../types";

export const playScore = (score: Timeline): void => {
  const lastTick = Number(Object.keys(score).pop());
  const ticks: number[] = Object.keys(score).map((key) => Number(key));
  let start: number;

  const tick = (timeStamp: number) => {
    if (start === undefined) {
      start = timeStamp;
    }
    const elapsed = timeStamp - start;
    if (elapsed < lastTick) {
      if (ticks[0] < elapsed) {
        const num = ticks.shift();
        if (num !== undefined) {
          score[num].forEach((note: TimelineNote) => {
            play(note.instrument, note.note, note.duration, note.volume);
          });
        }
      }
      window.requestAnimationFrame(tick);
    } else if (ticks.length) {
      const num = ticks.shift();
      if (num !== undefined) {
        score[num].forEach((note: TimelineNote) => {
          play(note.instrument, note.note, note.duration, note.volume);
        });
      }
    }
  };
  window.requestAnimationFrame(tick);
};
