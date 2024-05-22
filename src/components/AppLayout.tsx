import { FC, PropsWithChildren } from "react";
import styled from "styled-components";
import { TABLE_BREAKPOINT } from "../shared/constants";
import NavBar from "./NavBar";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 60px;
  width: 100vw;

  @media (min-width: ${TABLE_BREAKPOINT}px) {
    padding-top: 90px;
  }
`;

export const Content = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-direction: column;
`;

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <NavBar />
      <Content>{children}</Content>
    </Container>
  );
};

export default AppLayout;
