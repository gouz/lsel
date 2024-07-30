import { loadFile } from "./loadFile";

export class Song {
  #instruments: string[];

  constructor() {
    this.#instruments = [];
  }

  getInstruments(): string[] {
    return this.#instruments;
  }

  async load(name: string) {
    if (!document.querySelector("#loading span"))
      document.body.innerHTML += '<div id="loading"><span></span></div>';
    this.#instruments = await loadFile(`/songs/${name}/${name}.musicxml`);
    console.log("song load");
  }

  async play() {
    /*
    const loading = document.querySelector("#loading span") || document.body;
    let loader = 0;
    await Promise.all(
      this.#instruments.map(
        (i) =>
          new Promise<void>((resolve) => {
            // const sound = new Howl({
            //   src: [
            //     `/songs/${this.#songName}/${this.#songName}-${i
            //       .trim()
            //       .replace("♭", "b")
            //       .replace(/ /g, "_")}.mp3`,
            //   ],
            // });
            // this.#howls[i] = sound;
            // sound.once("load", () => {
            //   loader++;
            //   loading.textContent = `${loader}/${this.#instruments.length}`;
            //   resolve();
            // });
          })
      )
    );
    [...Object.values(this.#howls)].forEach((i, _) => i.play());
    */
  }
}
