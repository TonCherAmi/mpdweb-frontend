import React, { useState, useRef, useLayoutEffect, memo } from 'react'

import * as R from 'ramda'

import cx from 'classnames'

import Thunk from '@app/common/types/Thunk'

import * as  Icons from '@app/common/icons'

import { dirname } from '@app/common/utils/path'

import styles from './styles.scss'

const getFileSrc = (uri: string) => {
  const encodedUri = encodeURIComponent(
    dirname(uri) + '/'
  )

  return `/api/database/cover?uri=${encodedUri}&kind=file`
}

const getEmbeddedSrc = (uri: string) => {
  const encodedUri = encodeURIComponent(uri)

  return `/api/database/cover?uri=${encodedUri}&kind=embedded`
}

interface Props {
  className?: string
  fallbackIconClassName?: string
  uri: string
  onClick?: React.MouseEventHandler
  onSuccess?: Thunk
}

const DatabaseCoverArt = memo(({
  className,
  fallbackIconClassName,
  uri,
  onClick,
  onSuccess,
}: Props) => {
  const [state, setState] = useState<'initial' | 'done' | 'error'>('initial')

  const hasTriedAltSrcRef = useRef(false)

  const [src, setSrc] = useState(
    getFileSrc(uri)
  )

  useLayoutEffect(() => {
    setSrc(
      getFileSrc(uri)
    )

    hasTriedAltSrcRef.current = false
  }, [uri])

  useLayoutEffect(() => {
    setState('initial')
  }, [src])

  if (R.isNil(src)) {
    return null
  }

  const handleLoad = () => {
    setState('done')

    onSuccess?.()
  }

  const handleError = () => {
    if (hasTriedAltSrcRef.current) {
      setState('error')

      return
    }

    setSrc(getEmbeddedSrc(uri))

    hasTriedAltSrcRef.current = true
  }

  const imgClassName = cx(styles.cover, className, {
    [styles.hidden]: state !== 'done',
    [styles.clickable]: !R.isNil(onClick),
  })

  return (
    <React.Fragment>
      <If condition={state !== 'done'}>
        <div className={cx(styles.fallback, className)}>
          <Icons.CompactDisc className={cx(styles.icon, fallbackIconClassName)} />
        </div>
      </If>
      <img
        className={imgClassName}
        src={src}
        alt="Current song cover art"
        onLoad={handleLoad}
        onClick={onClick}
        onError={handleError}
      />
    </React.Fragment>
  )
})

export default DatabaseCoverArt
