import React from "react";
import IconPlus from "./icon-plus";
import IconCheck from "./icon-check";
import IconHeart from "./icon-heart";
import IconDots from "./icon-dots";
import IconPlay from "./icon-play";
import IconDuration from "./icon-duration";
import Logo from "./logo";

export type SvgType =
  | "logo"
  | "icon-check"
  | "icon-plus"
  | "icon-heart"
  | "icon-dots"
  | "icon-play"
  | "icon-duration";

interface Props extends React.SVGProps<SVGSVGElement> {
  type: SvgType;
  fontIcon?: boolean;
}

type ComponentType = React.FC<React.SVGProps<SVGSVGElement>>;

const svgs: Record<SvgType, ComponentType> = {
  logo: Logo,
  "icon-plus": IconPlus,
  "icon-check": IconCheck,
  "icon-heart": IconHeart,
  "icon-dots": IconDots,
  "icon-play": IconPlay,
  "icon-duration": IconDuration,
};

export const Svg: React.FC<Props> = ({
  type,
  fontIcon,
  ...props
}: Props): JSX.Element => {
  const Component: ComponentType = svgs[type];

  return (
    <Component
      data-type={type}
      {...(fontIcon && { height: "1em" })}
      {...props}
    />
  );
};
