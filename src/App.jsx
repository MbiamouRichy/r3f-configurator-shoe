/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import {
  CameraControls,
  Center,
  ContactShadows,
  Environment,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { easing } from "maath";
import { useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "./store";
export const App = () => {
  let position = [0, 0, 2.5];
  let fov = 25;
  let snap = useSnapshot(state);

  return (
    <>
      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position, fov }}
        eventSource={document.getElementById("root")}
        eventPrefix="client"
      >
        <ambientLight intensity={10} />
        <Environment preset="sunset" />
        <ContactShadows
          frames={1}
          blur={1}
          rotateX={0.2}
          position={[0, -0.33, 0]}
        />
        <CameraRig>
          <CameraControls />
          {snap.activeSlide == 0 && (
            <Center>
              <AnimateShoe>
                <Shoe />
              </AnimateShoe>
            </Center>
          )}
          {snap.activeSlide == 1 && (
            <Center>
              <AnimateShoe>
                <Shoe2 />
              </AnimateShoe>
            </Center>
          )}
          {snap.activeSlide == 2 && (
            <Center>
              <AnimateShoe>
                <Shoe3 />
              </AnimateShoe>
            </Center>
          )}
          {snap.activeSlide == 3 && (
            <Center>
              <AnimateShoe>
                <Shoe4 />
              </AnimateShoe>
            </Center>
          )}
        </CameraRig>
      </Canvas>
    </>
  );
};

const AnimateShoe = ({ children }) => {
  const group = useRef();
  const [positionY, setPositionY] = useState(0);
  const [direction, setDirection] = useState(1);
  useFrame(() => {
    setPositionY((prevPositionY) => prevPositionY + direction * 0.0002);
    if (positionY > 0.008) {
      setDirection(-1);
    } else if (positionY < -0.008) {
      setDirection(1);
    }
    group.current.position.y = positionY;
  });

  return <motion.group ref={group}>{children}</motion.group>;
};

const Shoe = (props) => {
  // Nike akatsuki
  const { nodes, materials } = useGLTF("/nike_air_max_akatsuki.glb");

  return (
    <motion.mesh
      {...props}
      scale={0.4}
      dispose={null}
      castShadow
      receiveShadow
      geometry={nodes.Object_2.geometry}
      material={materials["Material.001"]}
      rotation={[-1.4, 0, -1.8]}
      position={[0, 0, 0]}
      initial={{ rotateZ: -9, opacity: 0 }}
      animate={{ rotateZ: -1.8, opacity: 1 }}
      transition={{ type: "spring", duration: "0.8", ease: "backOut" }}
    />
  );
};

const Shoe2 = (props) => {
  const { nodes, materials } = useGLTF("/nike_air_max_90 (1).glb");

  return (
    <motion.mesh
      {...props}
      dispose={null}
      castShadow
      receiveShadow
      geometry={nodes.Object_2.geometry}
      material={materials["Material.001"]}
      rotation={[1.6, 3.7, 1.2]}
      scale={1.766}
      position={[0, 0, 0]}
      initial={{ rotateX: 9, opacity: 0 }}
      animate={{ rotateX: 1.6, opacity: 1 }}
      transition={{ type: "spring", duration: "0.8", ease: "backOut" }}
    />
  );
};

const Shoe3 = (props) => {
  // Nike 90 1
  const { nodes, materials } = useGLTF("/nike_air_max_90_1.glb");
  return (
    <motion.mesh
      {...props}
      scale={2}
      rotation={[0, 0, 0.5]}
      castShadow
      receiveShadow
      geometry={nodes.Mesh.geometry}
      material={materials.Texture}
      position={[0, 0, 0]}
      initial={{ rotateX: 8, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ type: "spring", duration: "0.8", ease: "backOut" }}
    />
  );
};

const Shoe4 = (props) => {
  // nike air uptempo
  const { nodes, materials } = useGLTF(
    "/nike_air_uptempo_sneaker3d_scanned_low_poly.glb"
  );
  return (
    <motion.mesh
      {...props}
      dispose={null}
      castShadow
      receiveShadow
      geometry={nodes.Nike_Uptempo_Lowpoly_Material_0.geometry}
      material={materials.Material}
      rotation={[0, 3.5, -0.4]}
      scale={0.3}
      initial={{ rotateX: 8, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ type: "spring", duration: "0.8", ease: "backOut" }}
    />
  );
};

function CameraRig({ children }) {
  const group = useRef();

  useFrame((state, delta) => {
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

useGLTF.preload("/nike_air_max_akatsuki.glb");
useGLTF.preload("/nike_air_max_90_1.glb");
useGLTF.preload("/nike_air_uptempo_sneaker3d_scanned_low_poly.glb");
useGLTF.preload("/nike_air_max_90 (1).glb");
