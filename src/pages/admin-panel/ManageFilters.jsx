import React, { useEffect, useState } from "react";
import TableComponent from "../../common/TableComponent";
import { Button, Form, Input, Modal, Typography, Spin } from "antd";
import './admin.less';
import FormSelect from "../../common/inputs/FormSelect";
import { createStateApi, deleteStateApi, updateStatesApi } from "../../api/getStates";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PopConfirm from "../../common/pop-confirm";
import { useCreateFilterMutation, useFiltersQuery, useUpdateFilterMutation, useDeleteFilterMutation, UpdateFilterMutation } from "../../api/getAdminFilters";

const { Title } = Typography;

const ManageFilters = ({states }) => {
 
  const [formData, setFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isEditModal, setIsEditModal] = useState('add');
  const { data } = useFiltersQuery();
  const { mutate: fetchFilterMutation, isLoading: isLoading2 } = useUpdateFilterMutation();
  const { mutate: deleteFilterMutation, isLoading : isLoading3 } = useDeleteFilterMutation();
  const { mutate: updateFilterMutation, isLoading : isLoading4 } = UpdateFilterMutation();
  const { mutate: createFilterMutation, isLoading } = useCreateFilterMutation();
    // console.log(error, error?.message, 'errorerrorerror')
  // States Table Columns
  const stateCol = [
    {
      title: 'Name',
      key: 'value',
      dataIndex: 'value',
    },
    {
      title: 'Key',
      key: 'key',
      dataIndex: 'key',
    },
    {
      title: 'action',
      key: 'action',
      dataIndex: 'action',
      render: (text, row) => 
      <>
        <EditOutlined
          onClick={() => {
            setIsEditModal('edit');
            setIsVisible(true);
            setFormData(row);
        }}/>
        <PopConfirm
          title='Are you sure?'
          onConfirm={ async() => {
            const res = await deleteFilterMutation(row._id);
            if(res){
              createFilterMutation();
            }
          }}
          body={
            <DeleteOutlined className="state-delete-btn" />
          }
        />
            
        
      </>
      
    }
  ]

//   const getUniqueListBy = (arr, key) => {
//     return [...new Map(arr?.map(item => [item[key], item])).values()]
//   }

//   const stateList = getUniqueListBy(data, 'state').sort((a, b) => a.state.localeCompare(b.state)).map(data =>(
//     {...data, 'value': data.state }
//   ));

  const handleSave = async () => {
    // AllStates edit state
    if(isEditModal == 'edit'){
        updateFilterMutation(formData)
     
        setFormData({});
        setIsVisible(false);
        setIsEditModal('add');
        return
    }

    // AllStates add state
    if(isEditModal == 'add') {
        if(!formData.value){
            alert("Please Fill Required Name")
            return 
        }
        createFilterMutation(formData);
      
    //   if(res){
        setIsVisible(false);
        setFormData({});
    //   }
    };
  }

  useEffect(() => {
    // const payload = searchQuery.name ? searchQuery :  {'state' : searchQuery.state }
    // if(searchQuery?.name || searchQuery?.state){
    //   if(searchQuery?.name){
    //     const timeOutId = setTimeout(async() => {
    //       createFilterMutation(payload)
    //     }, 1000);
    //     return () => clearTimeout(timeOutId);
    //   }else {
    //     createFilterMutation(payload);
    //   }
    // }else {
    //   createFilterMutation();
    // }
    fetchFilterMutation()
  }, []);

  const handleCancel = () => {
    setIsVisible(false);
    setFormData({});
    setIsEditModal('add');
  }

  return (
    <Spin spinning={isLoading || isLoading2 || isLoading3 || isLoading4}>
    <div className="all-states">
      <div className="">
        <Title level={3}>Manage Filters</Title>
        <div className="all-states-header-button">
          <Button onClick={() => { setIsVisible(!isVisible);  setIsEditModal('add'); }}>Add</Button>
          {/* <div className="filter-sub-buttons">
            <FormSelect
              className="state-search-input"
              name="state"
              allowClear={true}
              placeholder="Select State"
              value={searchQuery?.state}
              onSelect={(cat, val) => {
                setSearchQuery({...searchQuery, state: val.value})
              }}
              onClear={() => setSearchQuery({})}
              options={stateList}
              showSearch
              required
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
              // validationError={formDataErrors.states}
              width={"100%"}
            /> 
            <Input
              name='name'
              allowClear={true}
              placeholder="Search City"
              className="key-search-input"
              value={searchQuery?.name}
              onChange={(e) => setSearchQuery({...searchQuery, name: e.target.value})}
            />
          </div>*/}
            </div>
        
      </div>
      
      <TableComponent
        columns={stateCol}
        data={data}
      />

      <AddCatContentModal
        // allState={stateList}
        isVisible={isVisible}
        handleSave={handleSave}
        handleCancel={handleCancel}
        setFormData={setFormData}
        formData={formData}
        // field={title}
        title={isEditModal == 'edit' ? `Edit ${"Filter"}` : `Add ${'Filter'}`}
      />
    </div>
    </Spin>
  )
}

export default ManageFilters;

export const AddCatContentModal = (props) => {

  const {
    allState,
    isVisible,
    handleSave,
    handleCancel,
    setFormData,
    formData,
    field,
    title
  } = props;


  return (
    <Modal
      visible={isVisible}
      onOk={handleSave}
      onCancel={handleCancel}
      title={title}
    >
      <Form.Item label='Name' className="city-input">
        <Input
          name='value'
          value={formData?.value}
          onChange={(e) => setFormData({...formData, value: e.target.value})}
        />
      </Form.Item>
    </Modal>
  )
}