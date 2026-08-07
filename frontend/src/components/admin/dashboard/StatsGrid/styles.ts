import styled from "styled-components";

export const Container = styled.section`
  display: grid;

  grid-template-columns: repeat(
    auto-fit,
    minmax(250px, 1fr)
  );

  gap: 24px;

  margin-bottom: 40px;
`;