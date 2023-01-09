import { Row, Col, Button, Card } from 'antd';
import { createAuditionApi, deleteAuditionByIdApi } from '../../../api/user';
import { useState } from 'react';
import EmptyMessage from '../../../common/emptyMessage/EmptyMessage';
import ImageUploaderComponent from '../../../common/image-uploader';
import MyAuditionModal from './myAuditionModal';
import './styles.less';

const MyAudition = ({
  userDetails,
  makeDp,
  removePic,
  handleUploadChange,
  uploadThumbnail,
  files,
  getUserDetails
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const userId = localStorage.getItem('user');
  
  const handleAdd = async () => {
    if(formData?.type && formData?.link){
      const payload = {...formData, _id: new Date().valueOf() }
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
    } else {
      alert("please fill mandatory fields")
    }
    
  };


  const handleDelete = async (id) => {
    const filterData = userDetails?.audition?.filter((val) => val?._id != id)
    const payload = filterData
    const res = await deleteAuditionByIdApi(userId, payload);
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
                 <iframe width="560" height="315" src={val?.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                }
                actions={[
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
      modalTitle='Add'
      // createProject={createProject}
      // setCreateProject={setCreateProject}
      handleAdd={handleAdd}
      handleCancel={handleCancel}
      // onChangeProjectFun={onChangeProjectFun}
      />
    </>
  )
}

export default MyAudition;