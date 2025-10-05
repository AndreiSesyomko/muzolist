import React from 'react';
import {Dropdown, InputGroup, Form, DropdownButton} from "react-bootstrap";
import TrackList from "../components/TrackList";

const Main = () => {
    const [search, setSearch] = React.useState('');
    return (
        <div className="main">
            <InputGroup className="mb-3">
                <Form.Control value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск" aria-label="Text input with dropdown button" />

                <DropdownButton
                    variant="primary"
                    title="Сортировать"
                    id="input-group-dropdown-2"
                    align="end"
                >
                    <Dropdown.Item href="#">По жанру</Dropdown.Item>
                    <Dropdown.Item href="#">По популярности</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
            <TrackList/>
        </div>
    );
};

export default Main;