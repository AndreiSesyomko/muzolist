import React, {useContext, useState} from 'react';
import { Navbar, Container, Button, Offcanvas, Nav } from 'react-bootstrap';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import CreateTrackModal from "./modals/CreateTrackModal";
import UserInfoModal from "./modals/UserInfoModal";

function NavBar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const {user, trackList, audioPlayer} = useContext(Context);
    const navigate = useNavigate();

    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const closeSidebar = () => setShowSidebar(false);

    const handleFavourites = () => {
        navigate('/favorites');
        closeSidebar();
    }

    const handlePosts = () => {
        navigate('/posts');
        closeSidebar();
    }

    const handleReco = () => {
        navigate('/recomendations');
        closeSidebar();
    }

    const tracks = trackList.tracks;

    return (
        <>
            <Navbar bg="white" variant="white" fixed="top" className="px-3">
                <Container fluid className="d-flex align-items-center">

                    {user.isAuth ? <Button variant="outline-light" onClick={toggleSidebar} aria-label="Toggle sidebar">
                        <span className="navbar-toggler-icon"></span>
                    </Button> : <Button style={{color: '#CC25F7'}} variant="outline-light" onClick={() => navigate('/auth')} aria-label="Toggle sidebar">
                        Авторизоваться
                    </Button>}
                    <AudioPlayer tracks={tracks} />
                    <Navbar.Brand style={{color: '#CC25F7', cursor: 'pointer'}} onClick={() => navigate('/')} className="mx-3">
                        Muzolist
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <Offcanvas show={showSidebar} onHide={closeSidebar} backdrop={true} scroll={false} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Меню</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link onClick={() => setShowUserModal(true)}>Профиль</Nav.Link>
                        <Nav.Link onClick={handleFavourites}>Мои треки</Nav.Link>
                        <Nav.Link onClick={handlePosts}>Посты</Nav.Link>
                        <Nav.Link onClick={handleReco}>Рекомендации</Nav.Link>
                        <Nav.Link href="#createTrack" onClick={() => setShowCreateModal(true)}>Добавить свой трек</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
                <CreateTrackModal show={showCreateModal} onHide={() => setShowCreateModal(false)} />
                <UserInfoModal show={showUserModal} onHide={() => setShowUserModal(false)} user={user.user}/>
            </Offcanvas>

            <div style={{ paddingTop: '56px' }}></div>
        </>
    );
}

export default observer(NavBar);
