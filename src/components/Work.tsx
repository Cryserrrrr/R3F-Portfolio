import styled from "styled-components";
import { useState, useRef } from "react";

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

  @media (max-width: 1440px) {
    padding-bottom: 5rem;
  }

  @media (max-width: 768px) {
    padding-bottom: 2rem;
  }

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
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 375px) {
    font-size: 1.5rem;
  }
`;

interface ContentProps {
  isopen: boolean;
  contentheight: number;
}

const Content = styled.div<ContentProps>`
  overflow: hidden;
  transition: height 0.3s ease;
  height: ${props => props.isopen ? `${props.contentheight}px` : "0"};
`;

function Work() {
  const [open, setOpen] = useState<string | null>(null);
  const categories = ["Experiences", "Projects", "Shaders"];
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleClick = (category: string) => {
    setOpen(open === category ? null : category);
  };

  return (
    <Container>
      <SubContainer>
        {categories.map((category) => (
          <div key={category}>
            <Category onClick={() => handleClick(category)}>
              {category}
            </Category>
            <Content
              ref={(el) => (contentRefs.current[category] = el)}
              isopen={open === category}
              contentheight={contentRefs.current[category]?.scrollHeight || 0}
            >
              <p>Content for {category}</p>
            </Content>
          </div>
        ))}
      </SubContainer>
    </Container>
  );
}

export default Work;
