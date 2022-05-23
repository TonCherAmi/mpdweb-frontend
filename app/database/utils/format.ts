import DatabaseAudioFormat from '@app/database/data/DatabaseAudioFormat'

export const formatDatabaseAudioFormat = (format: DatabaseAudioFormat) => {
  return `${format.samplingRate / 1000} kHz`
}

export const formatDatabaseAudioFormatMultiline = (format: DatabaseAudioFormat) => {
  return `Bit depth: ${format.bitDepth}
Sampling rate: ${format.samplingRate} Hz
Number of channels: ${format.numberOfChannels}`
}
