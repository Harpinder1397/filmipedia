/* eslint-disable*/
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './style.less';
import {
  UploadOutlined, LoadingOutlined,
} from '@ant-design/icons';

const FileDropZone = (props) => {
  const { onChange, avatarImage } = props;
  const [loading, setLoading] = useState(false);
  // const [isPic, setIsPic] = useState(false);
  useEffect(() => {
    if (avatarImage) {
      setImage(avatarImage);
    }
  }, [avatarImage]);
  
  const onDrop = useCallback((acceptedFiles) => {
    setLoading(true)
    if (acceptedFiles && acceptedFiles[0]) {
      // setIsPic(true)
        if (onChange) {
            onChange(acceptedFiles);
            setLoading(false)
          }
    }
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="file-Uploader">
            <input {...getInputProps()} />
            {loading ? <LoadingOutlined className="upload-icon" /> : <div><UploadOutlined className="upload-icon" /><span className="icon-label">{"Click To Upload"}</span></div>}
        </div>
    );
};
export default FileDropZone;
