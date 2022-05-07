interface PlaybackSeekBody {
  time: number
  mode: 'BACK' | 'FORWARD' | 'ABSOLUTE'
}

export default PlaybackSeekBody
