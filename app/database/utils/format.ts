import * as R from 'ramda'

import DatabaseTags from '@app/database/data/DatabaseTags'
import DatabaseAudioFormat from '@app/database/data/DatabaseAudioFormat'

export const formatDatabaseAudioFormat = (format: DatabaseAudioFormat) => {
  return format ? `${format.samplingRate / 1000} kHz` : '-'
}

export const formatDatabaseAudioFormatMultiline = (format: DatabaseAudioFormat) => {
  return format ? `Bit depth: ${format.bitDepth}
Sampling rate: ${format.samplingRate} Hz
Number of channels: ${format.numberOfChannels}` : '-'
}

interface FormattedDatabaseTags {
  artist: Nullable<string>
  title: Nullable<string>
  album: Nullable<string>
}

const joinOrNullIfEmpty = (xs: ReadonlyArray<string>): Nullable<string> => (
  R.isEmpty(xs) ? null : R.join(', ', xs)
)

export const formatDatabaseTags = (tags: DatabaseTags): FormattedDatabaseTags => {
  return {
    artist: joinOrNullIfEmpty(tags.artists),
    title: joinOrNullIfEmpty(tags.titles),
    album: joinOrNullIfEmpty(tags.albums),
  }
}
