import styled from "styled-components";

import useStore from "../store/Store";
import { skills } from "../utils/Skills";
import { ScreenType } from "../utils/ScreenSize";
import messages from '../utils/Messages'
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer";

type Skill = typeof skills[number];

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  @media (max-width: 768px) {
    height: calc(var(--vh, 1vh) * 100);
  }
`;

const SubContainer = styled.div`
  padding-bottom: 2rem;
  font-family: "Yapri", sans-serif;
  font-size: 1.5rem;

  @media (max-width: 1440px) {
    padding-bottom: 5rem;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    padding-bottom: 2rem;
    font-size: 1rem;
  }

  @media (max-width: 375px) {
    padding-bottom: 1rem;
    font-size: 0.8rem;
  }
`;

const SkillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SkillDescription = styled(motion.div)`
`;

const Skill = styled(motion.div)`
  background-color: #242424;
  width: 130px;
  height: 130px;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 375px) {
    width: 40px;
    height: 40px;
  }
`;

const SkillImageContainer = styled.div`
  width: 80%;
  height: 80%;
`;

const SkillImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function Skills() {
  const setHoveredText = useStore((state: { setHoveredText: (text: string | null) => void }) => state.setHoveredText);
  const screenType = useStore((state) => state.screenType);
  const language = useStore((state) => state.language);

  const handleClick = (skill: Skill) => {
    if (screenType !== ScreenType.MOBILE && screenType !== ScreenType.TABLET) {
      window.open(skill.link, '_blank');
    } else {
      setHoveredText(skill.name);
    }
  };

  const handleMouseEnter = (text: string) => {
    if (screenType !== ScreenType.MOBILE && screenType !== ScreenType.TABLET) {
      setHoveredText(text);
    }
  };

  const handleMouseLeave = () => {
    if (screenType !== ScreenType.MOBILE && screenType !== ScreenType.TABLET) {
      setHoveredText(null);
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Container>
      <SubContainer>
        <SkillDescription
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {messages[language as keyof typeof messages].skillDescription}
        </SkillDescription>
        <SkillContainer>
          {skills.map((skill, index) => (
            <Skill
              key={skill.name}
              onMouseEnter={() => handleMouseEnter(skill.name)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(skill)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <SkillImageContainer>
                <SkillImage src={skill.image} alt={skill.name} />
              </SkillImageContainer>
            </Skill>
          ))}
        </SkillContainer>
      </SubContainer>
    </Container>
  );
}

export default Skills;