import {
  DefaultLoadingScreen,
  Engine,
  HemisphericLight,
  Scene,
  UniversalCamera,
  Vector3,
  WebGPUEngine,
} from "@babylonjs/core";
import { addPostProcess } from "../addPostProcess";

const createScene = async (canvas: HTMLCanvasElement) => {
  DefaultLoadingScreen.prototype.displayLoadingUI = () => {};

  const antialias = true;
  const adaptToDeviceRatio = true;

  let engine: Engine | WebGPUEngine;

  if (navigator.gpu) {
    engine = new WebGPUEngine(canvas, { antialias, adaptToDeviceRatio });
    await (engine as WebGPUEngine).initAsync();
  } else {
    engine = new Engine(canvas, antialias, {}, adaptToDeviceRatio);
  }

  const scene = new Scene(engine);

  const fpsCamera = new UniversalCamera(
    "fpsCamera",
    new Vector3(0, 2, -4),
    scene,
  );
  fpsCamera.setTarget(new Vector3(0, 0, 5));
  fpsCamera.attachControl(canvas, true);

  const light = new HemisphericLight("HemiLight", new Vector3(0, 3, -3), scene);

  light.intensity = 0.9;

  addPostProcess(scene, [fpsCamera]);

  engine.runRenderLoop(() => scene.render());

  return scene;
};

export default createScene;
