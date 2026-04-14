import React from "react";
import { Canvas } from "@react-three/fiber";

const Dog = () => {
  return (
    <div>
      <Canvas>
        <mesh>
            <meshBasicMaterial attach="material" color="orange" />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Dog;
