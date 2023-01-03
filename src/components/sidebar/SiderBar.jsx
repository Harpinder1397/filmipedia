import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import './index.css';
import { Link } from 'react-router-dom';
import sideBarMenu from '../../constant/sideBarMenu';

const { SubMenu } = Menu;

const SideBar = () => {
  const rootSubmenuKeys = sideBarMenu.map((item) => (item.key.toString()));
  const [openKeys, setOpenKeys] = useState([])
  const [keys, setKeys] = useState('')
   
  const onOpenChange = (keeys) => {
    const latestOpenKey = keeys?.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keeys);
    } else {
      const k = latestOpenKey ? [latestOpenKey] : [];
      setOpenKeys( k );
    }
  }
  
  useEffect(()=>{
    let href=window.location.href.split('/');
    if(href.length <= 4){
      setOpenKeys(['1']);
      setKeys(9);
      return;
    }
    const existingRoute = href.length <= 5 ? `${href[3]}/${href[4]}` : `${href[3]}/${href[4]}/${href[5]}`;
    if(existingRoute) {
      const route = sideBarMenu.map((item) => (
            item.menu.filter((c)=> (
              c.path.includes(existingRoute) ? {...c} : null)
          ))
        )
      if(route) {
        setOpenKeys([route.filter(item => item.length)[0][0].rootKey.toString()]);
        setKeys(route.filter(item => item.length)[0][0].key);
      }
    }
  },[])

  return (
    <div style={{ 
      height: '100%',
      position: 'fixed',
      overflow: 'scroll',
      boxShadow: '0 0 5px 5px'
    }}>
      <div>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        >
          {
            sideBarMenu.map((item) => (
              <SubMenu key={item.key} icon={item.icon} title={item.title}>
                {
                item.menu.map((menu) => (
                  <Menu.Item key={menu.key} className={keys == menu.key ? 'ant-menu-item-selected' : ''}>
                    <Link to={menu.path} onClick={()=>setKeys(menu.key)}>
                      {menu.title}
                    </Link>
                  </Menu.Item>
                ))
                }
              </SubMenu>
            ))
          }
        </Menu>
      </div>
    </div>
  )
};
export default SideBar;
