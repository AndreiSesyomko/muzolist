import { makeAutoObservable } from 'mobx';

export const testTracks = [
    {
        id: 1,
        title: 'Send a Sign',
        artist: '',
        cover: './testcover/image-61785-800.jpg',
        album: '',
        src: '/testaudio/t1.mp3',
    },
    {
        id: 2,
        title: 'Dim the Lights',
        artist: '',
        cover: '',
        album: '',
        src: '/testaudio/t2.mp3',
    },
    {
        id: 3,
        title: 'Поворот',
        artist: 'Машина Времени',
        cover: '',
        album: '',
        src: '/testaudio/Машина Времени - Поворот [audiovk.com].mp3',
    },
    {
        id: 4,
        title: 'Привет',
        artist: 'Секрет',
        cover: '',
        album: '',
        src: '/testaudio/Секрет - Привет [audiovk.com].mp3',
    },
    {
        id: 5,
        title: 'House of The Rising Sun',
        artist: 'Animals',
        cover: '',
        album: '',
        src: '/testaudio/Animals feat. Alan Price, John Steel, Eric Burdon - House of the Rising Sun [audiovk.com].mp3',
    },
    {
        id: 6,
        title: 'Lordly',
        artist: 'Feder feat. Alex Aiono',
        cover: '',
        album: '',
        src: '/testaudio/Tejon Street Corner Thieves - Whiskey.mp3',
    },
    {
        id: 7,
        title: 'Моя любовь на пятом этаже',
        artist: 'Секрет',
        cover: '',
        album: '',
        src: '/testaudio/Секрет - Моя любовь на пятом этаже.mp3',
    },
    {
        id: 8,
        title: 'Infinity',
        artist: 'Infinity Ink',
        cover: '',
        album: '',
        src: '/testaudio/Infinity Ink - Infinity.mp3',
    },
]

export default class TrackListStore {
    tracks = []
    currentTracks = []
    isEquals = true

    setTracks(tracks) {
        this.tracks = tracks;
    }

    setCurrentTracks(tracks) {
        this.currentTracks = tracks;
    }

    setIsEquals(isEquals) {
        this.isEquals = isEquals;
    }
}