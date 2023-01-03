/* eslint-disable*/
import { checkFieldType } from '../../common/utils';
import React from 'react';
import { Spin } from 'antd';
import './style.css';
import PreviewImageComponent from './PreviewImageComponent';
import PreviewPDFComponent from './PreviewPDFComponent';
import PreviewVideoComponent from './PreviewVideoComponent';

const PreviewComponents = (props) => {

    const { fileUrl ,previewStyle, isLoading } = props;


    const checkFileType = (type) => {
        const fileTypeKey = type.split('.');
        const typeString = fileTypeKey[fileTypeKey.length - 1]
        const validImageTypes = ['pdf'];
        return checkFieldType(typeString, validImageTypes)
      }
    
      const checkVideoType = (type) => {
        const fileTypeKey = type.split('.');
        const typeString = fileTypeKey[fileTypeKey.length - 1]
        const validImageTypes = ['mp4'];
        return checkFieldType(typeString, validImageTypes)
      }
    
      const checkImageType = (type) => {
        const fileTypeKey = type.split('.');
        const typeString = fileTypeKey[fileTypeKey.length - 1]
        const validImageTypes = ['gif', 'jpeg', 'png', 'jpg'];
        return checkFieldType(typeString, validImageTypes)
      }
    
      const renderFileData = (filelink) => {
        if(checkImageType(filelink)){
          return <PreviewImageComponent url={filelink} previewStyle={previewStyle}/>
        }else if(checkVideoType(filelink)){
          return <PreviewVideoComponent url={filelink}/>;
        } else if(checkFileType(filelink)){
          return <PreviewPDFComponent url={filelink}/>;
        }
      }

    return (
      <>
       {renderFileData(fileUrl)}
       </>
    )
}

export default PreviewComponents;