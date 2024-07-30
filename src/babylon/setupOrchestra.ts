import type { Scene } from "@babylonjs/core";
import createMusician from "./createMusician";

const placeRow = (row: string[], radius: number, scene: Scene): void => {
  const step = Math.PI / row.length;
  row.forEach((musician, musician_index) => {
    const angle = musician_index * step;
    createMusician(
      musician,
      { w: 1, h: 1.5, d: 1 },
      { x: -Math.cos(angle) * radius, y: 0, z: Math.sin(angle) * radius },
      scene,
    );
  });
};

const setupOrchestra = (orchestra: string[][], scene: Scene) => {
  let radius = 0;
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
