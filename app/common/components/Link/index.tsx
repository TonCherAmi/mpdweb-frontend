import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

import cx from 'classnames'

import styles from './styles.scss'

interface LinkProps {
  className?: string
  to: string
}

const Link = ({
  className,
  to,
  children,
  ...props
}: React.PropsWithChildren<LinkProps>) => {
  return (
    <ReactRouterLink
      {...props}
      className={cx(className, styles.link)}
      to={to}
    >
      {children}
    </ReactRouterLink>
  )
}

export default Link
