import React, { useEffect, useState } from "react";
import TableComponent from "../../common/TableComponent";
import { Button, Form, Input, Modal, Typography, Spin } from "antd";
import './admin.less';
import FormSelect from "../../common/inputs/FormSelect";
import { createStateApi, deleteStateApi, updateStatesApi } from "../../api/getStates";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PopConfirm from "../../common/pop-confirm";
import { useStateQuery, useUpdateStateMutation } from "../../api/getStatesQuery";

const { Title } = Typography;

const AllStates = ({states }) => {
 
  const [formData, setFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isEditModal, setIsEditModal] = useState('add');

  const { data } = useStateQuery();
  const { mutate: fetchStatesMutation, isLoading } = useUpdateStateMutation();


  // States Table Columns
  const stateCol = [
    {
      title: 'State',
      key: 'state',
      dataIndex: 'state',
    },
    {
      title: 'City',
      key: 'city',
      dataIndex: 'name',
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
            const res = await deleteStateApi(row._id);
            if(res){
              fetchStatesMutation();
            }
          }}
          body={
            <DeleteOutlined className="state-delete-btn" />
          }
        />
            
        
      </>
      
    }
  ]

  const getUniqueListBy = (arr, key) => {
    return [...new Map(arr?.map(item => [item[key], item])).values()]
  }

  const stateList = getUniqueListBy(data, 'state').sort((a, b) => a.state.localeCompare(b.state)).map(data =>(
    {...data, 'value': data.state }
  ));

  const handleSave = async () => {
    // AllStates edit state
    if(isEditModal == 'edit'){
      const res = await updateStatesApi(formData._id, formData);
      if(res){
        setFormData({});
        setIsVisible(false);
        setIsEditModal('add');
        fetchStatesMutation();
      }
    }

    // AllStates add state
    if(isEditModal == 'add') {
      const payload = formData 
      const res = await createStateApi(payload);
      if(res){
        setIsVisible(false);
        setFormData({});
        fetchStatesMutation();
      }
    };
  }

  useEffect(() => {
    const payload = searchQuery.name ? searchQuery :  {'state' : searchQuery.state }
    if(searchQuery?.name || searchQuery?.state){
      if(searchQuery?.name){
        const timeOutId = setTimeout(async() => {
          fetchStatesMutation(payload)
        }, 1000);
        return () => clearTimeout(timeOutId);
      }else {
        fetchStatesMutation(payload);
      }
    }else {
      fetchStatesMutation();
    }
  }, [searchQuery]);

  const handleCancel = () => {
    setIsVisible(false);
    setFormData({});
    setIsEditModal('add');
  }

  return (
    <Spin spinning={isLoading}>
    <div className="all-states">
      <div className="">
        <Title level={3}>States</Title>
        <div className="all-states-header-button">
          <Button onClick={() => { setIsVisible(!isVisible);  setIsEditModal('add'); }}>Add</Button>
          <div className="filter-sub-buttons">
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
              className="city-search-input"
              value={searchQuery?.name}
              onChange={(e) => setSearchQuery({...searchQuery, name: e.target.value})}
            />
          </div>
        </div>
        
      </div>
      
      <TableComponent
        columns={stateCol}
        data={data?.sort((a, b) => a.state.localeCompare(b.state))}
      />

      <AddCatContentModal
        allState={stateList}
        isVisible={isVisible}
        handleSave={handleSave}
        handleCancel={handleCancel}
        setFormData={setFormData}
        formData={formData}
        // field={title}
        title={isEditModal == 'edit' ? `Edit ${"State"}` : `Add ${'State'}`}
      />
    </div>
    </Spin>
  )
}

export default AllStates;

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
      <Form.Item label='State' className="state-input">
        <FormSelect
            name="state"
            value={formData?.state}
            onSelect={(cat, val) => {
              setFormData({...formData, state: val.value})
            }}
            options={allState}
            showSearch
            required
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
            // validationError={formDataErrors.states}
            width={"100%"}
          /> 
      </Form.Item>
      <Form.Item label='City' className="city-input">
        <Input
          name='name'
          value={formData?.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </Form.Item>
    </Modal>
  )
}