// import { invoke } from "@tauri-apps/api/tauri";
// let greetInputEl: HTMLInputElement | null;
// let greetMsgEl: HTMLElement | null;

import { Song } from "./Song";

// async function greet() {
//   if (greetMsgEl && greetInputEl) {
//     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//     greetMsgEl.textContent = await invoke("greet", {
//       name: greetInputEl.value,
//     });
//   }
// }

const song = new Song();

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#load")?.addEventListener("click", async () => {
    await song.load("Children");
  });
});

/*

  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
    });
  */
