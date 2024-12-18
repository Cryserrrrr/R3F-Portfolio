import { useState, useRef } from "react";
import styled from "styled-components";
import Slider from "./Slider";
import messages from '../utils/Messages'
import useStore from '../store/Store'
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer";
import work from '../utils/Work'

interface ContentProps {
  $isopen: boolean;
  contentheight: number;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const SubContainer = styled(motion.div)`
  padding-bottom: 2rem;

  @media (max-width: 375px) {
    padding-bottom: 1rem;
  }
`;

const Category = styled.div`
  font-size: 4rem;
  margin: 1rem 0;
  cursor: pointer;
  transition: color 0.3s ease;
  width: fit-content;

  &:hover {
    color: #1f53c7;
  }

  @media (max-width: 1440px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 375px) {
    font-size: 1.5rem;
  }
`;

const ContentContainer = styled.div<ContentProps>`
  overflow: hidden;
  transition: height 0.3s ease;
  height: ${props => props.$isopen ? `${props.contentheight}px` : "0"};
`;

function Work() {
  const language = useStore((state) => state.language);
  const [open, setOpen] = useState<string | null>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleClick = (category: string) => {
    setOpen(open === category ? null : category);
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Container>
      <SubContainer
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        {Object.keys(work).map((category) => (
          <div key={category}>
            <Category onClick={() => handleClick(category)}>
              {messages[language as keyof typeof messages][category as keyof typeof work]}
            </Category>
            <ContentContainer
              ref={(el) => (contentRefs.current[category] = el)}
              $isopen={open === category}
              contentheight={contentRefs.current[category]?.scrollHeight || 0}
            >
              {
                work[category as keyof typeof work].length ? <Slider work={work[category as keyof typeof work]}/> : messages[language as keyof typeof messages].noShaders
              }
            </ContentContainer>
          </div>
        ))}
      </SubContainer>
    </Container>
  );
}

export default Work;
