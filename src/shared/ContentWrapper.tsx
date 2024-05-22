import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  flex: 1 0 auto;
  text-align: center;
  margin: 0px 400px 30px 400px;
`;

const Container = styled.div`
  box-sizing: content-box;
  margin: 0 auto;
  max-width: 500 px;
  padding: 24px 16px;
`;

const ContentWrapper: FC<PropsWithChildren> = ({ children }) => (
  <Wrapper>
    <Container>{children}</Container>
  </Wrapper>
);

export default ContentWrapper;
