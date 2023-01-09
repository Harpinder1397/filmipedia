import { Row } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FormSelect from "../../common/inputs/FormSelect";

import "./navbarStyle.less";

const NavbarMain = () => {
  const history = useHistory();
  const [token, setToken] = useState(true);

  const handelLogout = () => {
    setToken(false);
    window.localStorage.clear();
    history.push('/');
  };

  const tags = [1,2,3]

  return (
    <div>

    <div className="navbar-container">
      <div className="select-box">
        <FormSelect
          allowClear={true}
          showSearch
          placeholder="Please select"
          className="navbarMain__category-selector"
          // onSelect={(id, val) => {
          //   const getSubCategories = categories.filter(
          //     (item) => item.id == val.id
          //   );
          //   setSubCategoriesList(getSubCategories[0].childern);
          //   setSubCategories(val.id);
          //   // HandlenewChnage()
          //   setLoading(true);
          //   setFormData({ ...formData, category: val.value, subCategory: "" });
          // }}
          // onClear={() => {
          //   setFormData({ ...formData, category: "", subCategory: "" });
          //   setSubCategories("");
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
          className="navbarMain__tag-selector"
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
      {/* .... */}
      <input
        type={"search"}
        className="navbar-search-field"
        placeholder="Search items"
      />
      {/* . ...*/}
      <div className="navbar-btn-container">
      {token
        ? (
          <>
            <button 
              className="navbar-right-btn" 
              onClick={()=>history.push('/timeline')}
            >
              Timeline
            </button>
            <button 
              className="navbar-right-btn" 
              onClick={()=>history.push('/jobs')}>Jobs</button>
            <button 
              className="navbar-right-btn" 
              onClick={()=>history.push('/database')}>Database</button>
            {/* <button 
            className="navbar-right-btn" 
          onClick={()=>history.push('/messages')}>Messages</button> */}
            <button 
              className="navbar-right-btn" 
              onClick={()=>history.push('/my-profile/basic-details')}>My Info</button>
            <button 
              className="navbar-right-btn" 
              onClick={()=>history.push('/shortlisted')}>Shortlisted</button>
            <button 
              className="navbar-right-btn" 
              onClick={()=>history.push('/admin')}>Admin</button>
            <button 
              className="navbar-right-btn" 
              onClick={handelLogout} ghost>Sign Out</button>
          </>
        ) :
          <>
            <button 
              className="navbar-right-btn" 
              onClick={()=>history.push('/database')}>Database</button>
            <button 
              className="navbar-right-btn" 
              onClick={()=>history.push('/register')}>Sign Up</button>
            <button 
              className="navbar-right-btn" 
              onClick={()=>history.push('/signin')}>Sign in</button>
          </>
      }
      </div>
    </div>
    {
      tags?.length ?
      <Row className="navbar__tags-container">
        {
          tags?.map((tag) => (
            <div className="nav-subBar">{tag}</div>
          ))
        }
      </Row>
      : null
    }</div>
  );
};

export default NavbarMain;
