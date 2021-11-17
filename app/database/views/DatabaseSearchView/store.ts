import { action, observable } from 'mobx'

import DatabaseItem from '@app/database/dto/DatabaseItem'

import DatabaseApi from '@app/database/api'
import RemoteListStore from '@app/common/stores/RemoteListStore'
import DatabaseSearchBody from '@app/database/dto/api/request/DatabaseSearchBody'

class DatabaseSearchViewStore extends RemoteListStore<DatabaseItem[], DatabaseSearchBody>{
  @observable
  input = ''

  constructor() {
    super(DatabaseApi.search)
  }

  @action
  async search(term: string) {
    await this.load({ term })
  }

}

export default new DatabaseSearchViewStore()
