import QueueApi from '@app/queue/api'

class QueueService {
  add(uri: string) {
    QueueApi.add({ uri })
  }

  clear() {
    QueueApi.delete({ id: null })
  }

  delete(id: number) {
    QueueApi.delete({ id })
  }

  replace(uri: string) {
    QueueApi.replace({ uri })
  }
}

export default new QueueService()
