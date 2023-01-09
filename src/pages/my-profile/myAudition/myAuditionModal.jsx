import React from "react";
import { Row, Col, Modal } from 'antd';
import FormSelect from '../../../common/inputs/FormSelect';
import { typeFileOptions } from "../../../constant/artistsFeatures";
import VideoUploader from "../../../common/video-uploader";
import FormInput from "../../../common/inputs/FormInput";

const MyAuditionModal = (props) => {
  const {formData, setFormData, isVisibleModal, modalTitle, handleAdd, handleCancel } = props;
  console.log(formData, 'formData');
  return (
    <Modal
      visible={isVisibleModal}
      onOk={handleAdd}
      onCancel={handleCancel}
      title={`${modalTitle} Audition`}
    >
      <Row className='project-add-modal-container'>
        <Col span={24}>
        <FormSelect
        name="type"
        label="Type"
        value={formData?.type}
        onSelect={(id, val) => {
            setFormData({
                type: val?.value
            })
        }}
        options={typeFileOptions}
        required
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      />
        </Col>
        <Col span={24}>
        {formData?.type ? formData?.type == 'Link' ? <FormInput
        type="text"
        // addonBefore={'https://'}
        name={'link'}
        label={'link'}
        value={formData?.link}
        onChange={(e) => {
            setFormData({
                ...formData,
                link: e.target.value
            })
        }}
        // validationError={formDataErrors.experience}
        required
      // disabled
      /> : <VideoUploader /> : ''}
        </Col>
      </Row>
    </Modal>
  )
}

export default MyAuditionModal;