import React from 'react'

import * as R from 'ramda'

import { basename } from '@app/common/utils/path'

interface DatabaseViewPreviewHeaderProps {
  uri: string | null
}

const DatabaseViewPreviewHeader = ({ uri }: DatabaseViewPreviewHeaderProps) => {
  if (R.isNil(uri)) {
    return null
  }

  const name = basename(uri)

  return (
    <div>
      <span>{name}</span>
    </div>
  )
}

export default DatabaseViewPreviewHeader
