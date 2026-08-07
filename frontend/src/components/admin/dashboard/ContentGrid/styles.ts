import styled from "styled-components";

export const Container = styled.div`
  display: grid;

  grid-template-columns: repeat(
    auto-fit,
    minmax(380px, 1fr)
  );

  gap: 24px;

  margin-top: 32px;

  align-items: start;
`;