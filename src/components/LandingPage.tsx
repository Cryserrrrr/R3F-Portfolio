import styled from "styled-components"
import { motion } from "framer-motion"
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

const TitleContainer = styled(motion.div)`
  padding-bottom: 5rem;

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

const Title = styled.h1`
  font-size: 8rem;
  margin: 0;

  @media (max-width: 1440px) {
    font-size: 5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 375px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.h2`
  font-size: 2.5rem;

  @media (max-width: 1440px) {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 375px) {
    font-size: 0.5rem;
  }
`

function LandingPage() {
  const language = useStore((state) => state.language);

  return (
    <Container>
      <TitleContainer
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title>Eliott Le Duc</Title>
        <Subtitle>{messages[language as keyof typeof messages].subTitle}</Subtitle>
      </TitleContainer>
    </Container>
  )
}

export default LandingPage
