import { SVGProps } from "react";

const IconPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      stroke="var(--color-white)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M5.497.75v9.494" />
      <path d="M.75 5.497h9.494" />
    </g>
  </svg>
);

export default IconPlus;
