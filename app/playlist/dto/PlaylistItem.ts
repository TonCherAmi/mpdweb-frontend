import Duration from '@app/common/dto/Duration'

interface PlaylistItem {
    id: string,
    position: number,
    file: string,
    title: string | null,
    artist: string | null,
    duration: Duration
}

export default PlaylistItem
