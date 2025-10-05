import React, {useContext, useState} from 'react';
import { Navbar, Container, Button, Offcanvas, Nav } from 'react-bootstrap';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import AudioPlayer from "./AudioPlayer";

function NavBar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const {user, trackList} = useContext(Context);
    const navigate = useNavigate();

    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const closeSidebar = () => setShowSidebar(false);

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
                        <Nav.Link href="#link1" onClick={closeSidebar}>Профиль</Nav.Link>
                        <Nav.Link href="#link2" onClick={closeSidebar}>Мои треки</Nav.Link>
                        <Nav.Link href="#link3" onClick={closeSidebar}>Посты</Nav.Link>
                        <Nav.Link href="#link4" onClick={closeSidebar}>Рекомендации</Nav.Link>
                        <Nav.Link href="#link5" onClick={closeSidebar}>Добавить свой трек</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            <div style={{ paddingTop: '56px' }}></div>
        </>
    );
}

export default observer(NavBar);
