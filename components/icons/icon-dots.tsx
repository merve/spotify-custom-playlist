import { SVGProps } from "react";

const IconDots = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={4}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.998-.001a2 2 0 1 0 .001 3.999A2 2 0 0 0 2.998 0v-.001Zm10.001 0a2 2 0 1 0-.001 3.999A2 2 0 0 0 13 0l-.001-.001ZM23-.001a2 2 0 1 0 0 3.999A2 2 0 0 0 23 0v-.001Z"
      fill="currentColor"
    />
  </svg>
);

export default IconDots;
