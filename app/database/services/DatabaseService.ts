import DatabaseApi from '@app/database/api'

class DatabaseService {
  async update() {
    await DatabaseApi.update()
  }
}

export default new DatabaseService()
