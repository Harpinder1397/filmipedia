import { Row, Col, Button, Card } from 'antd';
import { createShowreelApi, deleteShowreelByIdApi, replaceShowreelApi } from '../../../api/user';
import { useState } from 'react';
import EmptyMessage from '../../../common/emptyMessage/EmptyMessage';
import MyAuditionModal from './myAuditionModal';
import './styles.less';
import { updateTagsApi } from '../../../api/getCategories';

const MyShowreel = ({
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
  const [modalTitle, setModalTitle] = useState('Add');
  
  const userId = localStorage.getItem('user');
  
  const renderApi = (userId, payload) => {
    if(modalTitle == 'Add'){
      return createShowreelApi(userId, payload);
    }
    if(modalTitle == 'Replace'){
      return replaceShowreelApi(userId, payload);
    }
  }

  const handleAdd = async () => {
    if(formData?.type && formData?.link){
      const payload = {...formData, _id: new Date().valueOf(), customTags: '' }
      Object.keys(payload).forEach(key => {
        if(!payload[key])
          delete payload[key]
      });
      const res = await renderApi(userId, payload);
      if(res){
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
      if (formData?.customTags?.length) {
        const convertArray = formData?.customTags?.map((value, index) => ({
          key: value.toLowerCase().replace(" ", "-"),
          _id: new Date().valueOf() + index,
          value: value,
        }));
        const payload = [...tags, ...convertArray];
        const res = updateTagsApi(categoryId, payload);
        if(res){
          // setIsloading(true);
          setTimeout(() => {
            fetchCategories(categoryId)
            // setIsloading(false);
            }, 1000);
        }
      }
    } else {
      alert("please fill mandatory fields")
    }
    
  };

  const handleReplace = async (value) => {
    setModalTitle('Replace')
    setIsVisibleModal(true)
    setFormData(value);    
  }

  const handleDelete = async (id) => {
    const filterData = userDetails?.showreel?.filter((val) => val?._id != id)
    const payload = filterData
    const res = await deleteShowreelByIdApi(userId, payload);
    if(res){
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
     <Row justify="center">
        <div className="content">
          {
            files?.name ?
            <div>
              <img src={files?.name && URL.createObjectURL(files)} width={250} height={250}/>
            </div> : null
          }
          {userDetails?.showreel?.length ? '' : <Button onClick={() => {
            setIsVisibleModal(true)
            setModalTitle('Add')
          }}>Add</Button>}
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
          style={{marginTop: userDetails?.showreel?.length ? null : '40px'}}
          justify={userDetails?.showreel?.length ? "left" : "center"}
        >
        { userDetails?.showreel?.length ? userDetails?.showreel?.map((val, index) => {
          return (
            <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
              <Card
                className="profile-ant-card"
                bodyStyle={{display: 'none'}}
                cover={
                  <iframe
                    width="560"
                    height="315"
                    src={val?.link?.replace("https://youtu.be/", "https://www.youtube.com/embed/")}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                  </iframe>
                }
                actions={[
                  <Button onClick={() => handleReplace(val)}>Replace</Button>,
                  <Button onClick={() => handleDelete(val?._id)}>Delete</Button>
                ]}
              >
              </Card>
            </Col>
          )
        }): <EmptyMessage />}
      </Row>
      <MyAuditionModal
        formData={formData}
        setFormData={setFormData}
      // categories={categories}
      // subCategoriesList={subCategoriesList}
      // setSubCategoriesList={setSubCategoriesList}
      isVisibleModal={isVisibleModal}
      modalTitle={modalTitle}
      // createProject={createProject}
      // setCreateProject={setCreateProject}
      handleAdd={handleAdd}
      handleCancel={handleCancel}
      // onChangeProjectFun={onChangeProjectFun}
      tags={tags}
      />
    </>
  )
}

export default MyShowreel;