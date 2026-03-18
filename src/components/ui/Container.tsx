import styled from "styled-components";

export const Container = styled.div`
  width: min(100% - 2rem, ${({ theme }) => theme.layout.contentMaxWidth});
  margin: 0 auto;
`;