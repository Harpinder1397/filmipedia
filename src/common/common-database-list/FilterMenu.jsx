import React, { useEffect, useState } from 'react';
import { Button, Drawer, Input } from 'antd';
import './filterMenuStyle.less'
import { FilterOutlined } from '@ant-design/icons';
import { useUpdateUserNameMutation } from '../../api/user';


const FilterMenu = ({renderLeftSideFilter, setIsloading}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState();

  const { mutate: userNameMutation, isLoading } = useUpdateUserNameMutation();


  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setIsloading(isLoading)
  }, [isLoading])
  

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
        const payload = formData;
    Object.keys(formData).forEach(key => {
      if(!formData[key])
        delete formData[key]
    });
      userNameMutation(payload);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [formData]);

  return (
    <>
    <div className='filter-menu-container'>
    <Input
          name="fullName"
        //   className="navbar-search-input"
          placeholder="Search"
          value={formData?.fullName}
          onChange={(e) =>
            setFormData({fullName: e.target.value })
          }
        />
      <Button className='button-menu-filter' type="primary" onClick={showDrawer}>
        <FilterOutlined />
      </Button>
    </div>
    
    
      <Drawer className='basic-left-dashboard-drawer' title="Filters" placement="left" onClose={onClose} open={open}>
        {renderLeftSideFilter()}
      </Drawer>
    </>
  );
};
export default FilterMenu;