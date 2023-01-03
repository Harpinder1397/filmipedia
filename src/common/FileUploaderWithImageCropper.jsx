/* eslint-disable*/
import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import './style.less';
import { Spin, notification, message } from 'antd';
import SyncModal from "./SyncModal";
import FileDropZone from "./FileDropZone";
import { checkFieldType } from "./utils";
import PreviewImageComponent from "./PreviewComponents/PreviewImageComponent";
import PreviewComponents from "./PreviewComponents";

// const nameFormatter = (isFileType) => {
//   const validImageTypes = ['gif', 'jpeg', 'png', 'jpg'];
//   const valifFileTypes = ['pdf'];
//   const validVideoTypes = ['mp4'];
//   const validZipTypes = ['zip'];
//   const valiPowerPointTypes = ['ppt', 'pptx', 'odf'];

//   switch (isFileType) {
//     case 54:
//       return valifFileTypes;
//     case 55:
//       return validVideoTypes;
//     case 52:
//       return validZipTypes;
//     case 53:
//       return valiPowerPointTypes;
//     case 51:
//       return validImageTypes;
//   }
// }

export const FileUploaderWithImageCropper = (props) => {
  const [image, setImage] = useState('');
  const [fileData, setFileData] = useState({});
  const [cropData, setCropData] = useState("");
  const [isCrop, setIsCrop] = useState(false);
  const [cropper, setCropper] = useState();
  const [visible, setVisible] = React.useState(false);

  const { fileSrc, isLoading, previewStyle, editMode, mutileFileTpe, isFileType, content} = props;
  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setIsCrop(false)
  };
  

  const checkType = (files) => {
    const file = files[0];
    const fileTypeKey = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
    return checkFieldType(fileTypeKey, validImageTypes)
  }

  const onChange = (acceptedFiles) => {
    // if (content) {
    //   const modifiedFileType = nameFormatter(isFileType);
    //   const fileType = acceptedFiles[0].type.split('/')[1];
    //   if(!checkFieldType(fileType, modifiedFileType)){
    //     console.log('fileType, modifiedFileType', fileType, modifiedFileType)
    //     notification.error({
    //       message: 'Error',
    //     })
    //     return false;
    //   }
    // }
    
    let files;
    if (acceptedFiles) {
      if(acceptedFiles[0].size > 300000) {
        return alert('Please upload pic of size less than 300Kb')
      }
      files = acceptedFiles;
       if(checkType(acceptedFiles)){
          showModal();
       }else{
        const selectedFile = {
          name: files[0].name,
          type: files[0].type.split('/')[1],
          file: files[0],
        }
        if(props.onChangeFile){
          props.onChangeFile(selectedFile)
        }
        return;
       }
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };

    setFileData(files[0])
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      var base64Str = cropper.getCroppedCanvas().toDataURL();
      if(base64Str){
        setIsCrop(true)
        fetch(base64Str)
          .then(res => res.blob())
          .then(resData => {
            const data = {
              name: fileData.name,
              type: fileData.type.split('/')[1],
              file: resData,
            }
            if(props.onChangeFile){
              props.onChangeFile(data)
            }
          })
      }
      setCropData(base64Str);
      setVisible(false);
    }
  };

  const fileUrlInString = isCrop ? cropData : (fileSrc ? fileSrc : cropData);

  return (
    <div>
      {!fileUrlInString || editMode ?
        <div style={{ width: "100%" }}>
          <SyncModal
            isVisible={visible}
            icon={<FileDropZone onChange={onChange} />}
            hideModal={hideModal}
            content={
              <>
                <Cropper
                  style={{ height: 400, width: "100%" }}
                  initialAspectRatio={1}
                  src={image}
                  viewMode={1}
                  guides={true}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                />
              </>
            }
            handleOk={getCropData}
          />
        </div>
      : null}
      {fileUrlInString ?
        <div className="file-preview-container">
          <Spin spinning={isLoading}>
            { mutileFileTpe ? 
            <PreviewComponents url={fileUrlInString} previewStyle={previewStyle} /> 
            : <PreviewImageComponent url={fileUrlInString} previewStyle={previewStyle} />
            }
          </Spin>
        </div>
      : null}
    </div>
  );
};

export default FileUploaderWithImageCropper;
