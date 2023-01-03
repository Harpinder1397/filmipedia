/* eslint-disable*/
import React from 'react';
import './style.css';

const PreviewVideoComponent = (props) => {
    const { url, className } =  props;

    return (
        <div className={"video-preview " + className}>
            <video controls>
                <source src={url} type="video/mp4" />
            </video>
        </div>
    )
}

export default PreviewVideoComponent;