import React, { useState, useContext, useEffect } from 'react';
import {
	Button,
	Col,
	Row,
} from 'antd';
import './Registration.less';
import { useHistory } from 'react-router-dom';
import { onChangeInput, mapStates, mapCities } from '../../common/utils';
import FormInput from '../../common/inputs/FormInput';
import FormSelect from '../../common/inputs/FormSelect';
import { FiltersContext } from '../../App';
import { updateUserApi } from '../../api/user';

const RegistrationStep2 = (props) => {
	const user = localStorage.getItem('user');
	const { setStep } = props;

	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({});
	const [location, setLocation] = useState(undefined);
	const [selectedState, setSelectedState] = useState(null);
	const [cities, setCities] = useState([]);
	const [formDataErrors, setFormDataErrors] = useState({});

	const { categories, setSubCategories, selectedSubCategories, category, states } = useContext(FiltersContext)

	const handleSubmit = async () => {
		const payload = {
			...formData,
		}
		await updateUserApi(user, payload);
	};

	const onChange = (e) => {
		onChangeInput(e, formData, setFormData)
	}

	useEffect(() => {
		const data = mapStates(states)
		setLocation(data);
	},[states])

	useEffect(() => {
		if(selectedState) {
			const cities = mapCities(states, selectedState)
			setCities(cities);
		}
	},[selectedState])

	return (
		<div
			className="form-container"
		>
			<h1>Registration</h1>
			<h3>Step 2/4</h3>
			<Row gutter={[4,12]}>
				<Col span={12}>
					<FormSelect
						name="category"
						label="you are"
						value={formData.category}
						onSelect={(id, val) => {
							setSubCategories(id);
							setFormData({...formData, category: val.children, subCategory: null})
						}}
						options={categories}
						required
						showSearch
						filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
					/>
				</Col>
				<Col span={12}>
					<FormSelect
						name="subCategory"
						label="sub-category"
						value={formData.subCategory}
						onSelect={(cat, val) => setFormData({...formData, subCategory: val.children})}
						options={selectedSubCategories}
						showSearch
						required
						filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
					/>
				</Col>
			</Row>
			<FormSelect
				name="tags"
				label="Best in"
				value={formData.languages}
				onSelect={(cat, val) => {
					// console.log('language', val, cat)
					setFormData({...formData, languages: [val.children]})
				}}
				options={
					[
						{id: 1, value: 'english'},	{id: 2, value: 'hindi'}
					]
				}
				showSearch
				required
				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
				validationError={formDataErrors.languages}
				width={"100%"}
				mode="multiple"
			/>

			<Row gutter={[4,12]}>
				<Col span={12}>
					<FormInput
						type="number"
						name="experience"
						label="Experience"
						value={formData.experience}
						onChange={onChange}
						validationError={formDataErrors.experience}
						required
					// disabled
					/>
				</Col>
				<Col span={12}>
				<FormInput
					type="date"
					name="dateOfBirth"
					label="Date of birth"
					value={formData.dateOfBirth}
					onChange={onChange}
					validationError={formDataErrors.dateOfBirth}
					required
				// disabled
				/>
				</Col>
			</Row>
			<Row gutter={[4,12]}>
				<Col span={12}>
					<FormSelect
						name="states"
						label="Select your state"
						value={formData.states}
						onSelect={(cat, val) => {
							setSelectedState(val.children)
							setFormData({...formData, state: val.children, city: null})
						}}
						options={location && Object.keys(location).map((item, idx) => {
							return {
								id: idx,
								value: item
							}
						})}
						showSearch
						required
						filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
						validationError={formDataErrors.states}
						width={"100%"}
					/>
				</Col>
				<Col span={12}>
					<FormSelect
						name="cities"
						label="Select your city"
						value={formData.city}
						onSelect={(cat, val) => {
							setFormData({...formData, city: val.children})
						}}
						options={cities && cities}
						showSearch
						required
						filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
						validationError={formDataErrors.city}
						width={"100%"}
					/>
				</Col>
			</Row>
			<FormSelect
				name="languages"
				label="Select your language"
				value={formData.languages}
				onSelect={(cat, val) => {
					// console.log('language', val, cat)
					setFormData({...formData, languages: [val.children]})
				}}
				options={
					[
						{id: 1, value: 'english'},	{id: 2, value: 'hindi'}
					]
				}
				showSearch
				required
				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
				validationError={formDataErrors.languages}
				width={"100%"}
				mode="multiple"
			/>
			 
					<FormInput
						type="textarea"
						name="bio"
						label="Bio"
						value={formData.bio}
						onChange={onChange}	
						validationError={formDataErrors.bio}
					// disabled
					/>
			 
			<Row gutter={[4,12]}>
				<Col span={12}>
					<Button type="primary" htmlType="submit" size="large" onClick={() => history.push('/')} block >
						Skip
					</Button>
				</Col>
				<Col span={12}>
					<Button type="primary" htmlType="submit" size="large" onClick={handleSubmit} block>
						Next
					</Button>
				</Col>
			</Row>
		</div>
	);
};

export default RegistrationStep2;
