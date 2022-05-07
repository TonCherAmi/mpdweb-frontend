import VolumeApi from '@app/volume/api'

class VolumeService {
  async set(volume: number) {
    await VolumeApi.set({ volume })
  }
}

export default new VolumeService()
