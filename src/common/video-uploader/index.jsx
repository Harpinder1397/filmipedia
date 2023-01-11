import React from 'react';
import { Button } from 'antd';
import './styles.less';

const VideoUploader = ({handleFileUpload, file}) => {
 
  return (
    <div className='video-upload-container'>
    <input
      type="file"
      accept="video/*"
      onChange={handleFileUpload}
      id="fileInput"
      style={{ display: 'none' }}
    />
  
    <Button
      onClick={() => document.getElementById('fileInput').click()}
    >
      {
        file?.name ? 'Change' : 'Choose File...'
      }
      
    </Button>
    {file?.name && <span className='file-name-style'>{file?.name}</span>}
  </div> 
  );
};
export default VideoUploader;