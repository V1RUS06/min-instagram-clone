import * as React from "react"
import { SVGProps } from "react"

const LeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <path
      d="m12.51 16.588-5.451-5.424a1.646 1.646 0 0 1 0-2.329l5.451-5.424"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      data-name="vuesax/linear/arrow-left"
    />
  </svg>
)

export default LeftArrow
