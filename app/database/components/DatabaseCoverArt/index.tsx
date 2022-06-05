import React, { useState, useRef, useLayoutEffect } from 'react'

import * as R from 'ramda'

import cx from 'classnames'

import DatabaseFile from '@app/database/data/DatabaseFile'

import * as  Icons from '@app/common/icons'

import { dirname } from '@app/common/utils/path'

import styles from './styles.scss'

const getDirectorySrc = (databaseFile: DatabaseFile) => {
  const uri = encodeURIComponent(
    dirname(databaseFile.uri) + '/'
  )

  return `/api/database/cover/directory?uri=${uri}`
}

const getEmbeddedSrc = (databaseFile: DatabaseFile) => {
  const uri = encodeURIComponent(databaseFile.uri)

  return `/api/database/cover/embedded?uri=${uri}`
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
    getDirectorySrc(file)
  )

  useLayoutEffect(() => {
    setSrc(
      getDirectorySrc(file)
    )
  }, [file])

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
      getEmbeddedSrc(file)
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
