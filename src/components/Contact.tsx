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

function Contact() {

  return (
    <Container>
      <SubContainer>
        Contact
      </SubContainer>
    </Container>
  );
}

export default Contact;
