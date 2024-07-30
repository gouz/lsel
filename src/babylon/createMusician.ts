import {
  type Scene,
  MeshBuilder,
  StandardMaterial,
  Color3,
  DynamicTexture,
  type Mesh,
} from "@babylonjs/core";

const createMusician = (
  text: string,
  dimension: { w: number; h: number; d: number },
  position: { x: number; y: number; z: number },
  scene: Scene,
): Mesh => {
  const cubeMesh = MeshBuilder.CreateBox(
    "cube",
    {
      width: dimension.w,
      height: dimension.h,
      depth: dimension.d,
    },
    scene,
  );
  cubeMesh.position.x = position.x;
  cubeMesh.position.y = position.y;
  cubeMesh.position.z = position.z;

  const dynamicTexture = new DynamicTexture(
    "text",
    { width: 500, height: 500 },
    scene,
  );
  dynamicTexture.drawText(
    text,
    null,
    null,
    "60px solid Arial",
    "blue",
    "white",
  );
  const material = new StandardMaterial("material", scene);
  material.diffuseColor = new Color3(1, 1, 1);
  material.specularColor = new Color3(0.2, 0.2, 0.2);
  material.diffuseTexture = dynamicTexture;

  cubeMesh.material = material;
  return cubeMesh;
};

export default createMusician;
