import { Row, Col, Button, Card, Spin } from 'antd';
import { createAuditionApi, deleteAuditionByIdApi } from '../../../api/user';
import { useState } from 'react';
import EmptyMessage from '../../../common/emptyMessage/EmptyMessage';
import MyAuditionModal from './myAuditionModal';
import './styles.less';
import { updateTagsApi } from '../../../api/getCategories';
import { deleteVideoApi, uploadVideoApi } from "../../../api/upload";

const MyAudition = ({
  userDetails,
  makeDp,
  removePic,
  handleUploadChange,
  uploadThumbnail,
  files,
  getUserDetails,
  tags,
  fetchCategories,
  categoryId
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const userId = localStorage.getItem('user');
  
  const handleFileUpload = (e) => {
    var filesize = ((e.target.files[0].size/1024)/1024).toFixed(0); // MB
    if(filesize >= 100){
      alert("file upload a maximum of 100mb.");
      setFormData({...formData, files: ''})
      return 
    }
    setFormData({...formData, files: e.target.files[0]})
   
  }

  const createAuditionfun = async (payload) => {
    Object.keys(payload).forEach(key => {
      if(!payload[key])
        delete payload[key]
    });
    const res = await createAuditionApi(userId, payload);
    if(res){
       setIsVisibleModal(false);
       setIsVisibleModal(false);
       setFormData({});
       getUserDetails()
       setTimeout(() => {
      setIsLoading(false);
      }, 1000);
     }else {
      setIsLoading(false);
      setIsVisibleModal(false);
      setFormData({});
    }
  }

  const handleAdd = async () => {
    setIsLoading(true);
    let payload;
    if(formData?.type && (formData?.link || formData.files)){
      if(formData?.type == "Upload File"){
        var fd = new FormData();
        fd.append("videoUploader", formData?.files);
        const generateVideoLink = await uploadVideoApi(userId, fd);
        if(generateVideoLink && !generateVideoLink?.message){
        setIsLoading(false);
          payload = {...formData, link: generateVideoLink, customTags: '', files: '' }
          setIsLoading(false);
        }else {
          alert(generateVideoLink?.message)
          setIsLoading(false);
        }
      }else {
        payload = {...formData, _id: new Date().valueOf(), customTags: '', files: '' }
        setIsLoading(false);
      }
      createAuditionfun(payload)
      if (formData?.customTags?.length) {
        const convertArray = formData?.customTags?.map((value, index) => ({
          key: value.toLowerCase()?.replace(" ", "-"),
          _id: new Date().valueOf() + index,
          value: value,
        }));
        const payload = [...tags, ...convertArray];
        const res = updateTagsApi(categoryId, payload);
        if(res){
          setIsLoading(true);
          setTimeout(() => {
            fetchCategories(categoryId)
            setIsLoading(false);
            }, 1000);
        }
      }
    } else {
      alert("please fill mandatory fields")
      setIsLoading(false);
    }
    setIsLoading(false)
  };


  const handleDelete = async (type, id, url) => {
    const filterData = userDetails?.audition?.filter((val) => val?._id != id)
    const payload = filterData
    const res = await deleteAuditionByIdApi(userId, payload);    
    if(res){
      if(type == "Upload File"){
        const res = await deleteVideoApi({ url });
        if(res){
          setIsLoading(false)
        }
      }
      getUserDetails();
      setIsLoading(false)
    }
  }
  

  const handleCancel = () => {
    setIsVisibleModal(false);
    setFormData({});
  };

  return (
    <>
    <Spin spinning={isLoading}>
     <Row justify="center">
        <div className="content">
          {
            files?.name ?
            <div>
              <img src={files?.name && URL.createObjectURL(files)} width={250} height={250}/>
            </div> : null
          }
          <Button onClick={() => setIsVisibleModal(true)}>Add</Button>
          <div className="uploader-container">
            {/* <ImageUploaderComponent
              // title="Upload New Avatar"
              onChange={handleUploadChange}
              allowedSize={200000}
              // setErrorMsg= {setErrorMsg}
              files={files}
        /> */}

          {
            files?.name ?
            <Button onClick={uploadThumbnail}>Save</Button> : null
          }
          
           
          </div>
        </div>
      </Row>

        <Row
          gutter={[24, 24]}
          style={{marginTop: userDetails?.audition?.length ? null : '40px'}}
          justify={userDetails?.audition?.length ? "left" : "center"}
        >
        { userDetails?.audition?.length ? userDetails?.audition?.map((val, index) => {
          return (
            <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
              <Card
                className="profile-ant-card"
                bodyStyle={{display: 'none'}}
                cover={
                  <>
                  <iframe
                    width="560"
                    height="315"
                    allowFullScreen="true"
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                    src={val?.link?.replace("https://youtu.be/", "https://www.youtube.com/embed/")}
                    title="YouTube video player"
                    frameborder="0"
                    >
                  </iframe>
                  </>
                }
                actions={[
                  <Button onClick={() => handleDelete(val?.type, val?._id, val?.link )}>Delete</Button>
                ]}
              >
              </Card>
            </Col>
          )
        }): <EmptyMessage />}
      </Row>
      <MyAuditionModal
       isLoading={isLoading}
       userDetails={userDetails}
       tags={tags}
        formData={formData}
        setFormData={setFormData}
      // categories={categories}
      // subCategoriesList={subCategoriesList}
      // setSubCategoriesList={setSubCategoriesList}
      isVisibleModal={isVisibleModal}
      modalTitle='Add'
      // createProject={createProject}
      // setCreateProject={setCreateProject}
      handleAdd={handleAdd}
      handleCancel={handleCancel}
      handleFileUpload={handleFileUpload}
      // onChangeProjectFun={onChangeProjectFun}
      />
      </Spin>
    </>
  )
}

export default MyAudition;