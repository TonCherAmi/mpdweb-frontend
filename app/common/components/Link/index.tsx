import React from 'react'

import { Link as ReactRouterLink } from 'react-router-dom'

import cx from 'classnames'

import styles from './styles.scss'

interface Props {
  className?: string
  to: string
  children: React.ReactNode
}

const Link = ({ className, to, children, ...props }: Props) => {
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
