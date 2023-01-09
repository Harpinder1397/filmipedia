import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useLocation, useParams } from "react-router-dom";
import { useHistory } from 'react-router';
import qs from "query-string";
// eslint-disable-next-line import/no-unresolved
import { Layout, message, Row, Spin } from "antd";
import "./App.less";
// import Dashboard from './Dashboard';
import CompleteList from "./pages/complete-list";
import Demo from "./Demo";
import LoginRoute from "./routes/LoginRoute";
import SignIn from "./pages/sign-in";
import NotFound from "./pages/not-found";
// import NotFound from "pages/not-found/index";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Content } from "antd/lib/layout/layout";
import { createContext } from "react";
import Messages from "./pages/messages";
import ProfileDetails from "./pages/profile-details/ProfileDetails";
import RegistrationForms from "./pages/registarion/RegistrationFroms";
import { getCategoryApi } from "./api/getCategories";
import AdminPanel from "./pages/admin-panel";
import MyProfile from "./pages/my-profile";
import TimeLine from "./pages/timeline";
import ShortListedProfiles from "./pages/shortlisted-profiles";
import { WarningOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import NavbarMain from "./components/navbar/NavbarMain";
import { useUpdateStateMutation } from "./api/getStatesQuery";
import JobApplications from "./pages/jobs/applications";
import Jobs from "./pages/jobs";
import MyApplications from "./pages/jobs/applications/MyApplications";
import MyJobs from "./pages/jobs/MyJobs";

message.config({
  top: 70,
  duration: 2,
});

export const FiltersContext = createContext({});

export const FilterProvider = FiltersContext.Provider;

const App = () => {
  const userId = localStorage.getItem('user');
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [categories, setCategories] = useState([]);
  const location = useLocation(); // React Hook
  const paramQuery = qs.parse(location?.search)
  const [formData, setFormData] = useState({category: 'Cast',limit: 100, ...paramQuery});
  const [jobFormData, setJobFormData] = useState({userId: userId, ...paramQuery});
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [token, setToken] = useState(false);
  const [subCategory, setSubCategory] = useState(undefined);
  const [tags, setTags] = useState([]); 
  const [bestIn, setBestIn] = useState([]); 
  const [extraTalent, setExtraTalent] = useState([]); 
  const history = useHistory();
  const [category, setSelectedCategory] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const fetchCategories = async (id) => {
    const data = await getCategoryApi();
    if(data) {
      setCategories(data);
      const defaultFilter = data?.find((cat) => cat?._id == (id || '639823ebcac41f6a64632c69'));
      setSelectedCategory(defaultFilter?.value);
      setSelectedSubCategories(defaultFilter?.childern);
      setTags(defaultFilter?.tags);
      setBestIn(defaultFilter?.bestIn);
      setExtraTalent(defaultFilter?.extraTalent);
      setFilters(defaultFilter?.filters)
      setCategoryId(defaultFilter?.categoryId);
    } else {
      setCategories([]);
    }
  };

  const getCategories = async () => {
    const data = await getCategoryApi();
    if(data && formData) {
      const defaultFilter = data?.find((cat) => cat?._id == '639823ebcac41f6a64632c69');
      setSelectedCategory(defaultFilter?.value);
      setSelectedSubCategories(defaultFilter?.childern);
      setTags(defaultFilter?.tags);
      // setBestIn(defaultFilter?.bestIn);
      setExtraTalent(defaultFilter?.extraTalent);
      setFilters(defaultFilter?.filters)
      setCategoryId(defaultFilter?.categoryId);

    } else {
      setSelectedCategory([]);
      setSelectedSubCategories([]);
      setTags([]);
      setBestIn([]);
      setExtraTalent([]);
      setFilters([])
    }
    // const updateData = data?.map((item) => ({
    //   ...item,
    //   id: item?._id,
    // }));
  };


  // const getStates = async () => {
  //   const data = await getStatesApi();
  //   setStates(data);
  // };

  useEffect(() => {
    if(location.pathname.includes('jobs') && jobFormData){
      const query = jobFormData
      Object.keys(query).forEach(key => {
        if(!query[key])
          delete query[key]
      });
      history.push(`/jobs${query ? `?${qs.stringify(query)}` : ""}`);
    }else {
      if(formData){
        const query = formData
        Object.keys(query).forEach(key => {
          if(!query[key])
            delete query[key]
        });
        history.push(`/database${query ? `?${qs.stringify(query)}` : ""}`);
      }
    }
  }, [formData, jobFormData]);

  useEffect(() => {
    const isProfileCompleted = localStorage.getItem("isProfileCompleted");
    setProfileCompleted(isProfileCompleted);
    getCategories();
  }, []);

  const setSubCategories = (id) => {
    const data = categories?.find((cat) => cat._id == id);

    if(data) {
      setSelectedCategory(data?.value);
      setSelectedSubCategories(data?.childern);
      setTags(data?.tags);
      setBestIn(data?.bestIn);
      setExtraTalent(data?.extraTalent);
      setFilters(data?.filters)
    } else {
      setSelectedCategory([]);
      setSelectedSubCategories([]);
      setTags([]);
      setBestIn([]);
      setExtraTalent([]);
      setFilters([])
    }
   
  };
  
  const { mutate: fetchStatesMutation } = useUpdateStateMutation();

  localStorage.setItem("loading", true);



  useEffect(() => {
    const token = localStorage.getItem("token");
    // getStates();
    setToken(token);
    fetchStatesMutation();
    fetchCategories()  
    // setSubCategories()
  }, []);

  // useEffect(() => {
  //   setIsloading(true);
  //  setTimeout(() => {
  //   setIsloading(false);
    
  //  }, 3000);
  // }, [])
  const pathFilter = ['/register', '/signin', '/signin/']
  const renderTopNavbar = () => {
    if(pathFilter.includes(location.pathname)){
      return null
    }else {
      return <Navbar setIsloading={setIsloading} />
    }
  }

  const renderFooter = () => {
    if(pathFilter.includes(location.pathname)){
      return null
    }else {
      return <Footer />
    }
  }


  return (
    <Spin 
    spinning={false}
    >
      <Layout>
        <FilterProvider
          value={{
            categories,
            selectedSubCategories,
            setSubCategories,
            category,
            token,
            setToken,
            tags,
            filters,
            bestIn,
            extraTalent,
            subCategory,
            setSubCategory,
            formData,
            setFormData,
            jobFormData,
            setJobFormData,
            categoryId,
            setCategoryId,
            getCategories,
            fetchCategories
          }}
        >
         {renderTopNavbar()}
          <Content className={pathFilter.includes(location.pathname) ? '' : "layout-content"}>
         
            <Switch>
              <Route exact path="/" component={Demo} />
              <Route exact path="/signin" component={RegistrationForms} />
              <Route exact path="/signin/:callbackUrl" component={RegistrationForms} />
              <LoginRoute exact path="/my-profile/" component={MyProfile} />
              <LoginRoute exact path="/my-profile/:name" component={MyProfile} />
              <LoginRoute exact path="/user/profile/:Id" component={MyProfile} />
              <LoginRoute exact path="/user/create/profile" component={MyProfile} />
              
              <Route exact path="/timeline" component={TimeLine} />
              <LoginRoute exact path="/messages" component={Messages} />
              <LoginRoute
                exact
                path="/profile/:id"
                component={ProfileDetails}
              />
              <LoginRoute exact path="/admin" component={AdminPanel} />
              <LoginRoute exact path="/jobs" component={Jobs} />
              <LoginRoute exact path="/jobs/:jobSearch" component={Jobs} />
              <LoginRoute exact path="/my/jobs" component={MyJobs} />
              <LoginRoute exact path="/job/applications" component={JobApplications} />
              <LoginRoute exact path="/my/job/applications" component={MyApplications} />
              <Route exact path="/register" component={RegistrationForms} />
              <Route exact path="/database" component={CompleteList} />
              <Route exact path="/database/:search" component={CompleteList} />
              <LoginRoute
                exact
                path="/shortlisted"
                component={ShortListedProfiles}
              />
              <Route path="*" component={NotFound} />
            </Switch>
            {!token ? null : !profileCompleted ? null : (
              <div
                style={{
                  position: "fixed",
                  bottom: 130,
                  right: 100,
                  backgroundColor: "orange",
                  padding: 24,
                }}
              >
                <Link to="/my-profile">
                  <WarningOutlined />
                  Please complete your profile.
                </Link>
              </div>
            )}
          </Content>
            {renderFooter()}
        </FilterProvider>
      </Layout>
      </Spin>
  );
};
export default App;
