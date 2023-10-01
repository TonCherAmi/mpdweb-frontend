import QueueSource from '@app/channel/data/QueueSource'
import { OneshotState } from '@app/status/data/Status'

type Action = { dbUpdate: { uri: Nullable<string> } }
  | { queueAdd: { sources: ReadonlyArray<QueueSource> } }
  | { queueReplace: { sources: ReadonlyArray<QueueSource> } }
  | 'queueClear'
  | { queueRemove: { id: number } }
  | 'queueNext'
  | 'queuePrev'
  | { queueRepeat: { state: boolean } }
  | { queueConsume: { state: OneshotState } }
  | { queueRandom: { state: boolean } }
  | { queueSingle: { state: OneshotState } }
  | { playbackPlay: { id: Nullable<number> } }
  | 'playbackStop'
  | 'playbackToggle'
  | { playbackSeek: { time: number } }
  | { volumeSet: { value: number } }

export default Action
