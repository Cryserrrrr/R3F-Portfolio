import styled from "styled-components"

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
    font-size: 0.8rem;
  }

  @media (max-width: 375px) {
    font-size: 1.5rem;
  }
`

function About() {

  return (
    <Container>
      <TextContainer>
        <Text>
          Full stack and creative developer with three years of industry experience,
          I am passionate about innovation and continuously learning new technologies. 
          Curious and creative, I enjoy designing unique and effective solutions by combining technical expertise with an eye for aesthetics. 
          This portfolio reflects my journey and ambitions as a freelancer, where each project is an opportunity to explore, learn, and create impactful digital experiences.
        </Text>
      </TextContainer>
    </Container>
  )
}

export default About
