import { Row, Col, Button, Card } from 'antd';
import EmptyMessage from '../../../common/emptyMessage/EmptyMessage';
import ImageUploaderComponent from '../../../common/image-uploader';
import './galleryStyle.less';

const MyImages = ({
  userDetails,
  makeDp,
  removePic,
  handleUploadChange,
  uploadThumbnail,
  files
}) => {

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
                  <img
                    alt="example"
                    className="profile-images"
                    src={thumbnail.url}
                  />
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