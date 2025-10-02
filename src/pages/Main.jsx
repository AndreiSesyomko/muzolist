import React from 'react';
import {Dropdown, InputGroup, Form, DropdownButton} from "react-bootstrap";

const Main = () => {
    return (
        <div className="main">
            <InputGroup className="mb-3">
                <Form.Control placeholder="Поиск" aria-label="Text input with dropdown button" />

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
        </div>
    );
};

export default Main;