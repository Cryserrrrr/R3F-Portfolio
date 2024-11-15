import styled from "styled-components"
import messages from '../utils/Messages'
import useStore from '../store/Store'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  transition: height 0.3s ease;

  @media (max-width: 768px) {
    height: calc(var(--vh, 1vh) * 100);
  }
`

const TextContainer = styled.div`
  padding-bottom: 2rem;

  @media (max-width: 1440px) {
    padding-bottom: 5rem;
  }

  @media (max-width: 768px) {
    padding-bottom: 2rem;
  }

  @media (max-width: 375px) {
    padding-bottom: 1rem;
  }
`

const Text = styled.div`
  font-size: 2rem;
  font-family: 'Yapari', sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 375px) {
    font-size: 0.8rem;
  }
`

function About() {
  const language = useStore((state) => state.language);
  return (
    <Container>
      <TextContainer>
        <Text>{messages[language as keyof typeof messages].description}</Text>
      </TextContainer>
    </Container>
  )
}

export default About
