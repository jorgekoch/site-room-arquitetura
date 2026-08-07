import styled from "styled-components";

export const Container = styled.div`
  min-height:260px;

  display:flex;

  flex-direction:column;

  justify-content:center;

  align-items:center;

  text-align:center;

  gap:18px;

  color:${({ theme }) => theme.colors.textSoft};

  h3{
    color:${({ theme }) => theme.colors.text};

    margin:0;
  }

  p{
    max-width:420px;

    line-height:1.6;

    margin:0;
  }

  svg{
    opacity:.5;
  }
`;