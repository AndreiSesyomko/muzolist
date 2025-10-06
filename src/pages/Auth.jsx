import React, {useContext, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {loginAPI, registrationAPI} from "../api/user";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";

const Auth = () => {
    const {user} = useContext(Context);
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const switchMode = () => {
        setIsRegister(!isRegister);
        setEmail('');
        setPassword('');
        setUsername('');
        setError(null);
    };

    const validateEmail = (email) => {
        return /^\S+@\S+\.\S+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !validateEmail(email)) {
            setError('Пожалуйста, введите корректный Email.');
            return;
        }
        if (!password) {
            setError('Пожалуйста, введите пароль.');
            return;
        }
        if (isRegister && !username) {
            setError('Пожалуйста, введите имя пользователя.');
            return;
        }
        setError(null);
        if(isRegister) {
            registrationAPI(email, username, password).then(data => {
                user.setUser(data)
                user.setIsAuth(true)
                navigate('/')
            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    setError('Неверный email или пароль');
                }
            });
        } else {
            loginAPI(email, password).then(data => {
                user.setUser(data)
                user.setIsAuth(true)
                console.log(data)
                navigate('/')
            }).catch(error => {
                if (error.response && error.response.status === 401) {
                    setError('Неверный email или пароль');
                }
            });
        }
    };
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '80vh', margin: 'auto' }}
        >
            <Card
                style={{
                    width: '400px',
                    borderRadius: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    padding: '20px',
                    position: 'relative'
                }}
            >
                <h3 className="text-center mb-4" style={{ color: '#a676cd' }}>
                    {isRegister ? 'Регистрация' : 'Авторизация'}
                </h3>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#a676cd' }}>Email</Form.Label>
                        <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Введите email" style={{ borderColor: '#a676cd', borderRadius: '20px' }} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#a676cd' }}>Пароль</Form.Label>
                        <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Введите пароль" style={{ borderColor: '#a676cd', borderRadius: '20px' }} />
                    </Form.Group>

                    {isRegister && (
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#a676cd' }}>Username</Form.Label>
                            <Form.Control value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Введите username" style={{ borderColor: '#a676cd', borderRadius: '20px' }} />
                        </Form.Group>
                    )}

                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        className="w-100 mt-3"
                        style={{
                            background: 'linear-gradient(135deg, #a676cd, #c374be)',
                            border: 'none',
                            borderRadius: '20px',
                            color: 'white'
                        }}
                    >
                        {isRegister ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                </Form>

                <Row className="mt-3">
                    <Col className="text-center" style={{ fontSize: '14px', color: '#a676cd', cursor: 'pointer' }} onClick={switchMode}>
                        {isRegister ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '} <span onClick={switchMode} style={{textDecoration: 'underline'}}>{isRegister ? 'Войти! ' : 'Зарегистрироваться! '}</span>
                    </Col>
                </Row>
                {error && (
                    <Alert
                        variant="danger"
                        onClose={() => setError(null)}
                        dismissible
                        style={{
                            position: 'absolute',
                            top: '500px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '90%',
                            zIndex: 1050,
                        }}
                    >
                        {error}
                    </Alert>
                )}
            </Card>
        </Container>
    );
};

export default observer(Auth);