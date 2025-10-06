import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {createTrack, getGenres} from "../../api/track";

const CreateTrackModal = ({show, onHide}) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState({});
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [album, setAlbum] = useState('');
    const [cover, setCover] = useState(null);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        getGenres().then((data) => {
            console.log(data);
            setGenres(data);
        })
    }, [])

    const addTrack = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('genre', selectedGenre.id);
        formData.append('cover', cover);
        formData.append('audio', audio);
        createTrack(formData, author, album).then((data) => {
            console.log(data);
            onHide();
            setSelectedGenre({});
        })

    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Создать трек</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label className={"mt-3"}>Название</Form.Label>
                    <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder={"Введите название"}
                                  className={"mt-2"}/>
                    <Form.Label className={"mt-3"}>Жанр</Form.Label>
                    <Dropdown className={'mt-2'}>
                        <Dropdown.Toggle>{selectedGenre.name || 'Выберите жанр'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {genres.map((genre, index) => <Dropdown.Item onClick={() => setSelectedGenre(genre)}
                                                                         key={index}>{genre.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Label className={"mt-3"}>Автор</Form.Label>
                    <Form.Control value={author} onChange={e => setAuthor(e.target.value)} placeholder={"Введите автора"}
                                  className={"mt-2"}/>
                    <Form.Label className={"mt-3"}>Альбом</Form.Label>
                    <Form.Control value={album} onChange={e => setAlbum(e.target.value)} placeholder={"Введите альбом"}
                                  className={"mt-2"}/>
                    <Form.Label className={"mt-2"}>Выберите обложку</Form.Label>
                    <Form.Control accept=".png, .gif, .jpeg, .jpg, .svg, .webp" onChange={(e) => setCover(e.target.files[0])}
                                  type={"file"}/>
                    <Form.Label className={"mt-2"}>Выберите аудио</Form.Label>
                    <Form.Control accept=".mp3, .wav, .aiff, .aac, .mp4, .wma, .ogg, .opus" onChange={(e) => setAudio(e.target.files[0])}
                                  type={"file"}/>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="primary" onClick={addTrack}>
                    Отправить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTrackModal;