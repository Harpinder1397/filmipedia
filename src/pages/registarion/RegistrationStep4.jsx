import React, { useState } from 'react';
import {
	Button,
	Col,
	Row,
} from 'antd';
import './Registration.less';
import { onChangeInput } from '../../common/utils';
import FormInput from '../../common/inputs/FormInput';
import FormSelect from '../../common/inputs/FormSelect';
import { updateUserApi } from '../../api/user';
import { eyeColors, hairColors, skinColors } from '../../constant/artistsFeatures';
import { useHistory } from 'react-router';

const RegistrationStep4 = (props) => {
	const user = localStorage.getItem('user');
  const history = useHistory();

	const [formData, setFormData] = useState({});
  const [formDataErrors, setFormDataErrors] = useState({});

	const handleSubmit = async () => {
		const payload = {
			...formData,
		}
		await updateUserApi(user, payload);
	};

	const onChange = (e) => {
		onChangeInput(e, formData, setFormData)
	}

	return (
		<div
			className="form-container"
		>
			<h1>Registration</h1>
			<h3>Step 4/4</h3>
			<Row gutter={[4,12]}>
				<Col span={12}>
          <FormInput
              type="text"
              name="height"
              label="height (in cm)"
              value={formData.height}
              onChange={onChange}
              validationError={formDataErrors.height}
              required
              // disabled
          />
				</Col>
				<Col span={12}>
          <FormInput
              type="text"
              name="weight"
              label="Weight (in kg)"
              value={formData.weight}
              onChange={onChange}
              validationError={formDataErrors.weight}
              required
              // disabled
            />
				</Col>
			</Row>

			<Row gutter={[4,12]}>
				<Col span={12}>
          <FormInput
            type="text"
            name="budget"
            label="Budget (per day)"
            value={formData.budget}
            onChange={onChange}
            validationError={formDataErrors.budget}
            required
            // disabled
          />
				</Col>
				<Col span={12}>
          <FormSelect
            name="eyes"
            label="Eyes color"
            value={formData.eyes}
            onSelect={(cat, val) => {
              // console.log('language', val, cat)
              setFormData({...formData, eyes: val.children})
            }}
            options={eyeColors}
            showSearch
            required
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
            validationError={formDataErrors.eyes}
            width={"100%"}
          />
				</Col>
			</Row>
			<Row gutter={[4,12]}>
				<Col span={12}>
					<FormSelect
						name="skin"
						label="Skin color"
						value={formData.skin}
						onSelect={(cat, val) => {
							setFormData({...formData, skin: val.children})
						}}
						options={skinColors}
						showSearch
						required
						filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
						validationError={formDataErrors.skin}
						width={"100%"}
					/>
				</Col>
				<Col span={12}>
					<FormSelect
						name="hair"
						label="Hair color"
						value={formData.hair}
						onSelect={(cat, val) => {
							setFormData({...formData, hair: val.children})
						}}
						options={hairColors}
						showSearch
						required
						filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
						validationError={formDataErrors.hair}
						width={"100%"}
					/>
				</Col>
			</Row>
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

export default RegistrationStep4;
