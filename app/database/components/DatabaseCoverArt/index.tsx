import React, { useState, useRef, useLayoutEffect } from 'react'

import * as R from 'ramda'

import cx from 'classnames'

import DatabaseFile from '@app/database/data/DatabaseFile'

import * as  Icons from '@app/common/icons'

import { dirname } from '@app/common/utils/path'

import styles from './styles.scss'

const getDirectorySrc = (uri: string) => {
  const encodedUri = encodeURIComponent(
    dirname(uri) + '/'
  )

  return `/api/database/cover/directory?uri=${encodedUri}`
}

const getEmbeddedSrc = (uri: string) => {
  const encodedUri = encodeURIComponent(uri)

  return `/api/database/cover/embedded?uri=${encodedUri}`
}

interface Props {
  className?: string
  fallbackIconClassName?: string
  file: DatabaseFile
}

const DatabaseCoverArt = ({ className, fallbackIconClassName, file }: Props) => {
  const [state, setState] = useState<'initial' | 'done' | 'error'>('initial')

  const hasTriedFallbackRef = useRef(false)

  const [src, setSrc] = useState(
    getDirectorySrc(file.uri)
  )

  useLayoutEffect(() => {
    setSrc(
      getDirectorySrc(file.uri)
    )
  }, [file.uri])

  useLayoutEffect(() => {
    setState('initial')
  }, [src])

  if (R.isNil(src)) {
    return null
  }

  const handleLoad = () => {
    setState('done')
  }

  const handleError = () => {
    if (hasTriedFallbackRef.current) {
      setState('error')

      return
    }

    setSrc(
      getEmbeddedSrc(file.uri)
    )

    hasTriedFallbackRef.current = true
  }

  const imgClassName = cx(styles.cover, className, {
    [styles.hidden]: state === 'error'
  })

  return (
    <React.Fragment>
      <If condition={state === 'error'}>
        <div className={cx(styles.fallback, className)}>
          <Icons.CompactDisc className={cx(styles.icon, fallbackIconClassName)} />
        </div>
      </If>
      <img
        className={imgClassName}
        src={src}
        alt="Current song cover art"
        onLoad={handleLoad}
        onError={handleError}
      />
    </React.Fragment>
  )
}

export default DatabaseCoverArt
