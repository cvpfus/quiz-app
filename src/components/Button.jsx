import styled from "styled-components";

const Button = styled.button`
  background-color: var(--primary);
  padding: 10px 16px;
  &:hover {
    opacity: 0.9;
  }
  border-radius: 12px;
  font-weight: bold;
`;

export default Button;
