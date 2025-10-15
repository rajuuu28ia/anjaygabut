/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps,
  RapierRigidBody
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import { RigidBodyType } from '@dimforge/rapier3d-compat';

const cardGLB = '/assets/lanyard/card.glb';
const lanyard = '/assets/lanyard/lanyard.png';

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  gravity?: [number, number, number];
  transparent?: boolean;
}

export default function Lanyard({
  gravity = [0, -25, 0],
  transparent = true
}: LanyardProps) {
  const [isSmall, setIsSmall] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmall(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  const adjustedPosition: [number, number, number] = isSmall 
    ? [0, 0, 15] 
    : [0, 0, 15];

  const adjustedFov = isSmall ? 30 : 25;

  return (
    <div className="relative z-0 w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] flex justify-center items-center">
      <Canvas
        camera={{ position: adjustedPosition, fov: adjustedFov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band isSmall={isSmall} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isSmall: boolean;
}

function Band({ maxSpeed = 50, minSpeed = 10, isSmall }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 15,
    linearDamping: 15,
    sleepThreshold: 0.05
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyard);
  
  useEffect(() => {
    if (texture) {
      texture.anisotropy = 16;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.needsUpdate = true;
    }
  }, [texture]);
  
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(), 
        new THREE.Vector3(), 
        new THREE.Vector3(), 
        new THREE.Vector3()
      ])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);
  const lastTapTime = useRef<number>(0);
  const [isDoubleTap, setIsDoubleTap] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.7, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  const isFinite = (value: number) => {
    return typeof value === 'number' && !isNaN(value) && value !== Infinity && value !== -Infinity;
  };

  const isVector3Finite = (v: THREE.Vector3) => {
    return isFinite(v.x) && isFinite(v.y) && isFinite(v.z);
  };

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean' && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }
    
    if (fixed.current && j1.current && j2.current && j3.current && card.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current) return;
        if (!(ref.current as any).lerped) {
          (ref.current as any).lerped = new THREE.Vector3().copy(ref.current.translation());
        }
        const clampedDistance = Math.max(
          0.1, 
          Math.min(1, (ref.current as any).lerped.distanceTo(ref.current.translation()))
        );
        (ref.current as any).lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      
      const p0 = j3.current.translation();
      const p1 = (j2.current as any).lerped;
      const p2 = (j1.current as any).lerped;
      const p3 = fixed.current.translation();
      
      const p0Vec = new THREE.Vector3(p0.x, p0.y, p0.z);
      const p3Vec = new THREE.Vector3(p3.x, p3.y, p3.z);
      
      if (isVector3Finite(p0Vec) && isVector3Finite(p1) && isVector3Finite(p2) && isVector3Finite(p3Vec)) {
        curve.points[0].copy(p0Vec);
        curve.points[1].copy(p1);
        curve.points[2].copy(p2);
        curve.points[3].copy(p3Vec);
        
        const points = curve.getPoints(32);
        const allPointsValid = points.every(p => isVector3Finite(p));
        
        if (allPointsValid && band.current?.geometry) {
          band.current.geometry.setPoints(points);
        }
      }
      
      const angVel = card.current.angvel();
      const rotation = card.current.rotation();
      
      const angVelVec = new THREE.Vector3(angVel.x, angVel.y, angVel.z);
      const rotVec = new THREE.Vector3(rotation.x, rotation.y, rotation.z);
      
      if (isVector3Finite(angVelVec) && isVector3Finite(rotVec)) {
        ang.copy(angVelVec);
        rot.copy(rotVec);
        card.current.setAngvel({ 
          x: ang.x, 
          y: ang.y - rot.y * 0.25, 
          z: ang.z 
        }, true);
      }
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const handlePointerDown = (e: any) => {
    if (!card.current) return;
    
    const currentTime = Date.now();
    const timeSinceLastTap = currentTime - lastTapTime.current;
    
    const isDoubleTapDetected = timeSinceLastTap < 300 && timeSinceLastTap > 0;
    setIsDoubleTap(isDoubleTapDetected);
    lastTapTime.current = currentTime;
    
    e.target.setPointerCapture(e.pointerId);
    
    if (isDoubleTapDetected) {
      card.current.setBodyType(RigidBodyType.Dynamic, true);
      const impulseStrength = 5;
      card.current.applyImpulse({ x: 0, y: impulseStrength, z: 0 }, true);
    } else {
      card.current.setBodyType(RigidBodyType.KinematicPositionBased, true);
      card.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      card.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
    }
  };

  const handlePointerUp = (e: any) => {
    if (!card.current) return;
    
    e.target.releasePointerCapture(e.pointerId);
    
    if (!isDoubleTap) {
      card.current.setBodyType(RigidBodyType.Dynamic, true);
      card.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      card.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
    
    drag(false);
    setIsDoubleTap(false);
  };

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          gravityScale={0.8}
        >
          <CuboidCollider args={[1.2, 1.7, 0.01]} />
          <group
            scale={3.4}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={handlePointerUp}
            onPointerDown={handlePointerDown}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [2048, 2048] : [2560, 1440]}
          useMap
          map={texture}
          repeat={isSmall ? [-2.5, 1] : [-3, 1]}
          lineWidth={isSmall ? 1 : 1.2}
          opacity={1}
          transparent={false}
        />
      </mesh>
    </>
  );
}
