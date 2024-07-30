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
  }
}
