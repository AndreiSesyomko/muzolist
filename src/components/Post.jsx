import {Button, Card, Carousel, Image} from "react-bootstrap";
import Photo from "./Photo";
import {useState} from "react";

const Post = ({post}) => {
    const [isShowContent, setShowContent] = useState(false);

    return (
        <Card style={{width: '75%', margin: '0 auto'}} className="text-center mb-3">
            <Card.Header>{post.title}</Card.Header>
            <Card.Body>
                {post.postmedia_set.length > 0 ? post.postmedia_set.length > 1 ? <Carousel>
                        {post.postmedia_set.map((media) => <Carousel.Item><Photo photoUrl={media.photo}/></Carousel.Item>)}
                </Carousel> : <Photo photoUrl={post.postmedia_set[0].photo}/> : null}
                <Card.Text className='mt-3'>
                    {isShowContent ? post.content : post.content.slice(0, 50) + '...'}
                </Card.Text>
                <Button onClick={() => setShowContent(!isShowContent)}>{isShowContent ? 'Скрыть' : 'Показать полностью'}</Button>
            </Card.Body>
            <Card.Footer className="text-muted">{post.time_create.split('T')[0]}</Card.Footer>
        </Card>
    )
}

export default Post