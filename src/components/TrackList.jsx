import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Col, Image, ListGroup, Row} from "react-bootstrap";
import {Context} from "../index";
import default_cover from "../assets/muzolist_logo.png";
import { ReactComponent as Play } from '../assets/play.svg';
import { ReactComponent as Pause } from '../assets/pause.svg';

const TrackList = ({height="580px"}) => {
    const {trackList, audioPlayer} = useContext(Context);

    const togglePlayPause = async (index) => {
        trackList.setCurrentTracks(trackList.tracks);
        trackList.setIsEquals(true);

        if (audioPlayer.currentIndex !== index) {
            audioPlayer.setCurrentIndex(index);

            audioPlayer.audioPlayer.src = trackList.tracks[index].src;
            audioPlayer.audioPlayer.load();

            await new Promise((resolve) => {
                audioPlayer.audioPlayer.onloadedmetadata = resolve;
            });

            try {
                await audioPlayer.audioPlayer.play();
                audioPlayer.setPlaying(true);
                audioPlayer.setIsRotating(true);
            } catch (e) {
                audioPlayer.setPlaying(false);
                audioPlayer.setIsRotating(false);
            }
        } else {
            const audio = audioPlayer.audioPlayer;

            if (audioPlayer.playing) {
                audio.pause();
                audioPlayer.setPlaying(false);
                audioPlayer.setIsRotating(false);
            } else {
                try {
                    await audio.play();
                    audioPlayer.setPlaying(true);
                    audioPlayer.setIsRotating(true);
                } catch (e) {
                    audioPlayer.setPlaying(false);
                    audioPlayer.setIsRotating(false);
                }
            }
        }
    };

    return (
        trackList.tracks?.length > 0 ? <ListGroup className="custom-scrollbar" style={{ height: height, overflowY: "auto" }}>
            {trackList.tracks.map((track, index) => <ListGroup.Item active={audioPlayer.currentIndex === index && trackList.isEquals} onClick={() => togglePlayPause(index)} action key={index}>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center justify-content-left">
                        <Image
                            className={`cover me-4 ${audioPlayer.isRotating && audioPlayer.currentIndex === index && trackList.isEquals ? 'rotate' : ''}`}
                            src={track.cover ? track.cover : default_cover} alt="cover"/>
                        <div>
                            <h5>{track.title}</h5>
                            <div className="d-flex align-items-center justify-content-start">
                                <small>{track.artist ? track.artist : 'Неизвестен'}</small>
                                &nbsp;|&nbsp;
                                <small>{track.album ? track.album : 'Неизвестен'}</small>
                            </div>
                        </div>
                    </div>
                    {audioPlayer.playing && audioPlayer.currentIndex === index && trackList.isEquals ? <Pause className="playPause"/> : <Play className="playPause"/>}
                </div>
            </ListGroup.Item>)}
        </ListGroup> : <p>Треки не найдены :(</p>

    );
};

export default observer(TrackList);