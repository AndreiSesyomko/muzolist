import React, {useContext, useEffect} from 'react';
import {Dropdown, InputGroup, Form, DropdownButton, Spinner} from "react-bootstrap";
import TrackList from "../components/TrackList";
import {getTracks} from "../api/track";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Favourites = () => {
    const {trackList, user} = useContext(Context)
    const [search, setSearch] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [selectedOrdering, setSelectedOrdering] = React.useState(null);
    const [selectedItemDropDown, setSelectedItemDropDown] = React.useState('Сортировать');
    useEffect(() => {
        if (search) {
            setLoading(true);
            getTracks(search, user.user.id, selectedOrdering).then(tracks => {
                trackList.setTracks(tracks);
                trackList.setIsEquals(false);
            }).finally(() => {
                setLoading(false);
            })
        } else {
            setLoading(true);
            getTracks(null, user.user.id, selectedOrdering).then(tracks => {
                trackList.setTracks(tracks);
                trackList.setIsEquals(false);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [search, selectedOrdering])
    return (
        <div className="main">
            <h4>Избранное</h4>
            <InputGroup className="mb-3">
                <Form.Control value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск" aria-label="Text input with dropdown button" />

                <DropdownButton
                    variant="primary"
                    title={selectedItemDropDown}
                    id="input-group-dropdown-2"
                    align="end"
                    onSelect={(e) => {
                        if(e === selectedOrdering) {
                            setSelectedOrdering(null)
                            setSelectedItemDropDown('Сортировать');
                        } else {
                            setSelectedOrdering(e);
                            if(e == 'listens') setSelectedItemDropDown('По прослушиваниям');
                            else setSelectedItemDropDown('По популярности')
                        }

                    }}
                >
                    <Dropdown.Item href="#">По жанру</Dropdown.Item>
                    <Dropdown.Item href="#">По популярности</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
            {loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px'}}>
                <Spinner animation="border" variant="primary"/>
            </div> : <TrackList/>}
        </div>
    );
};

export default observer(Favourites);