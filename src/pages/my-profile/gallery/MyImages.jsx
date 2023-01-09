import { Row, Col, Button, Card, Select } from 'antd';
import FormSelect from '../../../common/inputs/FormSelect';
import EmptyMessage from '../../../common/emptyMessage/EmptyMessage';
import ImageUploaderComponent from '../../../common/image-uploader';
import './galleryStyle.less';

const MyImages = ({
  userDetails,
  makeDp,
  removePic,
  handleUploadChange,
  uploadThumbnail,
  files,
  tags,
  imageFormData,
  setImageFormData
}) => {
console.log(imageFormData, 'imageFormData')
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
          {files?.name && <FormSelect
            name="tags"
            label="Tags"
            mode="tags"
            value={imageFormData?.tags}
            // onSelect={(cat, val) => {
            //   const data = {
            //     ...userDetails.thumbnails,
            //       tags: userDetails?.thumbnails?.tags?.length
            //         ? [...userDetails.thumbnails.tags, val.value]
            //         : [val.value],
            //   };
            //   console.log(data, 'data')
            //   // setUserDetails(data);
            //   setImageFormData(data)
            // }}
            // onDeselect={(val) => {
            //   const tags = userDetails.rest.tags.filter((item) => item !== val);
            //   console.log(tags, 'tags')
            //   setImageFormData({
            //     ...userDetails,
            //     rest: { ...userDetails.rest, tags: tags },
            //   });
            // }}
            onChange={(e) => {
              const convertArray = tags.map((x, index) => (
                x.value
              ));
              const newValue = e.filter(element => !convertArray.includes(element));
              setImageFormData({
                tags: e,
                customTags: newValue
              });
            }}
            options={tags}
            showSearch
            required
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            // validationError={formDataErrors.languages}
            width={"100%"}
          />}
          
          <div className="uploader-container">

            <ImageUploaderComponent
              // title="Upload New Avatar"
              onChange={handleUploadChange}
              allowedSize={200000}
              // setErrorMsg= {setErrorMsg}
              files={files}
            />

          {
            files?.name ?
            <Button onClick={uploadThumbnail}>Save</Button> : null
          }
          
           
          </div>
        </div>
      </Row>

        <Row
          gutter={[24, 24]}
          style={{marginTop: userDetails?.thumbnails?.length ? null : '40px'}}
          justify={userDetails?.thumbnails?.length ? "left" : "center"}
        >
        { userDetails?.thumbnails?.length ? userDetails?.thumbnails?.map((thumbnail, index) => {
          return (
            <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
              <Card
                className="profile-ant-card"
                bodyStyle={{display: 'none'}}
                cover={
                  <>
                  <img
                    alt="example"
                    className="profile-images"
                    src={thumbnail.url}
                  />
                  <div className="thumbnail-tag-list">
                  {
                    thumbnail?.tags?.map((tag) => (
                      <div className="tag">{tag}</div>
                    ))
                  }
                  </div>
                  </>
                }
                actions={[
                  thumbnail.dp ? <Button className="current-dp-btn" >Current DP</Button> : <Button onClick={() => makeDp(index)}>Make it DP</Button>,
                  <Button onClick={() => removePic(index, thumbnail.url)}>Delete</Button>
                ]}
              >
              </Card>
            </Col>
          )
        }): <EmptyMessage />}
      </Row>
    </>
  )
}

export default MyImages;

// old code 

{/* // <Row gutter={[24, 24]}>
      //   {
      //     userDetails?.thumbnails?.map((thumbnail, index) => (
      //       // <div className="uploaded-container">
      //         <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6} className={thumbnail.dp ? "select-current-dp" : ""}>
      //           <div className="uploaded-container">
      //            {/* <div className="title">{thumbnail.dp ? 'Current DP' : ''}</div> */}
      //             <img src={thumbnail.url} width={'100%'} />
      //             {/* <Button>tags</Button> */}
      //             <div className="action-btn">
      //               {
      //                 thumbnail.dp ? <Button className="current-dp-btn" >Current DP</Button> : <Button onClick={() => makeDp(index)}>Make it DP</Button>
      //               }
      //               <Button onClick={() => removePic(index, thumbnail.url)}>Delete</Button>
      //             </div>
      //           </div>
      //         </Col>
      //       // </div>
      //     ))
      //   }  
// </Row> */}