import { Row, Col, Button, List, Avatar, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import './profileDetails.less';
// import Thumbnail from 'assets/images/dummy.png'
import { CheckCircleFilled } from '@ant-design/icons';
import { useGetUserDataQuery, useGetUserQuery, useUpdateUserNameMutation, useUserQuery } from '../../api/user';
import { useParams } from 'react-router';
import defaultThumbnail from '../../assets/images/avatar.png'
import About from './tab/About';
import Links from './tab/Links';
import Portfolio from './tab/Portfolio';
import { getProjectsApi } from '../../api/projects';
import { Link } from 'react-router-dom';

const renderTabData = (tab, userDetails, projects) => {
	switch (tab) {
		case 1:
			return <About userDetails={userDetails} />;
		case 2:
			return <Links projects={projects}/>;
		case 3:
			return <Portfolio userDetails={userDetails} />;
		default:
			return <About userDetails={userDetails} />;
	}
}
const ProfileDetails = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [projects, setProjects] = useState([]);

	const { data: userDetails, isLoading: loading8} = useGetUserDataQuery();
	const { mutate: getUserQuery, isLoading: loading6, isSuccess} = useGetUserQuery();

	const { data: userList, isLoading: isLoading3 } = useUserQuery();
  	const {mutate: fetchserNameMutation, isLoading} = useUpdateUserNameMutation()
	const { id } = useParams();
	const updateUserList =  userList?.users.filter((item) => item._id != id)

	
	// GET PROJECTS LIST API
	const fetchProjects = async () => {
		const res = await getProjectsApi(id);
    if(res){
      setProjects(res);
      setTimeout(() => {
        // setIsLoading(false);
      }, 2000);
    }else {
    //   setIsLoading(false);
    }
	}
	useEffect(() => {
		getUserQuery(id);
		fetchProjects();
	}, [id])

	useEffect(() => {
			if(userDetails?.category){
				const payload = {
					category: userDetails?.category,
					subCategory: userDetails?.subCategory
				}
				Object.keys(payload).forEach(key => {
					if(!payload[key])
					  delete payload[key]
				  });
				fetchserNameMutation(payload);
			}
		
	}, [userDetails?.category, id])
	

	return (
		<div className="profile-details-container">
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={5} md={5} lg={5} xxl={5} xl={5}>
					<div className="side-bar-details profile-first-section">
						<div className="img-holder">
							<img src={userDetails?.thumbnails?.find((thumbnail) => thumbnail.dp)?.url || defaultThumbnail} alt="profile-pic" />
						</div>
						<div className="meta-details-container">
							<div className="meta-details">
								<div className="title">
									<CheckCircleFilled style={{ color: 'green' }} /> <span>{userDetails?.userName}</span>
								</div>
								<div className="designation">
									<span>{userDetails?.subCategory}</span>
								</div>

								<div className="bottom-info">
									<div className="info-container">
										<div className="location-label">
											<span>{userDetails?.city}</span>
										</div>
										<div className="location-name">
											<span>{userDetails?.state}</span>
										</div>
									</div>
									{/* <div className="info-container">
										<div className="profile-visit-label">
											<span>Profile Vists</span>
										</div>
										<div className="profile-visit-count">
											50
										</div>
	</div> */}
								</div>
							</div>
						</div>
					</div>
				</Col>
				<Col xs={24} sm={13} md={13} lg={13} xxl={13} xl={13}>
				<div className="full-details-container profile-second-section">
					<div className="full-details-header">
						<div className={`cursor-pointer ${activeTab === 1 ? 'tab-active-color' : ''}`} onClick={() => setActiveTab(1)}>
							About
						</div>
						<div className="vertical-line">
						</div>
						<div className={`cursor-pointer ${activeTab === 2 ? 'tab-active-color' : ''}`} onClick={() => setActiveTab(2)}>
							Links
						</div>
						<div className="vertical-line">
						</div>
						<div className={`cursor-pointer ${activeTab === 3 ? 'tab-active-color' : ''}`} onClick={() => setActiveTab(3)}>
							Portfolio
						</div>
					</div>
					<div className="full-details">
						{renderTabData(activeTab, userDetails, projects)}
					</div>
				</div>
			</Col>

				<Col xs={24} sm={6} md={6} lg={6} xxl={6} xl={6}>
				<Spin spinning={isLoading || isLoading3}>
				<div className='profile-thrid-section'>
					<List
					itemLayout="horizontal"
					dataSource={updateUserList || []}
					renderItem={(item) => (
					<List.Item>
						<List.Item.Meta
						avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
						title={<Link to={`/profile/${item?._id}`}>{item?.fullName}</Link>}
						description={item?.category}
						/>
					</List.Item>
					)}
				/>
				</div>
				</Spin>
				</Col>
			</Row>
		</div>
	)
}

export default ProfileDetails