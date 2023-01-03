import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  Upload,
  message,
  Col,
  Row,
  Spin,
  Alert,
  Select,
  InputNumber
} from 'antd';
import './Registration.less';
import { useHistory } from 'react-router';
import { createUserApi } from '../../api/user';
import FileUploaderWithImageCropper from '../../common/FileUploaderWithImageCropper';
import { checkFieldType, passwordValidator, emailValidator, onChangeInput } from '../../common/utils';
import { UploadOutlined } from '@ant-design/icons';
import FormInput from '../../common/inputs/FormInput';
import FormSelect from '../../common/inputs/FormSelect';
import { genderOptions } from '../../constant/common';
import { Link } from 'react-router-dom';
import { getCategoryApi } from '../../api/getCategories';
import { useGetCountriesMutation, useGetCountriesQuery } from '../../api/getCountries';
const { Option } = Select;

const handleEmailValidation = (e, formDataErrors, setFormDataErrors) => {
  const {name, value} = e.target;
  const errMsg = emailValidator(value)
  if (errMsg) return setFormDataErrors({...formDataErrors, [name]: errMsg})
  setFormDataErrors({...formDataErrors, [name]: ''})
}

const handleMobileValidation = (e, formDataErrors, setFormDataErrors) => {
  const {name, value} = e.target;
  const errMsg = "Mobile number is not valid."
  if (value.length < 10 || value < 0) return setFormDataErrors({...formDataErrors, [name]: errMsg})
  setFormDataErrors({...formDataErrors, [name]: ''})
}

const handlePasswordValidation = (e, formDataErrors, setFormDataErrors) => {
  const {name, value} = e.target;
  const errMsg = passwordValidator(value)
  if (errMsg) return setFormDataErrors({...formDataErrors, [name]: errMsg})
  setFormDataErrors({...formDataErrors, [name]: ''})
}

const isPasswordConfirmed = (formData, formDataErrors, setFormDataErrors) => {
  const errMsg = "password is not confirmed yet"
  if(formData.password && formData.confirmPassword && formData.password === formData.confirmPassword) {
    return setFormDataErrors({...formDataErrors, 'confirmPassword': ''})
  }
  setFormDataErrors({...formDataErrors, 'confirmPassword': errMsg})
}

const RegistrationStep1 = (props) => {
  const history = useHistory();
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({})
  const [formDataErrors, setFormDataErrors] = useState({})
  const [image, setImage] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectCountry, setSelectCountry] = useState('+91');

  const {data: countriesList } = useGetCountriesQuery();
  const {mutate: getCountriesMutation } = useGetCountriesMutation();

  const handleSubmit = async () => {
    setIsLoading(true);
    const { mobileNumber, fullName, password, category, subCategory, gender } = formData;
    if(!mobileNumber || !fullName || !password || !category || !subCategory || !gender || !selectCountry) {
      setIsLoading(false);
      setErrorMsg('Please fill in mandatory fields.');
      return 
    }

    // if(confirmPassword !== password) return message.error('Please confirm the password.');
    // if(!Object.values(formDataErrors).every(val => val === '')) return
    // props.setStep(2);
    // var fd = new FormData();
    // fd.append('imgUploader', file);
    // const payload = {
    //   userName: formData.userName,
    //   mobile: formData.mobile,
    //   password: formData.password,
    //   email: formData.email
    // }
    const payload = {
      ...formData, mobileNumber: selectCountry+formData.mobileNumber
    }
    const loginResponse = await createUserApi(payload);
    if(loginResponse){
      history.push('/signin')
      setIsLoading(false);
      setErrorMsg();
    }else {
      setIsLoading(false);
      setErrorMsg();
    }
    // setImage(loginResponse);
    // return null;
  };

  const checkImageType = (type) => {
    const validImageTypes = ['gif', 'image/jpeg', 'image/png', 'image/jpg'];
    return checkFieldType(type, validImageTypes)
  }

  const uploadThumbnail = useCallback((files) => {
    setIsLoading(true);
   
    if (files) {
      const { type, name } = files.file.originFileObj;
      setIsLoading(false);
      if(!checkImageType(type)) {
        return alert('wrong file format');
      }
      setFile(files.file.originFileObj)
    }
  }, []);


  const onChange = (e) => {
    onChangeInput(e, formData, setFormData);
  }

  useEffect(() => {
    getCategoryApi().then((data) => {
      setCategories(data);
    })
    getCountriesMutation();
  }, [])

  return (
    <div 
      className="form-container"
    >
    <Spin spinning={isLoading}>
    <h1>Register</h1>
    {
      errorMsg && 
      <Alert
        message={errorMsg}
        showIcon
        type="error"
        closable
        onClose={() => setErrorMsg('')}
      />
    }
    <FormInput 
      type="text"
      name="fullName"
      label="Full Name"
      value={formData.fullName}
      onChange={onChange}
      required
    />
    <FormSelect
          name="gender"
          label="Gender"
          value={formData.gender}
          onSelect={(cat, val) => {
            setFormData({...formData, gender: val.children})
          }}
          options={genderOptions}
          showSearch
          required
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
          validationError={formDataErrors.states}
          width={"100%"}
        />
    <Row gutter={[4,12]}>
      
      <Col span={12}>
      {/*  <FormInput
					type="date"
					name="dateOfBirth"
					label="Date of birth"
					value={formData.dateOfBirth}
					onChange={onChange}
					validationError={formDataErrors.dateOfBirth}
					required
				// disabled
  /> */}
  <FormSelect
          name="category"
          label="Category"
          value={formData.category}
          onSelect={(cat, val) => {
            const getSubCategories = categories.filter((item) => item._id === val.id)
            setSubCategoriesList(getSubCategories[0].childern);
            setFormData({...formData, category: val.children, subCategory: ''})
          }}
          options={categories}
          showSearch
          required
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
          validationError={formDataErrors.states}
          width={"100%"}
        />
      </Col>
      <Col span={12}>
        <FormSelect
          name="subCategory"
          label="Sub Category"
          value={formData.subCategory}
          onSelect={(cat, val) => {
            setFormData({...formData, subCategory: val.children})
          }}
          options={subCategoriesList}
          showSearch
          required
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
          validationError={formDataErrors.states}
          width={"100%"}
        />
      </Col>
    </Row>
    <div className="label-container">
				<span className="required">
					*
				</span>
				<span className="label">
        Mobile Number
				</span>
			</div>

      <Input.Group compact>
        <Select value={selectCountry} onChange={(e) => setSelectCountry(e)}>
          {
            countriesList?.data?.map((item, idx) => {
             return <Option key={idx} value={`+${item?.calling_codes[0]}`}>{`${item?.emoji} +${item?.calling_codes[0]}`}</Option>
              
            })
          }
        </Select>
        <InputNumber 
          type="text"
          name="mobileNumber"
          label="Mobile Number"
          value={formData.mobileNumber}
          onChange={(val) => {
            setFormData({...formData, mobileNumber: val})
          }}
          validationError={formDataErrors.mobileNumber}
          required
          width={"100%"}
        />
      </Input.Group>

   
    {/* <FormInput 
      type="text"
      name="email"
      label="Your email"
      value={formData.email}
      onChange={onChange}
      onKeyUp={(e) => 
        handleEmailValidation(e, formDataErrors, setFormDataErrors)
      }
      validationError={formDataErrors.email}
      // disabled
    /> */}
    <FormInput 
      type="password"
      name="password"
      label="Password"
      value={formData.password}
      onChange={onChange}
      onKeyUp={(e) => 
        handlePasswordValidation(e, formDataErrors, setFormDataErrors)
      }
      validationError={formDataErrors.password}
      required
    />
    {/* <FormInput 
      type="password"
      name="confirmPassword"
      label="please verify password"
      value={formData.confirmPassword}
      onChange={onChange}
      onKeyUp={() => 
        isPasswordConfirmed(formData, formDataErrors, setFormDataErrors)
      }
      validationError={formDataErrors.confirmPassword}
      required
    /> */}
      <Form.Item className='register-button'> 
        <Button type="primary" htmlType="submit" size="large" onClick={handleSubmit} block>
          Register
        </Button>
      </Form.Item>
        <Link to="/signin" className='signIn-link'>
          Sign in
      </Link>
    </Spin>
    </div>
  );
};

export default RegistrationStep1;
