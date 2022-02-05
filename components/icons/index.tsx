import React from "react";
import IconPlus from "./icon-plus";
import IconCheck from "./icon-check";
export type SvgType = "icon-check" | "icon-plus";

interface Props extends React.SVGProps<SVGSVGElement> {
  type: SvgType;
  fontIcon?: boolean;
}

type ComponentType = React.FC<React.SVGProps<SVGSVGElement>>;

const svgs: Record<SvgType, ComponentType> = {
  "icon-plus": IconPlus,
  "icon-check": IconCheck,
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
