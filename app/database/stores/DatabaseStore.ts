import { action, computed, observable } from 'mobx'

import * as R from 'ramda'

import DatabaseItem from '@app/database/dto/DatabaseItem'

import { dirname } from '@app/common/utils/path'

import DatabaseApi from '@app/database/api'

export const DATABASE_ROOT_URI = '/'

class DatabaseStore {
  private static URI_DEFAULT = { main: DATABASE_ROOT_URI, preview: null }

  @observable
  uri: {
    main: string
    preview: string
  } = DatabaseStore.URI_DEFAULT

  @observable
  mainUri: string = DATABASE_ROOT_URI

  @observable
  previewUri: string

  @observable
  mainItems: DatabaseItem[] = []

  @observable
  previewItems: DatabaseItem[] = []

  @computed
  get isMainInRoot() {
    return R.equals(this.uri.main, DATABASE_ROOT_URI)
  }

  @computed
  get isPreviewInRoot() {
    return R.equals(this.uri.preview, DATABASE_ROOT_URI)
  }

  @action
  async update() {
    await DatabaseApi.update()
  }

  @action
  async retrieveMain(uri: string = this.uri.main) {
    this.uri.main = uri

    this.mainItems = await DatabaseApi.get({ uri })
  }

  @action
  retrieveMainParent() {
    if (this.isMainInRoot) {
      return
    }

    const uri = dirname(this.uri.main)

    this.retrieveMain(uri)
  }

  @action
  clearPreview() {
    this.uri.preview = null

    this.previewItems = []
  }

  @action
  async retrievePreview(uri: string) {
    this.uri.preview = uri

    this.previewItems = await DatabaseApi.get({ uri })
  }

  @action
  retrievePreviewParent() {
    if (this.isPreviewInRoot) {
      return
    }

    const uri = dirname(this.previewUri)

    this.retrievePreview(uri)
  }
}

export default new DatabaseStore()
