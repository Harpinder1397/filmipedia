import React, { useEffect, useState } from "react";
import TableComponent from "../../common/TableComponent";
import { Switch, Typography, Spin, Button } from "antd";
import './admin.less';
import { updateUserApi, useUpdateUserNameMutation, useUserQuery } from "../../api/user";
import CommonPagination from "../../common/pagination/CommonPagination";
import { Link, useHistory } from "react-router-dom";

const { Title } = Typography;

const ManageUsers = ({states }) => {
  const [isloading, setIsloading] = useState(false);
  // const userType  = localStorage.getItem("userType");

  const { data: userList } = useUserQuery();
  const {mutate: fetchserNameMutation, isLoading} = useUpdateUserNameMutation()
  const history = useHistory();

  const onShowSizeChange = (page, limit) => {
    const payload = {
      page: page,
      limit: limit
    };
    Object.keys(payload).forEach(key => {
      if(!payload[key])
        delete payload[key]
    });
    fetchserNameMutation(payload);
  }

  const handleOnChange = async (checked, row, name) => {
    setIsloading(true);
    if(name == 'available') {
      const payload = {...row, [name]: checked ? 'Available' : "Not Available"}
      await updateUserApi(row?._id, payload).then(() => {
        setIsloading(false);
      })
    }else {
      const payload = {...row, [name]: checked}
      await updateUserApi(row?._id, payload).then(() => {
        setIsloading(false);
      })
    }
   
    setIsloading(false);
    fetchserNameMutation();

  };

  // Users Table Columns
  const userCol = [
    {
        title: 'Full Name',
        key: 'fullName',
        dataIndex: 'fullName',
        render: (text, row) => <Link to={`/user/profile/${row?._id}`}>{row?.fullName}</Link>
    },
    {
      title: 'Sub Category',
      key: 'subcategory',
      dataIndex: 'subcategory',
      render: (text, row) => row?.subCategory || '-'
      
    },
    {
        title: 'Mobile Number / Username',
        key: 'mobileNumber',
        dataIndex: 'mobileNumber',
        render: (text, row) => row?.mobileNumber || '-'
        
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      render: (text, row) => row?.email || '-'
      
  },
    {
      title: 'Available Status',
      key: 'available',
      dataIndex: 'available',
      render: (text, row) => 
      <Switch checked={row?.available == 'Available' ? true : false} onChange={(e) => handleOnChange(e,row, 'available')} />
    },
    {
      title: 'Verification',
      key: 'verification',
      dataIndex: 'verification',
      render: (text, row) =>
      <Switch checked={row?.verified} onChange={(e) => handleOnChange(e,row, 'verified')} />
    }
  ]

  useEffect(() => {
    // const payload = searchQuery.name ? searchQuery :  {'state' : searchQuery.state }
    // if(searchQuery?.name || searchQuery?.state){
    //   if(searchQuery?.name){
    //     const timeOutId = setTimeout(async() => {
    //       fetchStatesMutation(payload)
    //     }, 1000);
    //     return () => clearTimeout(timeOutId);
    //   }else {
    //     fetchStatesMutation(payload);
    //   }
    // }else {
    //   fetchStatesMutation();
    // }
    const payload = {
      page: 1,
      limit: 10
    };
    Object.keys(payload).forEach(key => {
      if(!payload[key])
        delete payload[key]
    });
    fetchserNameMutation(payload);
  }, []);

  return (
    <Spin spinning={isLoading || isloading}>
    <div className="all-states">
    <Title level={3}>Users</Title>
    <Button onClick={() => history.push('/user/create/profile')}>Add</Button>
      <TableComponent
        columns={userCol}
        data={userList?.users || []}
        paginationProp={false}
        // onChange={hanlePaginationChange}
        // onChange={hanlePaginationChange}
      />
      <div className="pagination-section">
        <CommonPagination pageSize={10} tablePagination={true} total={userList?.total} onShowSizeChange={onShowSizeChange}/>
       </div>
    </div>
    </Spin>
  )
}

export default ManageUsers;