import { useEffect, useRef, useState, type ReactNode } from "react";
import styled from "styled-components";

type RevealProps = {
  children: ReactNode;
};

const Wrapper = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "18px")});
  transition:
    opacity 0.65s ease,
    transform 0.65s ease;
`;

export function Reveal({ children }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.14 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Wrapper ref={ref} $visible={visible}>
      {children}
    </Wrapper>
  );
}