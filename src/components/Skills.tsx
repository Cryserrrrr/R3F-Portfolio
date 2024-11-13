import styled from "styled-components";

import useStore from "../store/Store";
import { skills } from "../utils/Skills";
import { ScreenType } from "../utils/ScreenSize";

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
  margin-top: 1rem;
`;

const Skill = styled.div`
  background-color: #242424;
  width: 100px;
  height: 100px;
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

  return (
    <Container>
      <SubContainer>
        Leveraging three years of professional experience, a solid academic foundation, and personal projects, I have cultivated a diverse skill set, including:
        <SkillContainer>
          {skills.map((skill) => (
            <Skill key={skill.name} onMouseEnter={() => handleMouseEnter(skill.name)} onMouseLeave={handleMouseLeave} onClick={() => handleClick(skill)}>
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