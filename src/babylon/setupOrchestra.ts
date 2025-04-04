import { type Mesh, Sound, type Scene } from "@babylonjs/core";
import createMusician from "./createMusician";

let soundsReady = 0;
let nbSoundToLoad = 0;
const musics: Sound[] = [];
const meshes: Mesh[] = [];

const soundReady = () => {
  soundsReady++;
  console.log(this, soundsReady, nbSoundToLoad);
  if (soundsReady === nbSoundToLoad) {
    musics.forEach((m, _) => {
      m.play();
    });
  }
};

const placeRow = (row: string[], radius: number, scene: Scene): void => {
  const step = Math.PI / row.length;
  row.forEach((musician, musician_index) => {
    if (musician !== "") {
      const angle = musician_index * step;
      const mesh = createMusician(
        musician,
        { w: 1, h: 1.5, d: 1 },
        { x: -Math.cos(angle) * radius, y: 0, z: Math.sin(angle) * radius },
        scene,
      );
      meshes.push(mesh);
      const music = new Sound(
        `${musician}_${musician_index}`,
        `/songs/Children/Children-${musician.replace("♭", "b").replace(/ /g, "_")}.mp3`,
        scene,
        soundReady,
        {
          loop: false,
          autoplay: false,
          spatialSound: true,
          distanceModel: "linear",
          maxDistance: 100,
        },
      );
      music.setDirectionalCone(90, 180, 0);
      music.setPosition(mesh.position);
      musics.push(music);
    }
  });
};

const setupOrchestra = (orchestra: string[][], scene: Scene) => {
  let radius = 0;
  nbSoundToLoad = 0;
  orchestra.forEach((r, _) => {
    nbSoundToLoad += r.length;
  });
  orchestra.forEach((row, row_index) => {
    if (row_index === 0) {
      radius = (1.25 * (row.length + 1)) / Math.PI;
      placeRow(row, radius, scene);
    } else {
      radius += 1.25;
      placeRow(row, radius, scene);
    }
  });
};

export default setupOrchestra;
