import React, { useState, useRef, useEffect } from 'react';
import {Button, Image, ProgressBar} from 'react-bootstrap';
import { ReactComponent as Play } from '../assets/play.svg';
import { ReactComponent as Pause } from '../assets/pause.svg';
import { ReactComponent as PrevNext } from '../assets/prev-next.svg';
import default_cover from '../assets/muzolist_logo.png';

const AudioPlayer = ({ tracks }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isRotating, setIsRotating] = useState(false);

    const audioRef = useRef(new Audio(tracks[0].src));

    useEffect(() => {
        const audio = audioRef.current;
        audio.pause();
        audio.src = tracks[currentIndex].src;

        const onLoadedMetadata = () => setDuration(audio.duration);
        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        };
        const onEnded = () => {
            handleNext();
        };

        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('ended', onEnded);

        if (playing) {
            audio.play();
        } else {
            audio.pause();
        }

        return () => {
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('ended', onEnded);
        };
    }, [currentIndex, tracks]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (playing) {
            audio.pause();
        } else {
            audio.play();
        }
        setPlaying(!playing);
        setIsRotating(!isRotating);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? tracks.length - 1 : prevIndex - 1));
    };

    const handleProgressClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="d-flex align-items-center justify-content-between" style={{ width: 750 }}>
            <Image className={`cover ${isRotating ? 'rotate' : ''}`} src={tracks[currentIndex].cover ? tracks[currentIndex].cover : default_cover} alt="cover" />

            <div className="mb-2">
                <h5>{tracks[currentIndex].title}</h5>
                <div className="d-flex align-items-center justify-content-around">
                    <small>{tracks[currentIndex].artist ? tracks[currentIndex].artist : 'Неизвестен'}</small> |
                    <small>{tracks[currentIndex].album ? tracks[currentIndex].album : 'Неизвестен'}</small>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center justify-content-center mt-4" style={{ width: 300 }}>
                <div onClick={handleProgressClick} style={{width: '100%', cursor: 'pointer'}}>
                    <ProgressBar now={progress}/>
                </div>
                <div className="d-flex justify-content-between w-100 mt-1 mb-3">
                    <small>{formatTime(currentTime)}</small>
                    <small>{formatTime(duration)}</small>
                </div>
            </div>


            <div className="d-flex">
                <Button variant="secondary" onClick={handlePrev} style={{padding: 0}}><PrevNext className='playPause prev'/></Button>
                <Button style={{padding: 0}} variant="secondary" onClick={togglePlayPause}>
                    {playing ? <Pause className="playPause"/> : <Play className="playPause"/>}
                </Button>
                <Button style={{padding: 0}} variant="secondary" onClick={handleNext}><PrevNext className='playPause'/></Button>
            </div>
        </div>
    );
};

export default AudioPlayer;
