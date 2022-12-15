import { Row, Col, Button, Form, Input, Select, InputNumber } from "antd";
import FormInput from "../../../common/inputs/FormInput";
import FormSelect from "../../../common/inputs/FormSelect";
import { bestInOptions, genderOptions, languageOptions } from "../../../constant/common";
import { FiltersContext } from "../../../App";
import {
  eyeColors,
  hairColors,
  skinColors,
} from "../../../constant/artistsFeatures";
import { mapStates, mapCities } from "../../../common/utils";
import { useState, useContext, useEffect } from "react";
import "./basicInfoStyle.less";
import { useStateQuery } from "../../../api/getStatesQuery";
import { useGetCountriesQuery, useGetCountriesMutation } from "../../../api/getCountries";

const BasicInfo = ({
  userDetails,
  onChangeRestOptions,
  onChangeRestNumberOptions,
  setUserDetails,
  updateBasicDetails,
}) => {
  const [location, setLocation] = useState(undefined);
  const [selectedState, setSelectedState] = useState(null);
  const [cities, setCities] = useState([]);
  const { categories, setSubCategories, selectedSubCategories } =
    useContext(FiltersContext);
  console.log(selectedState, "selectedState");
  const { data } = useStateQuery();

  const {data: countriesList } = useGetCountriesQuery();
  const {mutate: getCountriesMutation } = useGetCountriesMutation();
  
  console.log(countriesList, 'countriesLists')

  useEffect(() => {
    const states = mapStates(data);
    setLocation(states);
    getCountriesMutation();
  }, [data]);

  useEffect(() => {
    if (selectedState) {
      const cities = mapCities(data, selectedState);
      setCities(cities);
    }
  }, [selectedState]);

  // const getUniqueListBy = (arr, key) => {
  //   return [...new Map(arr?.map(item => [item[key], item])).values()]
  // }

  // const cities = getUniqueListBy(data, 'state').sort((a, b) => a.state.localeCompare(b.state)).map(data =>(
  //   {...data, 'value': data.state }
  // ));

  return (
    <Row gutter={[12, 12]} className="basic-info-ant-row">
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
        <FormInput
          type="text"
          name="fullName"
          label="Full name"
          value={userDetails?.rest?.fullName}
          onChange={onChangeRestOptions}
          required
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
        <FormSelect
          name="category"
          label="you are"
          value={userDetails?.rest?.category}
          onSelect={(id, val) => {
            console.log(id, val, "aaaaaaaa");
            setSubCategories(val.id);
            const data = {
              ...userDetails,
              rest: { ...userDetails.rest, category: val.value },
            };
            setUserDetails(data);
          }}
          options={categories}
          required
          showSearch
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
        <FormSelect
          name="subCategory"
          label="sub-category"
          value={userDetails?.rest?.subCategory}
          onSelect={(cat, val) => {
            const data = {
              ...userDetails,
              rest: { ...userDetails.rest, subCategory: val.value },
            };
            setUserDetails(data);
          }}
          options={selectedSubCategories}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
        <FormSelect
          name="tags"
          label="Tags"
          value={userDetails?.rest?.tags}
          onSelect={(cat, val) => {
            const data = {
              ...userDetails,
              rest: {
                ...userDetails.rest,
                tags: userDetails?.rest?.tags?.length
                  ? [...userDetails.rest.tags, val.value]
                  : [val.value],
              },
            };
            setUserDetails(data);
          }}
          onDeselect={(val) => {
            const tags = userDetails.rest.tags.filter((item) => item !== val);
            setUserDetails({
              ...userDetails,
              rest: { ...userDetails.rest, tags: tags },
            });
          }}
          options={[
            { id: 1, value: "English" },
            { id: 2, value: "Hindi" },
          ]}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.languages}
          width={"100%"}
          mode="multiple"
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
        <FormSelect
          name="bestIn"
          label="Best in"
          value={userDetails?.rest?.bestIn}
          onSelect={(cat, val) => {
            const data = {
              ...userDetails,
              rest: {
                ...userDetails.rest,
                bestIn: userDetails?.rest?.bestIn?.length
                  ? [...userDetails.rest.bestIn, val.value]
                  : [val.value],
              },
            };
            setUserDetails(data);
          }}
          onDeselect={(val) => {
            const bestIn = userDetails.rest.bestIn.filter(
              (item) => item !== val
            );
            setUserDetails({
              ...userDetails,
              rest: { ...userDetails.rest, bestIn: bestIn },
            });
          }}
          options={bestInOptions}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.languages}
          width={"100%"}
          mode="multiple"
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
        <FormSelect
          name="gender"
          label="Gender"
          value={userDetails?.rest?.gender}
          onSelect={(cat, val) => {
            setUserDetails({
              ...userDetails,
              rest: { ...userDetails.rest, gender: val.value },
            });
          }}
          options={genderOptions}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.states}
          width={"100%"}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
        <FormInput
          type="date"
          name="dateOfBirth"
          label="Date of birth"
          value={userDetails?.rest?.dateOfBirth}
          onChange={onChangeRestOptions}
          // validationError={formDataErrors.dateOfBirth}
          required
          // disabled
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
        <FormInput
          type="num"
          name="userName"
          label="Mobile Number"
          value={userDetails?.rest?.mobileNumber}
          onChange={onChangeRestNumberOptions}
          // validationError={formDataErrors.userName}
          required
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
        {/* <FormSelect
            name="languages"
            label="change your language"
            value={userDetails?.languages}
            // onSelect={(cat, val) => {
            //   const updatedData = {...userDetails, rest: {...userDetails.rest, languages: [...userDetails.languages, val.children]}}
            //   setUserDetails(updatedData);
            // }}
            onSelect={(id, val) => {
							// setSubCategories(id);
              const data = {...userDetails, rest: {...userDetails.rest, languages: [...userDetails.languages, val.value]}}
							setUserDetails(data)
						}}
            options={
              [
                {id: 1, value: 'English'},	{id: 2, value: 'Hindi'}
              ]
            }
            showSearch
            required
            mode="multiple"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
            // validationError={formDataErrors.states}
            width={"100%"}
          /> */}
        <FormSelect
          name="languages"
          label="change your language"
          value={userDetails?.rest?.languages}
          onSelect={(cat, val) => {
            console.log("language", val, cat);
            const data = {
              ...userDetails,
              rest: {
                ...userDetails.rest,
                languages: userDetails?.rest?.languages?.length
                  ? [...userDetails.rest.languages, val.value]
                  : [val.value],
              },
            };
            setUserDetails(data);
          }}
          onDeselect={(val) => {
            const languages = userDetails.rest.languages.filter(
              (item) => item !== val
            );
            setUserDetails({
              ...userDetails,
              rest: { ...userDetails.rest, languages: languages },
            });
          }}
          options={languageOptions}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.languages}
          width={"100%"}
          mode="multiple"
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
        <FormInput
          type="number"
          name="experience"
          label="Experience"
          value={userDetails?.rest?.experience}
          onChange={onChangeRestOptions}
          // validationError={formDataErrors.experience}
          required
          // disabled
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
      <FormSelect
        name="country"
        label="Select Your Country"
        value={userDetails?.rest?.country}
        onSelect={(cat, val) => {
          setSelectedState(val.value);
          const data = {
            ...userDetails,
            rest: { ...userDetails.rest, country: val.value},
          };
          setUserDetails(data);
        }}
        options={
          countriesList &&
          countriesList.map((item, idx) => {
            return {
              id: idx,
              value: item?.country_name,
            };
          })
        }
        showSearch
        required
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        // validationError={formDataErrors.states}
        width={"100%"}
      />
    </Col>
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
        <FormSelect
          name="state"
          label="Select your state"
          value={userDetails?.rest?.state}
          onSelect={(cat, val) => {
            setSelectedState(val.value);
            const data = {
              ...userDetails,
              rest: { ...userDetails.rest, state: val.value, city: "" },
            };
            setUserDetails(data);
          }}
          options={
            location &&
            Object.keys(location).map((item, idx) => {
              return {
                id: idx,
                value: item,
              };
            })
          }
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.states}
          width={"100%"}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
        <FormSelect
          name="cities"
          label="Select your city"
          value={userDetails?.rest?.city}
          onSelect={(cat, val) => {
            const data = {
              ...userDetails,
              rest: { ...userDetails.rest, city: val.value },
            };
            setUserDetails(data);
          }}
          options={cities}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.city}
          width={"100%"}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
        <FormInput
          type="textarea"
          name="bio"
          label="Bio"
          value={userDetails?.rest?.bio}
          onChange={onChangeRestOptions}
          // validationError={formDataErrors.bio}
          // disabled
        />
      </Col>
      {userDetails?.rest?.category === "Cast" ? (
        <>
          <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
            <FormInput
              type="number"
              name="height"
              label="Height (in cm)"
              value={userDetails?.rest?.height}
              onChange={onChangeRestOptions}
              // validationError={formDataErrors.experience}
              required
              // disabled
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
            <FormInput
              type="number"
              name="weight"
              label="Weight (in kg)"
              value={userDetails?.rest?.weight}
              onChange={onChangeRestOptions}
              // validationError={formDataErrors.experience}
              required
              // disabled
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
            <FormInput
              type="number"
              name="budget"
              label="Budget (per day)"
              value={userDetails?.rest?.budget}
              onChange={onChangeRestOptions}
              // validationError={formDataErrors.experience}
              required
              // disabled
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
            <FormSelect
              name="eyes"
              label="Eyes color"
              value={userDetails?.rest?.eyes}
              onSelect={(cat, val) => {
                const data = {
                  ...userDetails,
                  rest: { ...userDetails.rest, eyes: val.value },
                };
                setUserDetails(data);
              }}
              // onSelect={(cat, val) => {
              //   // console.log('language', val, cat)
              //   setFormData({...formData, eyes: val.children})
              // }}
              options={eyeColors}
              showSearch
              required
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // validationError={formDataErrors.eyes}
              width={"100%"}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
            <FormSelect
              name="skin"
              label="Skin color"
              value={userDetails?.rest?.skin}
              onSelect={(cat, val) => {
                const data = {
                  ...userDetails,
                  rest: { ...userDetails.rest, skin: val.value },
                };
                setUserDetails(data);
              }}
              // onSelect={(cat, val) => {
              // 	setFormData({...formData, skin: val.children})
              // }}
              options={skinColors}
              showSearch
              required
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // validationError={formDataErrors.skin}
              width={"100%"}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xxl={6} xl={6}>
            <FormSelect
              name="hair"
              label="Hair color"
              value={userDetails?.rest?.hair}
              // onSelect={(cat, val) => {
              // 	setFormData({...formData, hair: val.children})
              // }}
              onSelect={(cat, val) => {
                const data = {
                  ...userDetails,
                  rest: { ...userDetails.rest, hair: val.value },
                };
                setUserDetails(data);
              }}
              options={hairColors}
              showSearch
              required
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // validationError={formDataErrors.hair}
              width={"100%"}
            />
          </Col>
        </>
      ) : null}
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xxl={24}
        xl={24}
        className="submit-button-container"
      >
        <Button className="submit-save-btn" onClick={updateBasicDetails}>
          Save
        </Button>
      </Col>
    </Row>
  );
};

export default BasicInfo;
