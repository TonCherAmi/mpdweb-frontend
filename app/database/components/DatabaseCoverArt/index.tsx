import React, { useState, useLayoutEffect } from 'react'

import cx from 'classnames'

import * as R from 'ramda'

import DatabaseFile from '@app/database/dto/DatabaseFile'

import * as  Icons from '@app/common/icons'

import Spinner from '@app/common/components/Spinner'

import { dirname } from '@app/common/utils/path'

import styles from './styles.scss'

const getSrc = (databaseFile: DatabaseFile) => {
  const uri = encodeURIComponent(
    dirname(databaseFile.uri) + '/'
  )

  return `/api/database/cover?uri=${uri}`
}

interface Props {
  className?: string
  fallbackIconClassName?: string
  file: DatabaseFile
}

const DatabaseCoverArt = ({ className, fallbackIconClassName, file }: Props) => {
  const [state, setState] = useState<'initial' | 'done' | 'error'>('initial')

  const src = getSrc(file)

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
    setState('error')
  }

  const imgClassName = cx(styles.cover, className, {
    [styles.hidden]: state !== 'done'
  })

  return (
    <React.Fragment>
      <If condition={state === 'initial'}>
        <div className={cx(styles.fallback, className)}>
          <Spinner />
        </div>
      </If>
      <If condition={state === 'error'}>
        <div className={cx(styles.fallback, className)}>
          <Icons.MusicNoteList className={cx(styles.icon, fallbackIconClassName)} />
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
