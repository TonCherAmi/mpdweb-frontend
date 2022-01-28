declare module '*.svg' {
  import React from 'react'

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>

  const src: string

  export default src
}

declare module '*.scss' {
  export const content: { [className: string]: string }

  export default content
}
