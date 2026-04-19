import React, { useEffect } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useAnimations,
  useGLTF,
  useTexture,
} from "@react-three/drei";

const Dog = () => {
  const model = useGLTF("models/dog.drc.glb");

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.55;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  const { actions } = useAnimations(model.animations, model.scene);
  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  const [normalMap, sampleMatcap] = useTexture([
    "/dog_normals.jpg",
    "/matcap/mat-2.png",
  ]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const [branchMap, branchNormalMap] = useTexture([
    "/branches_diffuse.jpeg",
    "branches_normals.jpeg",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  // const textures = useTexture(
  //   {
  //     normalMap: "/dog_normals.jpg",
  //     sampleMatcap: "/matcap/mat-2.png",
  //   },
  //   (textures) => {
  //     textures.normalMap.flipY = false;
  //     textures.sampleMatcap.colorSpace = THREE.SRGBColorSpace;
  //   },
  // );

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: sampleMatcap,
  });
  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    matcap: branchMap,
  });

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial;
    }
  });

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.25, -0.55, 0]}
        rotation={[0, Math.PI / 3.5, 0]}
      />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
      <OrbitControls />
    </>
  );
};

export default Dog;
