import React, { useState } from 'react';
import {
  AppstoreOutlined,
  CloseOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import FormSelect from '../../common/inputs/FormSelect';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}



const userMenu = [
  getItem('Timeline', '/timeline'),
  getItem('Jobs', '/jobs'),
  getItem('Applications', '/job/applications'),
  getItem('Database', '/database'),
  getItem('My Info', '/my-profile'),
  getItem('Shortlisted', '/shortlisted'),
  getItem('Sign Out', '/signOut')
];

const AdminMenu = [
  getItem('Timeline', '/timeline'),
  getItem('Jobs', '/jobs'),
  getItem('Applications', '/job/applications'),
  getItem('Database', '/database'),
  getItem('My Info', '/my-profile'),
  getItem('Shortlisted', '/shortlisted'),
  getItem('Admin', '/admin'),
  getItem('Sign Out', '/signOut')
];

const item2 = [
    getItem('Database', '/database'),
    getItem('Sign Up', '/register',),
    getItem('Sign in', '/signin',),
  ];
const MobileNavbar = ({collapsed, setCollapsed, handleOnClick}) => {
    const isAuthorized = localStorage.getItem('token');
    const userType  = localStorage.getItem("userType");
    const navbarList = userType == 'admin' ? AdminMenu : userMenu
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  
  return (
    <div
      style={{
        width: "100%",
      }}
      className="mobile-navbar-container"
    >
       {/*<div className='input-field-mobile-screen'>
      <div className="d-flex">
     <FormSelect
        allowClear={true}
        showSearch
        placeholder="Please select"
        className="navbar__category-selector"
        // onSelect={(id, val) => {
        //   const getSubCategories = categories.filter(
        //     (item) => item._id == val.id
        //   );
        //   setSubCategoriesList(getSubCategories[0].childern);
        //   setSubCategories(val.id);
        //   // HandlenewChnage()
        //   setFormData({
        //     ...formData,
        //     category: val.value,
        //     subCategory: "",
        //     tags: ''
        //   });
        //   setTags(getSubCategories[0].tags)
        // }}
        // onClear={() => {
        //   setFormData({ ...formData, category: "", subCategory: "" });
        //   setSubCategories("");
        //   setSubCategoriesList([])
        //   setTags([]);
        // }}
        // options={categories}
        // filterOption={(input, option) =>
        //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        // }
        // value={formData?.category}
      />
      <FormSelect
        allowClear={true}
        showSearch
        placeholder="Please select"
        className="navbar__tag-selector"
        // onSelect={(id, val) => {
        //   // selectedSubCategories(id);
        //   // setSubCategory(val.key)
        //   setFormData({ ...formData, subCategory: val.value });
        // }}
        // onClear={() => setFormData({ ...formData, subCategory: "" })}
        // options={subCategoriesList}
        // filterOption={(input, option) =>
        //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        // }
        // // width={'50%'}
        // value={formData?.subCategory}
      />
    </div>
      </div>*/}
      <Button
        type="primary"
        className='menu-icon-button'
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <CloseOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        style={{ display: !collapsed ?  "none" : "" }}
        // inlineCollapsed={collapsed}
        onClick={handleOnClick}
        items={isAuthorized ? navbarList : item2}
      />
    </div>
  );
};
export default MobileNavbar;