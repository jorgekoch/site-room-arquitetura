import styled from "styled-components";

export const Container = styled.div`
  display: grid;

  grid-template-columns: repeat(
    auto-fit,
    minmax(380px, 1fr)
  );

  gap: 20px;

  margin-top: 20px;

  align-items: start;
`;
