import React, {
  useState, useRef, useEffect,
} from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Button, Modal } from 'antd';
// import { ReactComponent as CrossSolid } from 'assets/svg/cross-solid.svg';
// import BlueButton from '../BlueButton/Index';
import './imageUploaderStyle.less';

function urltoFile(url, filename, mimeType) {
  return (fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }))
  );
}

const ImageUploaderComponent = (props) => {
  const {
    title,
    onChange,
    allowedSize,
    // setErrorMsg,
    files
  } = props;
  const [imgFile, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const { size } = file;
      // if (size > allowedSize) return setErrorMsg(`The maximum file size allowed is ${allowedSize / 1000}kb`);
      setIsOpen(true);
      // return setErrorMsg(null);
    }
    // return setErrorMsg(null);
    // return onChange(file);
  };

  const fetchCroppedImage = (imgUrl) => {
    urltoFile(imgUrl, imgFile.name, imgFile.type)
      .then((file) => {
        onChange(file);
        handleCancel();
      });
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* <div className="font-16">{title}</div> */}
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          id="fileInput"
          style={{ display: 'none' }}
        />
        <Button
          onClick={() => document.getElementById('fileInput').click()}
        >
          {
            files?.name ? 'Change' : 'Choose File...'
          }
          
        </Button>
      </div>
      <CropperEditor
        isOpen={isOpen}
        imgFile={imgFile}
        handleCancel={handleCancel}
        fetchCroppedImage={fetchCroppedImage}
      />
    </>
  );
};

export default ImageUploaderComponent;

const CropperEditor = ({
  isOpen, imgFile, handleCancel, fetchCroppedImage,
}) => {
  const EditorRef = useRef(null);
  const [scaleValue, setScaleValue] = useState(1);
  const [rotateValue, setRotateValue] = useState(0);

  const showCroppedImage = async () => {
    if (EditorRef.current) {
      const img = EditorRef.current.getImage().toDataURL();
      return img;
    }
    return null;
  };

  useEffect(() => {
    setScaleValue(1);
    setRotateValue(0);
  }, [isOpen]);

  const onSaveHandler = (urlString) => {
    fetchCroppedImage(urlString);
  };
  return (
    <Modal
      visible={isOpen}
      className="image-uploader-modal"
      // onClose={handleCancel}
      onCancel={handleCancel}
      onOk={async () => onSaveHandler(await showCroppedImage())}
    >
      {/* <CrossSolid
        className="cross-icon"
        onClick={handleCancel}
        onKeyDown={() => null}
        role="button"
        tabIndex={0}
      /> */}
      {/* <Modal.Content> */}
        <div>
          <AvatarEditor
            ref={EditorRef}
            image={imgFile && URL.createObjectURL(imgFile)}
            width={250}
            height={250}
            border={[200, 0]}
            color={[0, 0, 0, 0.6]} // RGBA
            scale={scaleValue}
            rotate={rotateValue}
          />
          <div className="mt-30">
            <div className="d-flex align-items-center">
              <span className="mr-13 label">Zoom</span>
              {/*<InputRange
                maxValue={5}
                minValue={1}
                value={scaleValue}
                onChange={(value) => setScaleValue(value)}
    />*/}
            </div>

            <div className="pt-40 pb-15 d-flex align-items-center">
              <span className="mr-13 label">Rotate</span>
              {/*<InputRange
                maxValue={360}
                minValue={0}
                value={rotateValue}
                onChange={(value) => setRotateValue(value)}
  />*/}
            </div>

          </div>

        </div>
      {/* </Modal.Content> */}
      {/* <Modal.Actions> */}
        <Button onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="primary-button" onClick={async () => onSaveHandler(await showCroppedImage())}>
          Crop
        </Button>
      {/* </Modal.Actions> */}
    </Modal>
  );
};
