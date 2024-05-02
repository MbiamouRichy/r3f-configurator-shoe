/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Center, Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { easing } from "maath";
import { useRef, useState } from "react";
import { radToDeg } from "three/src/math/MathUtils.js";
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

        <CameraRig>
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
    group.current.rotation.y = radToDeg(positionY);
  });

  // useFrame((state, delta) => {
  //   group.current.position.x = parseInt(`-${state.activeSlide}00`);
  //   // easing.dampE(group.current.position, [-300, 0, 0], 0.25, delta);
  // });

  return <group ref={group}>{children}</group>;
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
      rotation={[30, -50.3, 4.8]}
      position={[0, 0, 0]}
    />
  );
};

const Shoe2 = (props) => {
  const { nodes, materials } = useGLTF("/nike_air_max_90 (1).glb");

  return (
    <mesh
      {...props}
      dispose={null}
      castShadow
      receiveShadow
      geometry={nodes.Object_2.geometry}
      material={materials["Material.001"]}
      rotation={[1.6, 3.7, 1.2]}
      scale={1.766}
      position={[0, 0, 0]}
    />
  );
};

const Shoe3 = (props) => {
  // Nike 90 1
  const { nodes, materials } = useGLTF("/nike_air_max_90_1.glb");
  return (
    <mesh
      {...props}
      scale={2}
      rotation={[0, 0, 0.5]}
      castShadow
      receiveShadow
      geometry={nodes.Mesh.geometry}
      material={materials.Texture}
      position={[0, 0, 0]}
    />
  );
};

const Shoe4 = (props) => {
  // nike air uptempo
  const { nodes, materials } = useGLTF(
    "/nike_air_uptempo_sneaker3d_scanned_low_poly.glb"
  );
  return (
    <group {...props} dispose={null} scale={0.01}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Nike_Uptempo_Lowpoly_Material_0.geometry}
        material={materials.Material}
        rotation={[0, 3.5, -0.4]}
        scale={22.856}
      />
    </group>
  );
};

function CameraRig({ children }) {
  const group = useRef();

  useFrame((state, delta) => {
    // easing.damp3(state.camera.position, [0, 0, 0], 0.25, delta);
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
