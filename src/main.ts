import { invoke } from "@tauri-apps/api/tauri";
import { loadFile } from "./loadFile";
import { prepareOrchestra } from "./prepare";
import { Timeline } from "./types";
import { playScore } from "./sound/playScore";



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

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});

[...document.querySelectorAll("button")].forEach((btn) => {
  btn.addEventListener("click", async (el) => {
    const parsedScore = await loadFile(
      `/${(el.target as HTMLButtonElement).dataset.file}.musicxml`
    );
    const iselScore: Timeline = prepareOrchestra(parsedScore);
    console.log(iselScore);
    playScore(iselScore);
  });
});