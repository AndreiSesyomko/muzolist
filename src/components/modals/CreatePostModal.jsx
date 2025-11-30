import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createPost} from "../../api/post";

const CreatePostModal = ({show, onHide}) => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [images, setImages] = React.useState([]);
    const [selectedCat, setSelectedCat] = React.useState(null);
    const [isPending, setIsPending] = React.useState(false);
    const {posts} = useContext(Context)

    const addPostMedia = (e) => {
        setImages([...images, e.target.files[0]]);
    }

    const deletePostMedia = (item) => {
        setImages(images.filter((i) => i !== item));
    }

    const addPost = () => {
        if(!isPending) {
            setIsPending(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", description);
            formData.append("cat", selectedCat.id);
            images.forEach(image => formData.append("photos", image));

            createPost(formData).then(data => {
                onHide();
            }).finally(() => {
                setIsPending(false);
            })
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Создать пост</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Категория</Form.Label>
                    <Dropdown style={{ width: "100%" }}>
                        <Dropdown.Toggle style={{ width: "100%" }}>{selectedCat?.name || 'Выберите категорию'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {posts.cats.map(cat => <Dropdown.Item onClick={() => setSelectedCat(cat)}
                                                                     key={cat.id}>{cat.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Label className={"mt-3"}>Заголовок</Form.Label>
                    <Form.Control value={title} onChange={e => setTitle(e.target.value)} placeholder={"Введите заголовок"}
                                  />
                    <Form.Label className={"mt-3"}>Текст</Form.Label>
                    <Form.Control value={description} onChange={e => setDescription(e.target.value)} placeholder={"Введите текст"}
                                  />
                    <hr/>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Выберите фотографии</Form.Label>
                        <Form.Control accept=".png, .gif, .jpeg, .jpg, .svg, .webp" onChange={addPostMedia}
                                      type="file"/>
                    </Form.Group>
                </Form>
                {images.map((item, index) => <Row className={"d-flex justify-content-between mt-2"} key={index}>
                    <Col md={6}>{item.name.length > 15 ? item.name.slice(0, 14) + '...' : item.name}</Col>
                    <Col md={3}><Button className={"postMedia"} onClick={() => deletePostMedia(item)} variant={"outline-danger"}>Удалить</Button></Col>
                </Row>)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={addPost}>
                    Сохранить
                </Button>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default observer(CreatePostModal);