import { Canvas } from "@react-three/fiber";
import FlowField from "../components/FlowField";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

function Experience({ playWooshSound }: { playWooshSound: () => void }) {
  return (
    <Container>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <FlowField playWooshSound={() => playWooshSound()} />
      </Canvas>
    </Container>
  );
}

export default Experience;
