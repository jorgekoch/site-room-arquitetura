import styled from "styled-components";

interface IconProps {
  $color?: string;
}

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};

  border-radius: 18px;

  padding: 24px;

  display: flex;

  flex-direction: column;

  gap: 24px;

  transition: .25s;

  &:hover{
    transform: translateY(-3px);

    box-shadow: 0 12px 30px rgba(0,0,0,.08);
  }
`;

export const Top = styled.div`
  display:flex;

  justify-content:space-between;

  align-items:center;
`;

export const Bottom = styled.div`
  display:flex;

  flex-direction:column;

  gap:6px;
`;

export const IconContainer = styled.div<IconProps>`
  width:52px;

  height:52px;

  border-radius:14px;

  display:flex;

  align-items:center;

  justify-content:center;

  color:white;

  background:${({ theme, $color }) =>
    $color ?? theme.colors.primary};
`;

export const Value = styled.h2`
  font-size:2rem;

  font-weight:700;

  color:${({ theme }) => theme.colors.text};

  margin:0;
`;

export const Title = styled.span`
  font-size:.95rem;

  font-weight:600;

  color:${({ theme }) => theme.colors.text};
`;

export const Description = styled.span`
  font-size:.82rem;

  color:${({ theme }) => theme.colors.textSoft};
`;