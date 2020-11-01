import Handler from '@app/common/handlers/Handler'

import Status from '@app/status/dto/Status'

import StatusStore from '@app/status/stores/StatusStore'

const handler: Handler<Status> = (status: Status) => {
  StatusStore.set(status)
}

export default handler
