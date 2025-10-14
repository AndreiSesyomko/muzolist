import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function UserInfoModal({ show, onHide, user }) {
    console.log(user)
    return (

        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Информация о пользователе</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-start">
                    <p><strong style={{ color: '#CC25F7' }}>Имя:</strong> {user?.username}</p>
                    <p><strong style={{ color: '#CC25F7' }}>Email:</strong> {user?.email}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserInfoModal;
