import styled from "styled-components";

const Button = styled.button`
  background-color: var(--primary);
  padding: 12px 18px;
  &:hover {
    opacity: 0.8;
  }
  border-radius: 8px;
  font-weight: bold;
`;

export default Button;
