import { Howl } from "howler";
import { loadFile } from "./loadFile";

export class Song {
  #instruments: Howl[];

  constructor() {
    this.#instruments = [];
  }

  async load(name: string) {
    if (!document.querySelector("#loading span"))
      document.body.innerHTML += '<div id="loading"><span></span></div>';
    const loading = document.querySelector("#loading span") || document.body;
    let loader = 0;
    const promises: Promise<void>[] = [];
    (await loadFile(`/songs/${name}/${name}.musicxml`)).map((i, _, a) => {
      const howl = new Howl({
        src: [
          `/songs/${name}/${name}-${i
            .trim()
            .replace("♭", "b")
            .replace(/ /g, "_")}.mp3`,
        ],
        onload: () => {
          loader += (100 * 1) / a.length;
          loading.innerHTML = `${Math.round(Math.floor(100 * loader) / 100)} %`;
        },
        onloaderror: (_, err) =>
          (document.body.innerHTML += `<div>${i} - ${err}</div>`),
      });
      promises.push(new Promise((r) => howl.once("load", r)));
      this.#instruments.push(howl);
    });
    await Promise.allSettled(promises);
  }

  play() {
    this.#instruments.forEach((i) => i.play());
  }
}
