import {Button, DropdownButton, InputGroup, Form, Dropdown, Spinner, ListGroup} from "react-bootstrap"
import React, {useContext, useEffect} from "react";
import {getCats, getPosts} from "../api/post";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import CreatePostModal from "../components/modals/CreatePostModal";
import Post from "../components/Post";

const Posts = () => {

    const {posts} = useContext(Context)
    const [search, setSearch] = React.useState('');
    const [selectedCat, setSelectedCat] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false);

    useEffect(() => {
        getCats().then(data => {
            if(data) {
                posts.setCats(data);
            }
        }).finally(() => {
            getPosts().then(data => {
                console.log(data);
                if(data) {
                    posts.setPosts(data);
                    console.log(posts.posts);
                }
            }).then(() => {
                setLoading(false);
            })
        })
    }, []);

    useEffect(() => {
        getPosts(search, selectedCat).then(data => {
            if(data) {
                posts.setPosts(data);
            }
        })
    }, [search, selectedCat]);

    return (
        <div className="main">
            <h4>Посты</h4>
            <Button className="mt-3" style={{width: '100%'}} onClick={() => {
                setShowModal(true);
                console.log(showModal)
            }}>Создать пост</Button>
            <InputGroup className="mt-3">
                <Form.Control value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск" aria-label="Text input with dropdown button" />
            </InputGroup>
            {loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px'}}>
                <Spinner animation="border" variant="primary"/>
            </div> : <>
                {posts.cats ? <div>
                    <h5 className="mt-3">Категории</h5>
                    <ListGroup horizontal className="mt-2">
                        {posts.cats.map((cat) => <ListGroup.Item key={cat.id} action onClick={() => {
                            setSelectedCat(cat.id);
                        }}>{cat.name}</ListGroup.Item>)}
                    </ListGroup>
                </div> : null}
                {posts.posts ? <div className="mt-3 custom-scrollbar" style={{ maxHeight: '390px', overflowY: "auto" }}>
                    {posts.posts.map(item => <Post post={item}/>)}
                </div> : <h5 className="mt-3" style={{textAlign: 'center'}}>Посты не найдены :(</h5>}
            </>}
            <CreatePostModal show={showModal} onHide={() => setShowModal(false)} />
        </div>
    )
}

export default observer(Posts)