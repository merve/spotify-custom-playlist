import React from "react";
import styled from "styled-components";
import convertValue from "../helpers/ConvertCSSValue";
import { fontDef } from "./global-style";

export interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  width?: string | number;
  height?: string | number;
  color?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string | number;
  fontWeight?: number;
  fontSize?: string;
}

const StyledButton = styled.button<IButtonProps>`
  display: grid;
  place-items: center;
  border: none;
  cursor: pointer;
  line-height: 1;
  letter-spacing: 2px;
  ${(p) => p.width && `width: ${convertValue(p.width)};`};
  ${(p) => p.height && `height: ${convertValue(p.height)};`};
  ${(p) => p.color && `color: ${p.color};`};
  ${(p) => p.backgroundColor && `background-color: ${p.backgroundColor};`};
  ${(p) => p.padding && `padding: ${p.padding};`};
  ${(p) => p.margin && `margin: ${p.margin};`};
  ${(p) => p.borderRadius && `border-radius: ${convertValue(p.borderRadius)};`};
  ${(p) => p.fontWeight && `font-weight: ${p.fontWeight};`};
  ${(p) => p.fontSize && `font-size: ${p.fontSize};`};
  &:hover {
    ${(p) =>
      p.hoverBackgroundColor && `background-color: ${p.hoverBackgroundColor};`};
    transition: all 0.3s;
  }
`;

type Props = React.PropsWithRef<React.PropsWithChildren<IButtonProps>>;

export const Button: React.FC<Props> = (props: Props): JSX.Element => {
  return <StyledButton className="btn" {...props} />;
};

Button.defaultProps = {
  color: "var(--color-white)",
  backgroundColor: "var(--color-primary)",
  hoverBackgroundColor: "var(--color-primary-light)",
  padding: "14px 32px",
  margin: "0",
  borderRadius: "100px",
  fontWeight: 700,
  fontSize: fontDef.bodySmall.size,
};

export default Button;
