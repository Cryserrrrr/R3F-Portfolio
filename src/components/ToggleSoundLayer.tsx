import { ToggleSound } from "../containers/LoadingPage";
import styled from "styled-components";
import volume_line from "/images/volume_line.svg";
import volume_off from "/images/volume_off.svg";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 20px;
  z-index: 100;
`;

const ToggleSoundLayer = ({soundOn, setSoundOn}: {soundOn: boolean, setSoundOn: (soundOn: boolean) => void}) => {
  return (
    <Container>
      <ToggleSound $ischecked={soundOn} onClick={() => setSoundOn(!soundOn)}>
        <img src={soundOn ? volume_line : volume_off} alt="volume" />
      </ToggleSound>
    </Container>
  )
}

export default ToggleSoundLayer;