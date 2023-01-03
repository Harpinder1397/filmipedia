import React, { useState } from 'react';
import { Avatar, Image, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

//styles
import './imageCrop.less';

const ImageCrop = ({fileList, setFileList}) => {

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const onChange = (newFileList) => {
    setFileList(newFileList.file.originFileObj)
    // getBase64(newFileList.file.originFileObj, (url) => {
    //   // setLoading(false);
    //   setFileList(url);
    // });
    // setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        className='image-crop-section'
        showUploadList={false}
        onChange={onChange}
        multiple={false}
        onPreview={onPreview}
      >  <Avatar src={<Image src={fileList || "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} preview={false} style={{ width: 100 }} />} />
      </Upload>
    </ImgCrop>
  );
};
export default ImageCrop;