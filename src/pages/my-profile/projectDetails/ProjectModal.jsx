import React from "react";
import { Row, Col, Modal } from 'antd';
import FormInput from '../../../common/inputs/FormInput';
import FormSelect from '../../../common/inputs/FormSelect';

const ProjectModal = (props) => {
  const {categories, subCategoriesList, setSubCategoriesList, isVisibleModal, modalTitle, createProject, setCreateProject, handleAddProjectFun, handleCancel, onChangeProjectFun } = props;
  return (
    <Modal
      visible={isVisibleModal}
      onOk={handleAddProjectFun}
      onCancel={handleCancel}
      title={`${modalTitle} Project`}
    >
      <Row className='project-add-modal-container'>
        <Col span={24}>
          <FormInput
            type="text"
            name={'projectName'}
            label={'Project Name'}
            placeholder={'Pleae Fill Name'}
            value={createProject.projectName}
            onChange={onChangeProjectFun}
            // validationError={formDataErrors.experience}
            required
          // disabled
          />
        </Col>
        <Col span={24}>
          <FormSelect
            allowClear={true}
            showSearch
            required
            label={'Category'}
            name={'category'}
            placeholder="Please select"
            className="navbar__tag-selector"
            onSelect={(id, val) => {
              const getSubCategories = categories.filter((item) => item._id === val.id)
              setSubCategoriesList(getSubCategories[0].childern);
              onChangeProjectFun(val, 'category')
              setCreateProject({...createProject, category: val.value, subCategory: null});
            }}
            // onClear={() => setFormData({...formData, subCategory: null})}
            options={categories}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            value={createProject?.category}
          />
        </Col>
        <Col span={24}>
          <FormSelect
            allowClear={true}
            showSearch
            required
            name={'subCategory'}
            placeholder="Please select"
            className="navbar__tag-selector"
            label={'Sub Category'}
            onSelect={(id, val) => onChangeProjectFun(val, 'subCategory')}
            options={subCategoriesList}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            // width={'50%'}
            value={createProject?.subCategory}
          />
        </Col>
        <Col span={24}>
          <FormInput
            type="text"
            // addonBefore={'https://'}
            name={'links'}
            label={'Add Suitable link'}
            value={createProject?.links}
            onChange={onChangeProjectFun}
            // validationError={formDataErrors.experience}
            required
          // disabled
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default ProjectModal;