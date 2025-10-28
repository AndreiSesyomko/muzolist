import {Button, Card, Carousel, Image} from "react-bootstrap";

const Post = ({post}) => {


    return (
        <Card style={{width: '75%', margin: '0 auto', height: '380px'}} className="text-center mb-3">
            <Card.Header>{post.title}</Card.Header>
            <Card.Body>
                <Card.Text>
                    {post.content}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">{post.time_create.split('T')[0]}</Card.Footer>
        </Card>
    )
}

export default Post