import { makeAutoObservable } from 'mobx';

export default class AudioStore {
    currentIndex = 0;
    playing = false;
    currentTime = 0;
    duration = 0;
    progress = 0;
    isRotating = false;
    audioPlayer = null;
    volume = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setCurrentIndex(index) {
        this.currentIndex = index;
    }

    setPlaying(isPlaying) {
        this.playing = isPlaying;
    }

    setCurrentTime(time) {
        this.currentTime = time;
    }

    setDuration(duration) {
        this.duration = duration;
    }

    setProgress(progress) {
        this.progress = progress;
    }

    setIsRotating(isRotating) {
        this.isRotating = isRotating;
    }

    setAudioPlayer(audioPlayer) {
        this.audioPlayer = audioPlayer;
    }

    setVolume(volume) {
        this.volume = volume;
    }
}