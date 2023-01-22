import React, { useState, useEffect } from 'react'

import * as R from 'ramda'

import * as Icons from '@app/common/icons'

import Spinner from '@app/common/components/Spinner'

import useRawStatusContext from '@app/status/use/useRawStatusContext'

import styles from './styles.scss'

const Error = ({ message }: { message: string }) => (
  <div className={styles.error}>
    <Icons.TriangleExclamation className={styles.icon} />
    <span className={styles.message}>{message}</span>
  </div>
)

const BLOCKER_TIMEOUT_MS = 500

type Blocker = 'spinner' | { message: string }

const UiBlocker = () => {
  const status = useRawStatusContext()

  const [blocker, setBlocker] = useState<Nullable<Blocker>>(null)

  useEffect(() => {
    if (status?.status === 'ok') {
      setBlocker(null)

      return
    }

    const timeoutId = setTimeout(() => {
      const value = R.isNil(status)
        ? 'spinner'
        : { message: status.message }

      setBlocker(value)
    }, BLOCKER_TIMEOUT_MS)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [status])

  if (R.isNil(blocker)) {
    return null
  }

  const content = blocker === 'spinner'
    ? <Spinner />
    : <Error message={blocker.message} />

  return (
    <div className={styles.blocker}>
      {content}
    </div>
  )
}

export default UiBlocker
