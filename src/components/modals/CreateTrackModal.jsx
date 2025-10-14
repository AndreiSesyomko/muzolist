import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {createTrack, getGenres} from "../../api/track";
import {parseBlob} from "music-metadata-browser";

const CreateTrackModal = ({show, onHide}) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState({});
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [album, setAlbum] = useState('');
    const [cover, setCover] = useState(null);
    const [audio, setAudio] = useState(null);
    const [errors, setErrors] = useState({});
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        getGenres().then((data) => {
            console.log(data);
            setGenres(data);
        })
    }, [])

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Введите имя!";
        if (!audio) newErrors.audio = "Выберите аудио!";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const coverHandler = () => {
        return parseBlob(audio).then(metadata => {
            const picture = metadata.common.picture && metadata.common.picture[0];
            if (picture) {
                const base64 = URL.createObjectURL(new Blob([picture.data], { type: picture.format }));
                console.log(picture);
                setCover(new Blob([picture.data], { type: picture.format }));
                return picture;
            } else {
                console.log("Обложка не найдена");
                return null;
            }
        });
    }

    const addTrack = async () => {
        if(validate()) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('genre_id', selectedGenre.id);
            const picture = await coverHandler()
            console.log(picture)
            if(!checked && picture) {
                formData.append('cover', cover, 'cover_image.' + picture?.format?.split('/')[1]);
            } else {
                if(cover) {
                    formData.append('cover', cover);
                }
            }
            formData.append('audio', audio);
            createTrack(formData, author, album).then((data) => {
                console.log(data);
                onHide();
                setSelectedGenre({});
            })
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Создать трек</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label className={"mt-3"}>Название</Form.Label>
                        <Form.Control value={name} isInvalid={errors.name} onChange={e => setName(e.target.value)} placeholder={"Введите название"}
                                      className={"mt-2"}/>
                        <Form.Control.Feedback type="invalid">{errors?.name}</Form.Control.Feedback>
                    </Form.Group>
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
                    <Form.Group>
                        <Form.Label className={"mt-2"}>Выберите обложку</Form.Label>
                        <Form.Check type="checkbox"
                                    checked={checked}
                                    id="confirm-checkbox"
                                    label="Использовать свою обложку"
                                    onChange={e => setChecked(e.target.checked)}/>
                        <Form.Control disabled={!checked} isInvalid={errors.audio} accept=".png, .gif, .jpeg, .jpg, .svg, .webp" onChange={(e) => setCover(e.target.files[0])}
                                      type={"file"}/>
                        <Form.Control.Feedback type="invalid">{errors?.audio}</Form.Control.Feedback>
                    </Form.Group>
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