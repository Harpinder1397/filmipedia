/* eslint-disable*/
import React from "react";
import { Modal, Button } from 'antd';

const SyncModal = (props) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      props.handleOk();
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    props.hideModal();
  };


  const { content ,icon ,isVisible} = props;

  return (
    <>
      {icon ? icon :
        <Button type="primary" onClick={handleOk}>
          Open Modal with async logic
        </Button>
      }
      <Modal
        title="Adjust your image"
        visible={isVisible}
        onOk={handleOk}
        okText={"Confirm"}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {content}
      </Modal>
    </>
  );
};

export default SyncModal;