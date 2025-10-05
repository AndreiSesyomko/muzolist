import React, {useState, useRef, useEffect, useContext} from 'react';
import {Button, Image, ProgressBar, Form} from 'react-bootstrap';
import { ReactComponent as Play } from '../assets/play.svg';
import { ReactComponent as Pause } from '../assets/pause.svg';
import { ReactComponent as PrevNext } from '../assets/prev-next.svg';
import default_cover from '../assets/muzolist_logo.png';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const AudioPlayer = () => {
    const {audioPlayer, trackList} = useContext(Context);
    const tracks = trackList.tracks;

    useEffect(() => {

        if (!audioPlayer.audioPlayer) {
            audioPlayer.setAudioPlayer(new Audio(tracks[audioPlayer.currentIndex].src));
        }

        const audio = audioPlayer.audioPlayer;

        const url = new URL(audio.src);

        if (url.pathname !== tracks[audioPlayer.currentIndex]?.src) {
            audio.src = tracks[audioPlayer.currentIndex]?.src;
            audioPlayer.audioPlayer.load();
        }

        audio.volume = audioPlayer.volume ?? 1;

        const onLoadedMetadata = () => {
            console.log('started', audioPlayer.currentIndex);
            audioPlayer.setDuration(audio.duration);
        };
        const onTimeUpdate = () => {
            audioPlayer.setCurrentTime(audio.currentTime);
            audioPlayer.setProgress((audio.currentTime / audio.duration) * 100);
        };
        const onEnded = () => {
            const nextIndex = (audioPlayer.currentIndex + 1) % tracks.length;
            audioPlayer.setCurrentIndex(nextIndex);
            console.log('ended', audioPlayer.currentIndex);
        };

        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('ended', onEnded);

        if (audioPlayer.playing) {
            audio.play();
        } else {
            audio.pause();
        }

        return () => {
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('ended', onEnded);
        };

    }, [audioPlayer.currentIndex, trackList.tracks, audioPlayer]);

    const togglePlayPause = () => {
        const audio = audioPlayer.audioPlayer;
        if (audioPlayer.playing) {
            audio.pause();
        } else {
            console.log(audioPlayer.audioPlayer, 'aaa')
            audio.play();
        }
        audioPlayer.setPlaying(!audioPlayer.playing);
        audioPlayer.setIsRotating(!audioPlayer.isRotating);
    };

    const handleNext = () => {
        audioPlayer.setCurrentIndex((audioPlayer.currentIndex + 1) % tracks.length);
    };

    const handlePrev = () => {
        audioPlayer.setCurrentIndex((audioPlayer.currentIndex === 0 ? tracks.length - 1 : audioPlayer.currentIndex - 1));
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        audioPlayer.setVolume(newVolume);
        if (audioPlayer.audioPlayer) audioPlayer.audioPlayer.volume = newVolume;
    };

    const handleProgressClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * audioPlayer.duration;
        audioPlayer.audioPlayer.currentTime = newTime;
        audioPlayer.setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="d-flex align-items-center justify-content-between" style={{ width: 900 }}>
            <Image className={`cover ${audioPlayer.isRotating ? 'rotate' : ''}`} src={tracks[audioPlayer.currentIndex]?.cover ? tracks[audioPlayer.currentIndex].cover : default_cover} alt="cover" />

            <div className="mb-2">
                <h5>{tracks[audioPlayer.currentIndex]?.title}</h5>
                <div className="d-flex align-items-center justify-content-start">
                    <small>{tracks[audioPlayer.currentIndex]?.artist ? tracks[audioPlayer.currentIndex].artist : 'Неизвестен'}</small>
                    &nbsp;|&nbsp;
                    <small>{tracks[audioPlayer.currentIndex]?.album ? tracks[audioPlayer.currentIndex].album : 'Неизвестен'}</small>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center justify-content-center mt-4" style={{ width: 300 }}>
                <div onClick={handleProgressClick} style={{width: '100%', cursor: 'pointer'}}>
                    <ProgressBar now={audioPlayer.progress}/>
                </div>
                <div className="d-flex justify-content-between w-100 mt-1 mb-3">
                    <small>{formatTime(audioPlayer.currentTime)}</small>
                    <small>{formatTime(audioPlayer.duration)}</small>
                </div>
            </div>

            <div className="d-flex">
                <Button variant="secondary" onClick={handlePrev} style={{padding: 0}}><PrevNext className='playPause prev'/></Button>
                <Button style={{padding: 0}} variant="secondary" onClick={togglePlayPause}>
                    {audioPlayer.playing ? <Pause className="playPause"/> : <Play className="playPause"/>}
                </Button>
                <Button style={{padding: 0}} variant="secondary" onClick={handleNext}><PrevNext className='playPause'/></Button>
            </div>

            <Form.Range
                style={{ width: 100 }}
                min={0}
                max={1}
                step={0.01}
                value={audioPlayer.volume ?? 1}
                onChange={handleVolumeChange}
                aria-label="Громкость"
            />
        </div>
    );
};

export default observer(AudioPlayer);
