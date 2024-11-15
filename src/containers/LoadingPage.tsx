import styled from 'styled-components'
import useStore from '../store/Store'
import ToggleSwitch from '../components/ToggleSwitch'
import messages from '../utils/Messages'

import volumeLine from '/images/volume_line.svg'
import volumeOff from '/images/volume_off.svg'

interface ToggleSoundProps {
  isChecked: boolean;
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
`
const Title = styled.h1`
  font-size: 8rem;
  margin: 0;

  @media (max-width: 1440px) {
    font-size: 10rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;  
  }

  @media (max-width: 375px) {
    font-size: 2rem;
  }
`

const Button = styled.button`
  width: 200px;
  height: 50px;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  margin-top: 20px;
  background-color: transparent;
  color: #fff;
  font-family: 'Pavelt', sans-serif;

  &:hover {
    background-color: #fff;
    color: #000;
  }

  &:disabled {
    background-color: transparent;
    color: #ccc;
    border: 1px solid #ccc;
    cursor: not-allowed;
  }
`

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ToggleSound = styled.div<ToggleSoundProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-left: 20px;
  background-color: ${(props) => props.isChecked ? "#fff" : "transparent"};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease-in-out;
`

const LoadingPage = ({ setIsLoading, soundLoaded, setSoundOn, soundOn }: { setIsLoading: (isLoading: boolean) => void, soundLoaded: boolean, setSoundOn: (soundOn: boolean) => void, soundOn: boolean }) => {
  const setLanguage = useStore((state) => state.setLanguage)
  const language = useStore((state) => state.language)
  return (
    <Container>
      <Title>{messages[language as keyof typeof messages].welcome}</Title>
      <ToggleContainer>
        <ToggleSwitch ischecked={language === "fr"} onChange={() => setLanguage(language === "fr" ? "en" : "fr")} labelLeft="FR" labelRight="EN" />
        <ToggleSound isChecked={soundOn} onClick={() => setSoundOn(!soundOn)}>
          <img src={soundOn ? volumeLine : volumeOff} alt="volume" />
        </ToggleSound>
      </ToggleContainer>
      <Button onClick={() => setIsLoading(false)} disabled={!soundLoaded}>
        {messages[language as keyof typeof messages].enter}
      </Button>
    </Container>
  )
}

export default LoadingPage
