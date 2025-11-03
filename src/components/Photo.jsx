import React from 'react';
import { Image } from 'react-bootstrap';

const Photo = ({ photoUrl, onClick=null }) => {
    return (
        <div onClick={onClick} style={{
            position: 'relative',
            width: '100%',
            height: '200px',
            overflow: 'hidden',
        }}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${photoUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(15px)',
                    transform: 'scale(1.1)',
                    zIndex: 1,
                }}
            />
            <Image
                src={photoUrl}
                alt="photo"
                style={{
                    position: 'relative',
                    zIndex: 2,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                }}
            />
        </div>
    );
};

export default Photo;