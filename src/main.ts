/*
import { invoke } from "@tauri-apps/api/tauri";
let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;
async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}
greetInputEl = document.querySelector("#greet-input");
greetMsgEl = document.querySelector("#greet-msg");
document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  greet();
});
*/

import { Song } from "./Song";
import createScene from "./babylon/createScene";
import setupOrchestra from "./babylon/setupOrchestra";

const song = new Song();
await song.load("Children");

const orchestra = [
  [
    "B♭ Clarinet 1",
    "B♭ Clarinet 1",
    "Oboe",
    "Flute 1",
    "Flute 1",
    "Flute 1",
    "Flute 2",
    "Flute 2",
  ],
  [
    "B♭ Clarinet 2",
    "B♭ Clarinet 2",
    "B♭ Clarinet 2",
    "Bass Clarinet",
    "Bass Clarinet",
    "Violon",
    "Violon",
    "Violon",
    "Tenor Saxophone",
    "Tenor Saxophone",
    "Alto Saxophone",
    "Alto Saxophone",
  ],
  [
    "Horn in F",
    "B♭ Trumpet 1",
    "B♭ Trumpet 1",
    "B♭ Trumpet 2",
    "B♭ Trumpet 2",
    "B♭ Trumpet 2",
    "Trombone 1",
    "Trombone 1",
    "Trombone 2",
    "Euphonium",
    "Tuba",
    "Contrebasse",
    "Violoncelle",
    "Baritone Saxophone",
    "Baritone Saxophone",
    "Alto Saxophone",
    "Alto Saxophone",
  ],
  [
    "Vibraphone",
    "Glockenspiel ",
    "Batterie",
    "Percussion 1",
    "Percussion 2",
    "Timbales",
    "Piano",
  ],
];

const canvas = document.createElement("canvas");
document.body.append(canvas);

const scene = await createScene(canvas);

setupOrchestra(orchestra, scene);
