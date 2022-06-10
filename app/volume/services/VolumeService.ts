import VolumeApi from '@app/volume/api'

class VolumeService {
  set(volume: number) {
    VolumeApi.set({ volume, mode: 'ABSOLUTE' })
  }

  inc(volume: number) {
    VolumeApi.set({ volume, mode: 'INC' })
  }

  dec(volume: number) {
    VolumeApi.set({ volume, mode: 'DEC' })
  }
}

export default new VolumeService()
