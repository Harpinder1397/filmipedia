import React, { useState, useContext, useEffect } from "react";
import {
  Layout,
  Row,
  Button,
  Input,
  Menu,
  Dropdown,
  Space,
  Avatar,
  Switch,
} from "antd";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";

// eslint-disable-next-line import/no-unresolved
import "./Navbar.less";
import { FiltersContext } from "../../App";
import FormSelect from "../../common/inputs/FormSelect";
import { getUserApi, updateUserApi, useUpdateUserNameMutation } from "../../api/user";
import MobileNavbar from "./MobileNavbar";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useUpdateJobsMutation } from "../../api/getJobs";

const Navbar = ({setIsloading}) => {
  const history = useHistory();
  const location = useLocation(); // React Hook
  const [collapsed, setCollapsed] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const getThemeType = localStorage.getItem('themeType')
  const defalutThemeType = getThemeType == 'dark' ? true : false
  const [themeType, setThemeType] = useState(defalutThemeType || false);
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const multiplePath = ['database', 'jobs']
  const databasePath = multiplePath.includes(location.pathname);
  const userType  = localStorage.getItem("userType");
  const userName  = localStorage.getItem("userName");
  const myUserId = localStorage.getItem("user");
  const jobsLocation = location.pathname.includes('jobs')
  const paramQuery = qs.parse(location?.search)

  console.log(paramQuery, 'paramQuery')
  const {
    categories,
    setSubCategories,
    token,
    setToken,
    // formData,
    setFormData,
    tags,
    setTags,
    selectedSubCategories,
    setJobFormData
  } = useContext(FiltersContext);

  const formData = qs.parse(location?.search)

 

  const getUserDetails = async () => {
    const data = await getUserApi(myUserId).then((data) => {
      return data;
    });
    const { thumbnails, projects, ...rest } = data;
    setUserDetails({ thumbnails, projects, rest });
  };

  const handelLogout = () => {
    setToken(false);
    window.localStorage.clear();
    history.push("/");
  };

  const handleOnClick = (e) => {
    history.push(e.key);
    if (e.key == "/signOut") {
      handelLogout();
    }
    setCollapsed(false);
  };
  const { mutate: userNameMutation, isLoading } = useUpdateUserNameMutation();
  const { mutate: fetchJobList, isLoading: loading2} = useUpdateJobsMutation();



  const handleThemeMode = (e) => {
    if(e){
      setThemeType(e);
      localStorage.setItem('themeType', 'dark');
    }else {
      setThemeType(e);
      localStorage.setItem('themeType', 'light');
    }
  }

  const onChangeAvailable = async (e) => {
    setIsloading(true);
    const payloadCreate = {...userDetails?.rest, available: e ? 'Available' : 'Not Available' }
    await updateUserApi(myUserId, payloadCreate).then(() => {
      setIsloading(false);
      getUserDetails();
    });
  }

  useEffect(() => {
    if(formData){
      setIsloading(isLoading);
    }
  }, [isLoading])

  useEffect(() => {
    if(themeType){
      document.documentElement.setAttribute("data-theme", 'dark');
    }else {
      document.documentElement.setAttribute("data-theme", 'light');
    }
  }, [themeType, getThemeType])
  

  useEffect(() => {
    if(location.pathname.includes('jobs')){
      const payload = qs.parse(location?.search);
      Object.keys(payload)?.forEach(key => {
        if(!payload[key])
          delete payload[key]
      });
      fetchJobList(payload);
    }else{
      const payload = qs.parse(location?.search);
      Object.keys(payload)?.forEach(key => {
        if(!payload[key])
          delete payload[key]
      });
      if((formData?.category || formData?.subCategory || formData?.tags) && !databasePath) {
        //  history.push("/database");
      }
      userNameMutation(payload);
      
    }
  }, [formData?.category, formData?.subCategory, formData?.tags])

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
        const payload = formData;
        Object.keys(payload).forEach(key => {
          if(!payload[key])
            delete payload[key]
        });
        if(formData?.fullName && !databasePath){
          // history.push("/database");
        }
        userNameMutation(payload);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [formData?.fullName]);
  

  useEffect(() => {
    getUserDetails();
    history.replace({
      search: '',
    })
  }, []);


  const userMenu = [
    {
      key: "0",
      label: (
        <div> 
          Avaliable : <Switch checked={userDetails?.rest?.available == 'Available' ? true : false} onChange={onChangeAvailable} />
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "1",
      label: (
        <div onClick={() => history.push("/my-profile")}> My Info</div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div onClick={() => history.push("/my/jobs")}> My Jobs</div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <div onClick={() => history.push("/my/job/applications")}> My Applications</div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: <div onClick={() => handelLogout()}>Sign Out</div>,
    },
  ]

  const AdminMenu = [
    {
      key: "0",
      label: (
        <div> 
          Avaliable : <Switch checked={userDetails?.rest?.available == 'Available' ? true : false} onChange={onChangeAvailable} />
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "1",
      label: (
        <div onClick={() => history.push("/my-profile")}> My Info</div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div onClick={() => history.push("/my/jobs")}> My Jobs</div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <div onClick={() => history.push("/my/job/applications")}> My Applications</div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: <div onClick={() => history.push("/admin")}>Admin</div>,
    },
    {
      type: "divider",
    },
    {
      key: "5",
      label: <div onClick={() => handelLogout()}>Sign Out</div>,
    },
  ]

  const menu = (
    <Menu
      items={userType == 'admin' ? AdminMenu : userMenu}
    />
  );

  const renderButtons = () => {
    if (token) {
      return (
        <React.Fragment>
          <Button type="primary" className={location.pathname ==  '/timeline' ? "active-navbar-btn" : '' } onClick={() => history.push("/timeline")}>
            Timeline
          </Button>
          <Button type="primary" className={location.pathname ==  '/jobs' ? "active-navbar-btn" : '' } onClick={() => history.push("/jobs")}>
            Jobs
          </Button>
          <Button
            type="primary"
            className={location.pathname ==  '/job/applications' ? "active-navbar-btn" : '' }
            onClick={() => history.push("/job/applications")}
          >
            Applications
          </Button>
          <Button className={location.pathname ==  '/database' ? "active-navbar-btn" : '' } type="primary" onClick={() => history.push("/database")}>
            Database
          </Button>
          {/* <Button type="primary" onClick={()=>history.push('/messages')}>Messages</Button> */}
          {/* <Button type="primary" onClick={()=>history.push('/my-profile')}>My Info</Button> */}
          <Button className={location.pathname ==  '/shortlisted' ? "active-navbar-btn" : '' } type="primary" onClick={() => history.push("/shortlisted")}>
            Shortlisted
          </Button>
          <Switch checked={themeType} onChange={handleThemeMode} checkedChildren="light" unCheckedChildren="dark" />
          {/* <Button type="primary" onClick={()=>history.push('/admin')}>Admin</Button> */}
          {/*<Button type="primary" onClick={handelLogout} ghost>Sign Out</Button> */}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Button className={location.pathname ==  '/database' ? "active-navbar-btn" : '' } type="primary" onClick={() => history.push("/database")}>
            Database
          </Button>
          <Button className={location.pathname ==  '/register' ? "active-navbar-btn" : '' } type="primary" onClick={() => history.push("/register")}>
            Sign Up
          </Button>
          <Button className={location.pathname ==  '/signin' ? "active-navbar-btn" : '' } type="primary" onClick={() => history.push("/signin")}>
            Sign in
          </Button>
        </React.Fragment>
      );
    }
  };

  const renderProfileIcon = () => {
    if(token){
      return (
        <Dropdown
            overlay={menu}
            className="dropdown-hide-mobile-screen"
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
          <Space>
            <Avatar style={{height: '35px', width: '35px', border: '1px solid darkgrey'}}>{userName?.slice(0,1)}</Avatar>
          </Space>
        </Dropdown>
      )
    }
  }

  return (
    <Layout.Header className="navbar">
      <Row className="navbar-ant-row" justify="space-around" align="middle">
        <div className="navbar__logo" >
          F I L M I P E D I A
          {/* W E B S I T E */}
        </div>
        <div className="ant-row ant-row-middle navbar__left">
          <div className="d-flex">
            <FormSelect
              allowClear={true}
              showSearch
              placeholder="Please select"
              className="navbar__category-selector"
              onSelect={(id, val) => {
                console.log(val.id, 'val')
                const getSubCategories = categories.find(
                  (item) => item._id == val.id
                );
                setSubCategoriesList(val.id);
                // setSubCategories(val.id);
                // HandlenewChnage()
                if(jobsLocation){
                  setJobFormData({
                    ...formData,
                    category: val.value,
                    subCategory: "",
                    tags: ''
                  });
                }else {
                  setFormData({
                    ...formData,
                    category: val.value,
                    subCategory: "",
                    tags: '',
                    page: 1,
                    limit: 100
                  });
                }
                setTags(getSubCategories?.tags)
              }}
              onClear={() => {
                if(jobsLocation){
                    setJobFormData({ ...formData, category: "", subCategory: "" });
                }else {
                  setFormData({ ...formData, category: "", subCategory: "", page: 1 });
                }
                setSubCategories("");
                setSubCategoriesList([])
                setTags([]);
              }}
              options={categories}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={formData?.category}
            />
            <FormSelect
              allowClear={true}
              showSearch
              placeholder="Please select"
              className="navbar__tag-selector"
              onSelect={(id, val) => {
                // selectedSubCategories(id);
                // setSubCategory(val.key)
                
                if(jobsLocation){
                  setJobFormData({ ...formData, subCategory: val.value });
                }else {
                  setFormData({ ...formData, subCategory: val.value, page: 1 });
                }
              }}
              onClear={() => {
                if(jobsLocation){
                  setJobFormData({ ...formData, subCategory: "" })
                }else {
                  setFormData({ ...formData, subCategory: "", page: 1 })
                }
              }}
              options={selectedSubCategories}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // width={'50%'}
              value={formData?.subCategory}
            />
          </div>
        </div>

        <div className="ant-row ant-row-middle navbar__left">
          <div className="d-flex">
            <FormSelect
              allowClear={true}
              showSearch
              placeholder="Please select"
              className="navbar__category-selector"
              onSelect={(id, val) => {
                console.log(val.id, 'val')
                const getSubCategories = categories.find(
                  (item) => item._id == val.id
                );
                setSubCategoriesList(val.id);
                // setSubCategories(val.id);
                // HandlenewChnage()
                if(jobsLocation){
                  setJobFormData({
                    ...formData,
                    category: val.value,
                    subCategory: "",
                    tags: ''
                  });
                }else {
                  setFormData({
                    ...formData,
                    category: val.value,
                    subCategory: "",
                    tags: '',
                    page: 1,
                    limit: 100
                  });
                }
                setTags(getSubCategories?.tags)
              }}
              onClear={() => {
                if(jobsLocation){
                    setJobFormData({ ...formData, category: "", subCategory: "" });
                }else {
                  setFormData({ ...formData, category: "", subCategory: "", page: 1 });
                }
                setSubCategories("");
                setSubCategoriesList([])
                setTags([]);
              }}
              options={categories}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={formData?.category}
            />
            <FormSelect
              allowClear={true}
              showSearch
              placeholder="Please select"
              className="navbar__tag-selector"
              onSelect={(id, val) => {
                // selectedSubCategories(id);
                // setSubCategory(val.key)
                
                if(jobsLocation){
                  setJobFormData({ ...formData, subCategory: val.value });
                }else {
                  setFormData({ ...formData, subCategory: val.value, page: 1 });
                }
              }}
              onClear={() => {
                if(jobsLocation){
                  setJobFormData({ ...formData, subCategory: "" })
                }else {
                  setFormData({ ...formData, subCategory: "", page: 1 })
                }
              }}
              options={selectedSubCategories}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // width={'50%'}
              value={formData?.subCategory}
            />
          </div>
        </div>

        <Input
          name="fullName"
          className="navbar-search-input"
          placeholder="Search"
          value={formData?.fullName || formData?.title}
          onChange={(e) =>{
            if(jobsLocation){
              setJobFormData({...formData, title: e.target.value})
            }else {
              setFormData({ ...formData, fullName: e.target.value, page: 1 })
            }
          }}
        />
        <div className="navbar__right">{renderButtons()}</div>
        {renderProfileIcon()}
        <MobileNavbar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            handleOnClick={handleOnClick}
          />
      </Row>
      {tags?.length && location.pathname.includes('database') && paramQuery?.category ? (
        <Row className="navbar__tags-container">
          <div className="tag-list">
          {tags?.map((tag) => (
            <div
              className={`nav-subBar ${tag.value == formData?.tags && "active-navbar-subBar"}`}
              onClick={() => {
                setFormData({...formData, tags: [tag.value]})
              }}
            >
              {tag.value}
            </div>
          ))}
          </div>
          {formData?.tags && <CloseCircleOutlined className="close-circle-outline" onClick={() => {
            setFormData({...formData, tags: []})
          }} />}
        </Row>
      ) : null}
    </Layout.Header>
  );
};

export default Navbar;
