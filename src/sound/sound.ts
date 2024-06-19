import { Howl } from "howler";

const instruments: Record<string, Howl> = {};

export const importInstrument = async (
  instrument: string,
  unpitched: boolean
) => {
  let inst = instrument;
  if (unpitched) {
    inst = "unpitched";
  }
  const response = await fetch(`/soundfont/${inst}.json`);
  const json = await response.json();
  const instrumentData = {
    src: json.src.map((s: string) => `/soundfont/${s}`),
    sprite: json.sprite,
  };
  instruments[inst] = new Howl(instrumentData);
  return inst;
};

export const play = (
  instrument: string,
  note: string,
  duration: number,
  volume: number,
  delay: number = 0
) => {
  let soundId: number;
  setTimeout(() => {
    soundId = instruments[instrument].play(note);
    instruments[instrument].seek(0, soundId);
    instruments[instrument].volume(volume, soundId);
    if (instrument !== "unpitched") instruments[instrument].loop(true, soundId);
    // console.log(
    //   `playing ${instrument} ${note} for ${duration} after a delay of ${delay} width a volume ${volume}`
    // );
  }, delay);
  if (duration)
    setTimeout(() => {
      instruments[instrument].stop(soundId);
    }, duration + delay);
};
