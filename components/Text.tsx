import { HTMLAttributes } from "react";
import styled from "styled-components";

import { fontDef } from "./global-style";

export type TextType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "bodySmall"
  | "bodyLarge"
  | "small";

interface BaseTextProps {
  type: TextType;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: number;
  italic?: boolean;
  overflowWrap?: "normal" | "break-word" | "anywhere";
  textAlign?: "center" | "inherit" | "justify" | "left" | "right";
  margin?: string;
  padding?: string;

  color?: string;
}

const mapStyleToType = (type: TextType): string => {
  return `
        font-size: ${fontDef[type].size};
        font-weight: ${fontDef[type].weight};
    `;
};

export const BaseText = styled.div<BaseTextProps>`
  ${(p) => mapStyleToType(p.type)}
  ${(p) => p.fontSize && `font-size: ${p.fontSize};`}
    ${(p) => p.fontWeight && `font-weight: ${p.fontWeight};`}
    ${(p) => p.lineHeight && `line-height: ${p.lineHeight};`}
    ${(p) => p.italic && `font-style: italic;`}
    ${(p) => p.overflowWrap && `overflow-wrap: ${p.overflowWrap};`}
    ${(p) => p.textAlign && `text-align: ${p.textAlign};`}
    ${(p) => `margin: ${p.margin ?? 0};`}
    ${(p) => `padding: ${p.padding ?? 0};`}

    ${(p) => p.color && `color: ${p.color};`}
`;

export interface ITextProps
  extends BaseTextProps,
    HTMLAttributes<HTMLParagraphElement> {}

export const Text: React.FC<ITextProps> = ({
  type = "body",
  tag = "div",
  ...props
}: ITextProps): JSX.Element => {
  return <BaseText as={tag} type={type} {...props}></BaseText>;
};

export default Text;
