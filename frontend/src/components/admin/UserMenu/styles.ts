import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  &:hover > div {
    opacity: 1;
    visibility: visible;
    transform: translateY(8px);
  }
`;

export const Trigger = styled.div`
  display: flex;

  align-items: center;

  gap: 14px;

  cursor: pointer;
`;

export const Avatar = styled.div`
  width: 44px;

  height: 44px;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.primary};

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 600;
`;

export const Info = styled.div`
  display: flex;

  flex-direction: column;

  strong {
    font-size: .92rem;
  }

  span {
    font-size: .75rem;

    color: ${({ theme }) => theme.colors.textSoft};
  }
`;

export const Dropdown = styled.div`
  position: absolute;

  right: 0;

  top: 100%;

  width: 220px;

  background: ${({ theme }) => theme.colors.surface};

  border-radius: 16px;

  border: 1px solid ${({ theme }) => theme.colors.border};

  padding: 8px;

  opacity: 0;

  visibility: hidden;

  transform: translateY(16px);

  transition: .25s;
`;

export const Item = styled.button`
  width: 100%;

  height: 44px;

  display: flex;

  align-items: center;

  gap: 12px;

  border: none;

  background: transparent;

  cursor: pointer;

  border-radius: 10px;

  padding: 0 14px;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const Divider = styled.hr`
  border: none;

  border-top: 1px solid ${({ theme }) => theme.colors.border};

  margin: 8px 0;
`;