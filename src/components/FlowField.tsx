import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import vertexShader from "../shaders/particles/vertex.glsl?raw";
import fragmentShader from "../shaders/particles/fragment.glsl?raw";
import useStore from "../store/Store";
import { ScreenType } from "../utils/ScreenSize";
import GetSize from "../utils/GetSize";
import GetCurveSegment from "../utils/GetCurveSegment";

export default function FlowField() {
  const hoveredText = useStore((state) => state.hoveredText);
  const screenType = useStore((state) => state.screenType);
  const currentPage = useStore((state) => state.currentPage);
  const mesh = useRef<THREE.Points>(null!);
  const [font, setFont] = useState(null);
  const [targetPositions, setTargetPositions] = useState<Float32Array | null>(null);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const words = ["Passionate", "Creative", "Curious", "Creative", "Aesthetics", "Ambitions", "Impactful"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const PARTICLE_COUNT =
    screenType === ScreenType.SMALL_DESKTOP || screenType === ScreenType.LARGE_DESKTOP ? 10000 : 10000;

  const initialParticles = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = 0;
    }
    return positions;
  }, []);

  useEffect(() => {
    const fontLoader = new FontLoader();
    fontLoader.load("/fonts/Pavelt.json", (loadedFont) => {
      setFont(loadedFont as any); // Type assertion to fix type error
    });

    let lastScrollY = window.scrollY;
    let lastTimestamp = Date.now();
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTimestamp = Date.now();
    
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const deltaTime = (currentTimestamp - lastTimestamp) / 1000; // Convertir en secondes
    
      // Calculer la vitesse en pixels par seconde
      const speed = deltaY / deltaTime;
    
      // Définir la vitesse maximale attendue pour la normalisation
      const maxSpeed = 10000; // Ajuste cette valeur en fonction de tes besoins
    
      // Normaliser la vitesse pour qu'elle soit entre 0 et 1
      const normalizedSpeed = Math.min(speed / maxSpeed, 1);
    
      setScrollSpeed(normalizedSpeed);
    
      lastScrollY = currentScrollY;
      lastTimestamp = currentTimestamp;
    };    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentPage === 1 && !hoveredText) {
      const interval = setInterval(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [currentPage, hoveredText]);

  useEffect(() => {
    if (!font) return;

    // Use hovered text if available, otherwise use carousel word on page 1
    const textToShow = hoveredText || (currentPage === 1 ? words[currentWordIndex] : '');

    if (!textToShow) {
      const randomPositions = new Float32Array(PARTICLE_COUNT * 3);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        randomPositions[i * 3] = (Math.random() - 0.5) * 5;
        randomPositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
        randomPositions[i * 3 + 2] = 0;
      }
      setTargetPositions(randomPositions);
      return;
    }

    const geometry = new TextGeometry(textToShow, {
      font: font,
      size: GetSize(screenType, currentPage, hoveredText),
      height: 0.05,
      curveSegments: GetCurveSegment(screenType, currentPage, hoveredText)
    });
    geometry.center();
    const bufferGeometry = geometry;
    const positions = bufferGeometry.attributes.position.array;
    const particlePositions: number[] = [];
    const density = 0.008;

    for (let i = 0; i < positions.length; i += 9) {
      const v1 = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
      const v2 = new THREE.Vector3(positions[i + 3], positions[i + 4], positions[i + 5]);
      const v3 = new THREE.Vector3(positions[i + 6], positions[i + 7], positions[i + 8]);
      const normal = new THREE.Vector3().crossVectors(
          new THREE.Vector3().subVectors(v2, v1),
          new THREE.Vector3().subVectors(v3, v1)
        ).normalize();

      if (normal.z > 0.5) {
        const area = new THREE.Vector3()
          .crossVectors(
            new THREE.Vector3().subVectors(v2, v1),
            new THREE.Vector3().subVectors(v3, v1)
          )
          .length() * 0.5;

        const numParticles = Math.ceil(area / (density * density)) * 
        (screenType === ScreenType.SMALL_DESKTOP || screenType === ScreenType.LARGE_DESKTOP ? 1 : 3);
        for (let j = 0; j < numParticles; j++) {
          let r1 = Math.random();
          let r2 = Math.random();
          if (r1 + r2 > 1) {
            r1 = 1 - r1;
            r2 = 1 - r2;
          }
          const r3 = 1 - r1 - r2;
          const x = v1.x * r1 + v2.x * r2 + v3.x * r3;
          const y = v1.y * r1 + v2.y * r2 + v3.y * r3;
          const jitter = density * 0.1;
          particlePositions.push(x + (Math.random() - 0.5) * jitter, y + (Math.random() - 0.5) * jitter, 0);
        }
      }
    }

    while (particlePositions.length < PARTICLE_COUNT * 3) {
      particlePositions.push((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, 0);
    }

    setTargetPositions(new Float32Array(particlePositions.slice(0, PARTICLE_COUNT * 3)));
    geometry.dispose();
    bufferGeometry.dispose();
  }, [hoveredText, font, currentPage, currentWordIndex]);

  useFrame(({ clock }) => {
    if (!mesh.current || !mesh.current.geometry.attributes.position || !targetPositions) return;
    const positions = mesh.current.geometry.attributes.position;
    const currentPositions = positions.array as Float32Array;
    
    if (scrollSpeed > 0.01) {
      setScrollSpeed(prevSpeed => prevSpeed * 0.95);
    }
    
    const lerpFactor = 0.03;
    for (let i = 0; i < currentPositions.length; i += 3) {
      const targetX = targetPositions[i];
      const targetY = targetPositions[i + 1];
      const targetZ = targetPositions[i + 2];
      
      // Only apply sine/cosine animation when not on page 1 and nothing is displayed
      const shouldAnimate = currentPage !== 1 && !hoveredText;
      
      currentPositions[i] += (targetX - currentPositions[i]) * lerpFactor + (shouldAnimate ? Math.sin(clock.getElapsedTime() + i * 0.01) * 0.001 : 0);
      currentPositions[i + 1] += (targetY - currentPositions[i + 1]) * lerpFactor + (shouldAnimate ? Math.cos(clock.getElapsedTime() + i * 0.01) * 0.001 : 0);
      currentPositions[i + 2] += (targetZ - currentPositions[i + 2]) * lerpFactor + (scrollSpeed > 0.5 ? -scrollSpeed * 0.01 : 0);
    }

    positions.needsUpdate = true;
    if (mesh.current && (mesh.current.material as THREE.ShaderMaterial).uniforms?.uTime) {
      (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <points ref={mesh} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={initialParticles} count={PARTICLE_COUNT} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={
          { 
            uTime: { value: 0 },
            uParticlesSize: { value: screenType === ScreenType.SMALL_DESKTOP || screenType === ScreenType.LARGE_DESKTOP ? 3.0 : 1.5 }
          }
        }
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </points>
  );
}
