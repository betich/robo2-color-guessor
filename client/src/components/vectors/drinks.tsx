import type { SVGProps } from "react";

export default function Drinks({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="113"
      height="181"
      viewBox="0 0 113 181"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M55 80.0306L2 19.0306L111.5 14.5306L60.5 80.0306L63.5 167.031C66.7 175.831 81.8333 179.364 89 180.031H21.5L38.5 173.031C50.5 173.031 54.5 167.031 55 164.031V80.0306Z"
        fill="#0E294B"
        stroke="#0E294B"
      />
      <path
        d="M58.5833 76.5306L19 23.7529L104 19.5306L58.5833 76.5306Z"
        fill="#EEE27B"
      />
      <path
        d="M93.444 5.90502L91.6869 4.12664L54.4867 63.7957L55 63.7957L93.444 5.90502Z"
        fill="#FFF1E0"
      />
      <ellipse
        cx="65.2783"
        cy="42.6903"
        rx="11"
        ry="12"
        transform="rotate(6.4495 65.2783 42.6903)"
        fill="#07807F"
      />
      <ellipse
        cx="63.0645"
        cy="49.6803"
        rx="5.13991"
        ry="3.41102"
        transform="rotate(23.0244 63.0645 49.6803)"
        fill="#FBC0C8"
      />
    </svg>
  );
}
