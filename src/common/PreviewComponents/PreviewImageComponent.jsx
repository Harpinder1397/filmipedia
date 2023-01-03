/* eslint-disable*/
import React from 'react';
import './style.css';

const PreviewImageComponent = (props) => {
    const {url, previewStyle, className} = props;

    return (
        <div
            className={"image-preview " + className}
            style={previewStyle}
        >
            <img style={{ width: "100%" }} src={url} alt="cropped" />
        </div>
    )
}

export default PreviewImageComponent;