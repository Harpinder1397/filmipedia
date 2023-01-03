// import React, { useState } from 'react';
// import {
// 	Button,
// 	message,
// 	Row,
// 	Col,
// 	Typography
// } from 'antd';
// import './Registration.less';
// import { useHistory } from 'react-router-dom';
// import { onChangeInput } from '../../common/utils';
// import FormInput from '../../common/inputs/FormInput';
// import { DeleteOutlined } from '@ant-design/icons';
// import { updateUserApi, getUserApi, useGetUserDataQuery, useGetUserQuery } from '../../api/user';

// const RegistrationStep3 = (props) => {
// 	const user = localStorage.getItem('user');
// 	const { setStep } = props;
// 	const history = useHistory();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [formData, setFormData] = useState({})
// 	const [formDataErrors, setFormDataErrors] = useState({})
// 	const [projs, setProjects] = useState([])

// 	const { data: userInfo, isLoading: loading8} = useGetUserDataQuery();

// 	const handleSubmit = async () => {
// 		console.log('formData', formData);
// 		const projects = [...userInfo?.projects, {...formData}]
// 		const res = await updateUserApi(user, {projects});
// 		// if(res.message === 'record updated successfully') {
// 		// 	const data = await getUserApi(user); 
// 		// 	setProjects(user.projects)
// 		// }
// 		// setStep(4);
// 	};

// 	const fieldFiller = (e) => {
//     onChangeInput(e, formData, setFormData);
// 	}

// 	console.log(projs, 'projj');
// 	return (
// 		<div
// 			className="form-container"
// 		>
// 			<h1>Registration</h1>
// 			<h3>Step 3/4</h3>
// 			<Button onClick={() => {}}>add</Button>
// 			<Row>
// 				{/* {
// 					formF.map((item, idx) => (
// 						<>
// 							<div className="d-flex justify-content-between w-100 align-content-center">
// 								<h3> Project {item.id}</h3>
// 								{(formF.length > 1 && idx > 0) ?
// 									<DeleteOutlined 
// 										onClick={() => {}}
// 										style={{ color: 'red'}}
// 									/> : null
// 								}
// 							</div>
// 						</>
// 					))
// 				} */}
// 				<FormInput
// 					name={"projectName"}
// 					label={"Project Name"}
// 					value={formData.projectName}
// 					onChange={(e) => fieldFiller(e)}
// 				/>
// 				<FormInput
// 					name={"as"}
// 					label={"Project Done As"}
// 					value={formData.as}
// 					onChange={(e) => fieldFiller(e)}
// 				/>
// 				<FormInput
// 					name={"links"}
// 					label={"Links"}
// 					value={formData.links}
// 					onChange={(e) => fieldFiller(e)}
// 				/>
// 			</Row>
// 			<Row gutter={[4, 12]}>
// 				<Col span={12}>
// 					<Button type="primary" htmlType="submit" size="large" onClick={() => history.push('/')} block >
// 						Skip
// 					</Button>
// 				</Col>
// 				<Col span={12}>
// 					<Button type="primary" htmlType="submit" size="large" onClick={handleSubmit} block style={{ marginLeft: '10px' }} >
// 						Next
// 					</Button>
// 				</Col>
// 			</Row>
// 		</div>
// 	);
// };

// export default RegistrationStep3;
