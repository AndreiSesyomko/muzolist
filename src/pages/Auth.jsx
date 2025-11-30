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
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const switchMode = () => {
        setIsRegister(!isRegister);
        setEmail('');
        setPassword('');
        setUsername('');
        setErrors({});
    };

    const validateEmail = () => {
        return /^\S+@\S+\.\S+$/.test(email);
    };

    const validate = () => {
        const newErrors = {};
        if (isRegister && !(username.trim().length > 2 && username.trim().length < 26)) newErrors.name = "Username должно быть не менее 3 символов и не более 25";
        if (!(password.trim().length > 5 && password.trim().length < 31)) newErrors.password = "Пароль должно быть не менее 6 символов и не более 30";
        if (!validateEmail()) newErrors.email = "Некорректный email";

        setErrors(newErrors);
        console.log(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        console.log('a')
        if(validate()) {
            console.log('b')
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
                    if(data) {
                        user.setUser(data)
                        user.setIsAuth(true)
                        console.log(data, 'here is data')
                        navigate('/')
                    } else {
                        setError('Неверный email или пароль');
                    }
                }).catch(error => {
                    if (error.response && error.response.status === 401) {
                        setError('Неверный email или пароль');
                    }
                });
            }
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
                        <Form.Control isInvalid={errors.email} value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Введите email" style={{ borderColor: '#a676cd', borderRadius: '20px' }} />
                        <Form.Control.Feedback type="invalid">{errors?.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#a676cd' }}>Пароль</Form.Label>
                        <Form.Control isInvalid={errors.password} value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Введите пароль" style={{ borderColor: '#a676cd', borderRadius: '20px' }} />
                        <Form.Control.Feedback type="invalid">{errors?.password}</Form.Control.Feedback>
                    </Form.Group>

                    {isRegister && (
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#a676cd' }}>Username</Form.Label>
                            <Form.Control isInvalid={errors.name} value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Введите username" style={{ borderColor: '#a676cd', borderRadius: '20px' }} />
                            <Form.Control.Feedback type="invalid">{errors?.name}</Form.Control.Feedback>
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