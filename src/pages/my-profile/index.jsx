import { Col, Row, Spin, Tabs } from "antd";
import { deleteImgApi, uploadApi } from "../../api/upload";
import {
  getUserApi,
  updateUserApi,
  updateThumbnailsApi,
  createUserApi,
  currentDpThumbnailApi,
} from "../../api/user";
import React, { useEffect, useState, useContext } from "react";
import { mapStates, mapCities } from "../../common/utils";
import { FiltersContext } from "../../App";
import BasicInfo from "./basicInfo/BasicInfo";
import Projects from "./projectDetails/Projects";
import MyImages from "./gallery/MyImages";
import "./my-profile.less";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import {
  getCategoryApi,
  updateBestInApi,
  updateExtraTalentApi,
  updateTagsApi,
} from "../../api/getCategories";

const MyProfile = () => {
  const myUserId = localStorage.getItem("user");
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({});
  const getActiveTab = localStorage.getItem("activeTab");
  const [activeTab, setActiveTab] = useState(getActiveTab || 1);
  const [location, setLocation] = useState(undefined);
  const [isloading, setIsloading] = useState(false);
  const [customValueAdd, setCustomValueAdd] = useState({});
  const [selectedState, setSelectedState] = useState(null);
  const [cities, setCities] = useState([]);
  const [files, setFiles] = useState({});
  const {
    states,
    categoryId,
    setCategoryId,
    bestIn,
    setBestIn,
    extraTalent,
    setExtraTalent,
    tags,
    setTags,
    fetchCategories,
    setSubCategories,
  } = useContext(FiltersContext);
  const { Id } = useParams();
  const userId = Id || myUserId;
  const createUserCheck = window.location.pathname == "/user/create/profile";

console.log(userDetails, 'userDetails')

  const getUserDetails = async () => {
    setIsloading(true);
    const data = await getUserApi(userId).then((data) => {
      setIsloading(false);
      setCategoryId(data?.categoryId);
      setSubCategories(data?.categoryId);
      return data;
    });
    const { thumbnails, projects, ...rest } = data;
    setUserDetails({ thumbnails, projects, rest });
  };

  useEffect(() => {
    if (createUserCheck) {
      return;
    } else {
      getUserDetails();
    }
  }, [window.location.pathname]);

  const onChangeRestOptions = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...userDetails,
      rest: { ...userDetails.rest, [name]: value },
    };
    setUserDetails(updatedData);
  };

  const onChangeRestNumberOptions = (e) => {
    const updatedData = {
      ...userDetails,
      rest: { ...userDetails.rest, mobileNumber: e },
    };
    setUserDetails(updatedData);
  };

  const updateBasicDetails = async () => {
    //  const loginResponse = await createUserApi(payload);
    // if(loginResponse){
    //   history.push('/signin')
    //   setIsLoading(false);
    //   setErrorMsg();
    // }else {
    //   setIsLoading(false);
    //   setErrorMsg();
    // }
    if (createUserCheck) {
      if (
        !userDetails?.rest?.fullName ||
        !userDetails?.rest?.gender ||
        !userDetails?.rest?.mobileNumber ||
        !userDetails?.rest?.languages ||
        !userDetails?.rest?.category ||
        !userDetails?.rest?.subCategory ||
        !userDetails?.rest?.state ||
        !userDetails?.rest?.city ||
        !userDetails?.rest?.experience ||
        !userDetails?.rest?.bio
      ) {
        alert("Please fill in mandatory fields.");
        return;
      }
      const age = moment().diff(userDetails?.rest?.dateOfBirth, "years");
      const payload = {
        ...userDetails.rest,
        age: age,
        password: "Test@123",
      };
      const loginResponse = await createUserApi(payload);
      if (loginResponse) {
        history.push(`/user/profile/${loginResponse?._id}`);
        // setIsLoading(false);
        // setErrorMsg();
      } else {
        // setIsLoading(false);
        // setErrorMsg();
      }
      return;
    } else {
      setIsloading(true);
      const age = moment().diff(userDetails?.rest?.dateOfBirth, "years");
      const payloadCreate = { ...userDetails?.rest, age: age };
      await updateUserApi(userId, payloadCreate).then(() => {
        setIsloading(false);
      });
    }

    if (customValueAdd?.bestIn?.length) {
      const convertArray = customValueAdd?.bestIn?.map((value, index) => ({
        key: value.toLowerCase().replace(" ", "-"),
        _id: new Date().valueOf() + index,
        value: value,
      }));
      const payload = [...bestIn, ...convertArray];
      const res = updateBestInApi(categoryId, payload);
       if(res){
          setIsloading(true);
          setTimeout(() => {
          fetchCategories(categoryId)
          setIsloading(false);
          }, 1000);
       }
    }
    if (customValueAdd?.tags?.length) {
      const convertArray = customValueAdd?.tags?.map((value, index) => ({
        key: value.toLowerCase().replace(" ", "-"),
        _id: new Date().valueOf() + index,
        value: value,
      }));
      const payload = [...tags, ...convertArray];
      const res = updateTagsApi(categoryId, payload);
      if(res){
        setIsloading(true);
        setTimeout(() => {
          fetchCategories(categoryId)
          setIsloading(false);
          }, 1000);
      }
    }
    if (customValueAdd?.extraTalent?.length) {
      const convertArray = customValueAdd?.extraTalent?.map((value, index) => ({
        key: value.toLowerCase().replace(" ", "-"),
        _id: new Date().valueOf() + index,
        value: value,
      }));
      const payload = [...extraTalent, ...convertArray];
      const res = updateExtraTalentApi(categoryId, payload);
      if(res){
        setIsloading(true);
        setTimeout(() => {
          // fetchCategories();
          setIsloading(false);
          fetchCategories(categoryId)

          }, 1000);
      }
    }
    // const response = fetchCategories();
    // if (response) {
    //   setSubCategories(categoryId);
    // }
  };

  useEffect(() => {
    const data = mapStates(states);
    setLocation(data);
  }, [states]);

  useEffect(() => {
    if (selectedState) {
      const cities = mapCities(states, selectedState);
      setCities(cities);
    }
  }, [selectedState]);

  // images handling
  const handleUploadChange = (file) => {
    setFiles(file);
  };

  const uploadThumbnail = async () => {
    setIsloading(true);
    var fd = new FormData();
    fd.append("imgUploader", files);
    const loginResponse = await uploadApi(userId, fd);
    if (!userDetails.thumbnails.length) {
      const thumbnails = { url: loginResponse, dp: true, createdAt: new Date() }
      updateThumbnailsApi(userId, thumbnails).then(() => {
        setIsloading(false);
        getUserDetails()
      });
      // setUserDetails({ ...userDetails, thumbnails });
      setFiles({});
      return;
    }
    const thumbnails = { url: loginResponse, dp: false, createdAt: new Date() }
    updateThumbnailsApi(userId, thumbnails).then(() => {
      setIsloading(false);
      getUserDetails()
    });
    setFiles({});
    // setUserDetails({ ...userDetails, thumbnails });
  };

  const makeDp = (index) => {
    setIsloading(true);
    const newArray = userDetails?.thumbnails?.map((img, idx) =>
      idx === index ? { ...img, dp: true } : { ...img, dp: false }
    );
    currentDpThumbnailApi(userId, newArray).then(() => {
      setIsloading(false);
      getUserDetails()
    });
    // setUserDetails({ ...userDetails, thumbnails: newArray });
  };

  const removePic = async (index, url) => {
    setIsloading(true);
    const res = await deleteImgApi({ url });
    if (res.success) {
      const filteredArray = userDetails?.thumbnails?.filter(
        (thumbnail, idx) => index !== idx
      );
      const checkIdDPExist = filteredArray.find((image) => image.dp);
      if (!checkIdDPExist) {
        const newData = filteredArray.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        const dataToSend = newData?.map((img, idx) =>
          idx === 0 ? { ...img, dp: true } : { ...img, dp: false }
        );
        setUserDetails({ ...userDetails, thumbnails: dataToSend });
        return currentDpThumbnailApi(userId, dataToSend).then(() => {
          setIsloading(false);
          getUserDetails();
        });
      }
      setUserDetails({ ...userDetails, thumbnails: filteredArray });
      currentDpThumbnailApi(userId, filteredArray).then(() => {
        setIsloading(false);
        getUserDetails();
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const taboOnChange = (e) => {
    setActiveTab(e);
  };

  return (
    <Spin spinning={isloading}>
      <div className="info-container">
        <Row>
          <Col span={24}>
            <Tabs defaultActiveKey={activeTab} onChange={taboOnChange}>
              <Tabs.TabPane tab="Basic Details" key="1">
                <BasicInfo
                  userDetails={userDetails}
                  onChangeRestOptions={onChangeRestOptions}
                  onChangeRestNumberOptions={onChangeRestNumberOptions}
                  setUserDetails={setUserDetails}
                  updateBasicDetails={updateBasicDetails}
                  customValueAdd={customValueAdd}
                  setCustomValueAdd={setCustomValueAdd}
                />
              </Tabs.TabPane>
              {!createUserCheck && (
                <>
                  <Tabs.TabPane tab="Project Details" key="2">
                    <Projects />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="my gallery" key="3">
                    <MyImages
                      userDetails={userDetails}
                      makeDp={makeDp}
                      removePic={removePic}
                      handleUploadChange={handleUploadChange}
                      uploadThumbnail={uploadThumbnail}
                      files={files}
                    />
                  </Tabs.TabPane>
                </>
              )}
            </Tabs>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default MyProfile;
