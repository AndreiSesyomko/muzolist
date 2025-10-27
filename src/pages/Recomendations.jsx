import React, {useContext, useEffect} from 'react';
import {Dropdown, InputGroup, Form, DropdownButton, Spinner, Button} from "react-bootstrap";
import TrackList from "../components/TrackList";
import {getRecomendations, getTracks} from "../api/track";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Recomendations = () => {
    const {trackList, user} = useContext(Context)
    const [loading, setLoading] = React.useState(false);
    const [isSended, setIsSended] = React.useState(false)

    const handleRecomendations = () => {
        setLoading(true);
        getRecomendations(user.user.id).then(tracks => {
            console.log(tracks);
            trackList.setTracks(tracks);
            trackList.setIsEquals(false);
            setIsSended(true)
        }).finally(() => {
            setLoading(false);
        })
    }
    return (
        <div className="main">
            <h4>Рекомендации</h4>
            <Button style={{width: '100%', margin: '25px 0'}} onClick={handleRecomendations}>Получить рекомендации</Button>
            {loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px'}}>
                <Spinner animation="border" variant="primary"/>
            </div> : isSended ? <TrackList height='520px'/> : <h4>Получите рекомендации</h4>}
        </div>
    );
};

export default observer(Recomendations);