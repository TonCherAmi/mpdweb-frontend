import React from 'react'

import cx from 'classnames'

import * as R from 'ramda'

import Crumbs from '@app/common/components/Crumbs'
import Button from '@app/common/components/Button'

import * as Icons from '@app/common/icons'

import { uriToCrumbs } from '@app/database/utils/uri'

import styles from './styles.scss'

interface Props {
  uri: string
  pathPrefix: string
  onHomeClick: React.EventHandler<React.MouseEvent>
  onBackClick: React.EventHandler<React.MouseEvent>
  onForwardClick: React.EventHandler<React.MouseEvent>
}

const DatabaseViewMainHeader: React.FC<Props> = ({
  uri,
  pathPrefix,
  onHomeClick,
  onBackClick,
  onForwardClick
}) => {
  const crumbs = uriToCrumbs(uri, pathPrefix)

  return (
    <div className={styles.container}>
      <div className={styles.uri}>
        <Button className={styles.button} onClick={onHomeClick}>
          <Icons.FolderOpenFill className={styles.icon} />
        </Button>
        <Choose>
          <When condition={R.isEmpty(crumbs)}>
            /
          </When>
          <Otherwise>
            <Crumbs list={crumbs} />
          </Otherwise>
        </Choose>
      </div>
      <div className={styles.controls}>
        <Button className={styles.button} onClick={onBackClick}>
          <Icons.ArrowAltCircleLeftFill className={cx(styles.icon, styles.back)} />
        </Button>
        <Button className={styles.button} onClick={onForwardClick}>
          <Icons.ArrowAltCircleRightFill className={cx(styles.icon, styles.forward)} />
        </Button>
        <Button className={styles.button} onClick={onHomeClick}>
          <Icons.HomeFill className={cx(styles.icon, styles.home)} />
        </Button>
      </div>
    </div>
  )
}

export default DatabaseViewMainHeader
