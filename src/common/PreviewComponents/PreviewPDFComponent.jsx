/* eslint-disable*/
import React from 'react';
import './style.css';

const PreviewPDFComponent = (props) => {
    const { url, className } = props;
    
    if (!url) {
        return null;
    }
    return (
        <div className={"pdf-viewer " + className}>
            <iframe
                src={`https://docs.google.com/gview?url=${url}&embedded=true`}
                style={{ width: 600, height: 500 }}
                frameborder={0}
            >
            </iframe>
        </div>
    )
}

export default PreviewPDFComponent;