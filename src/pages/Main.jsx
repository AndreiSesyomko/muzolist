import React, {useContext, useEffect} from 'react';
import {Dropdown, InputGroup, Form, DropdownButton, Spinner} from "react-bootstrap";
import TrackList from "../components/TrackList";
import {getTracks} from "../api/track";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Main = () => {
    const {trackList} = useContext(Context)
    const [search, setSearch] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [selectedOrdering, setSelectedOrdering] = React.useState(null);
    useEffect(() => {
        if (search) {
            setLoading(true);
            getTracks(search, null, selectedOrdering).then(tracks => {
                console.log(tracks);
                trackList.setTracks(tracks);
                trackList.setIsEquals(false);
            }).finally(() => {
                setLoading(false);
            })
        } else {
            setLoading(true);
            getTracks(null, null, selectedOrdering).then(tracks => {
                console.log(tracks);
                trackList.setTracks(tracks);
                trackList.setIsEquals(false);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [search, selectedOrdering]);
    return (
        <div className="main">
            <InputGroup className="mb-3">
                <Form.Control value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск" aria-label="Text input with dropdown button" />

                <DropdownButton
                    variant="primary"
                    title="Сортировать"
                    id="input-group-dropdown-2"
                    align="end"
                    onSelect={(e) => {
                        setSelectedOrdering(e);
                    }}
                >
                    <Dropdown.Item eventKey="listens">По прослушиваниям</Dropdown.Item>
                    <Dropdown.Item eventKey="favorites">По популярности</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
            {loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px'}}>
                <Spinner animation="border" variant="primary"/>
            </div> : <TrackList/>}
        </div>
    );
};

export default observer(Main);