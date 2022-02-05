import { SVGProps } from "react";

const IconCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg height={32} width={32} {...props}>
    <path d="M16 1C7.715 1 1 7.715 1 16s6.715 15 15 15 15-6.715 15-15S24.285 1 16 1zm-2.504 23.481-6.035-7.062 1.512-1.777 4.523 5.285 9.473-11.1 1.754 1.5-11.227 13.154z" />
    <path fill="none" d="M0 0h32v32H0z" />
  </svg>
);

export default IconCheck;
