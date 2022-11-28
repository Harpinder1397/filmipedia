import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getCategoryApi, useGetCategoryApiQuery , useFetchCategoryApiQuery} from '../../api/getCategories';
// import { getStatesApi } from '../../api/getStates';
import React, {useEffect, useState} from 'react';
import './admin.less';
import AdminSideBar from './AdminSideBar';
import AllCategories from './AllCategories';
import AllStates from './AllStates';
import { useUpdateStateMutation } from '../../api/getStatesQuery';
import { Spin } from 'antd';

const tabs = [
  {
    title: 'Manage States',
    Component: 'state',
  },
  {
    title: 'Manage Categories',
    Component: 'categories',
  }
]

const categoryCol = [
  {
    title: 'Category',
    key: 'value',
    dataIndex: 'value',
  },
  {
    title: 'Sub category',
    key: 'children',
    dataIndex: 'children',
    render: (text, row) => 'sub categories'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (text, row) => 'tags'
  },
  {
    title: 'action',
    key: 'action',
    dataIndex: 'action',
    render: (text, row) => 
    <>
      <EditOutlined />
      <DeleteOutlined />
    </>
    
  }
]

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  
  
  // const { data } = useGetCategoryApiQuery();
  // const { mutate: fetchCategoryApi, isLoading } = useFetchCategoryApiQuery();
  
// console.log(data, 'data')
  const getCategories = async() => {
    // const data = await getCategoryApi();
    setCategories([]);
    // fetchCategoryApi()
  }

  // const getStates = async() => {
  //   const data = await getStatesApi();
  //   setStates(data);
  // }
 

  useEffect(() => {
    // getStates();
    getCategories();
    // getMovies();
    // getAllUsersApi();
  }, []);

  const renderComponent = () => {
    switch (activeTab) {
      case 0:
        return <AllStates states={states} />
      case 1: 
        return <AllCategories/>
      default:
        return <AllStates states={states} />
    }
  }

  return (
    <Spin spinning={false}>
    <div className="admin-panel">
      <div className="side-bar">
        <AdminSideBar tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>
      <div className="content-area">
        {renderComponent()}
      </div>
    </div>
    </Spin>
  );
};

export default AdminPanel;
