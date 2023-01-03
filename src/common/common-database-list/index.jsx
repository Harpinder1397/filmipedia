import React, { useState, useEffect, useContext } from "react";
import qs from "query-string";
import "react-calendar/dist/Calendar.css";
import SubCategoryComponent from "../sub-categories/SubCategories";
import CommonList from "../../common/CommonList";
import banner from "../../assets/images/banner.png";
import { useUpdateUserNameMutation, useUserQuery } from "../../api/user";
import FilterMenu from "./FilterMenu";
import { Spin, Collapse } from "antd";
import CommonPagination from "../../common/pagination/CommonPagination";
import {
  languageFilter,
  skinColors,
  hairColors,
  eyeColors,
  genderFilter,
  experienceFilter,
  ageFilter,
  budgetFilter,
  availableOptions,
} from "../../constant/common";

import { FiltersContext } from "../../App";
import { useGetCountriesMutation, useGetCountriesQuery } from "../../api/getCountries";
import { CloseCircleOutlined } from "@ant-design/icons";
import CommonScroll from "./CommonScroll";
import InfiniteScrollCard from "./InfiniteScrollCard";
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router';
const { Panel } = Collapse;

const CommonDataBaseList = ({isFav, loading }) => {
  const [isloading, setIsloading] = useState(false);
  
  const location = useLocation(); // React Hook
  const history = useHistory();
  const paramQuery = qs.parse(location?.search)
  const { filters, formData, categories, extraTalent, bestIn, setFormData, fetchCategories, categoryId, setSubCategories } = useContext(FiltersContext);
  const formData1 = qs.parse(location?.search)
  const { data: allUsers } = useUserQuery();
  const { mutate: userNameMutation, isLoading } = useUpdateUserNameMutation();
  const {data: countriesList } = useGetCountriesQuery();
  const {mutate: getCountriesMutation } = useGetCountriesMutation();


  const onShowSizeChange = (page, limit) => {
    const payload = {
      ...formData,
      page: page,
      limit: limit
    };
    Object.keys(payload).forEach((key) => {
      if (!payload[key]) delete payload[key];
    });
    setFormData(payload)
    userNameMutation(payload);
  };

  useEffect(() => {
    const payload = formData;
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) delete formData[key];
    });
    userNameMutation(payload);
  }, [formData]);

  useEffect(() => {
    getCountriesMutation()
    const payload = paramQuery;
    Object.keys(paramQuery).forEach((key) => {
      if (!paramQuery[key]) delete paramQuery[key];
    });
    userNameMutation(payload);
    // history.replace({
    //   search: '',
    // })
    fetchCategories(categoryId);
  }, []);

  const renderLeftSideFilter = () => {
    return (
      <>
        <Collapse defaultActiveKey={[""]}>
       {formData?.experienceMinimum && <div className="active-filters"> <div className='show-text-value'>{renderShowValue('experience')}</div><CloseCircleOutlined onClick={() => {
          setFormData({...formData, experienceMinimum: '', experienceMaximum: ''})
        }} className="close-icon" /></div>}
          <Panel header="Experience" key="1">
            <SubCategoryComponent
              title="Experience"
              name="experience"
              options={experienceFilter}
              formData={formData1}
              setFormData={setFormData}
            />
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey={[""]}>
        {formData?.ageMinimum && <div className="active-filters"> <div className='show-text-value'>{renderShowValue('age')}</div><CloseCircleOutlined onClick={() => {
          setFormData({...formData, ageMinimum: '', ageMaximum: ''})
        }} className="close-icon" /></div>}
          <Panel header="Age" key="2">
            <SubCategoryComponent
              title="Age"
              name="age"
              options={ageFilter}
              formData={formData1}
              setFormData={setFormData}
            />
          </Panel>
        </Collapse>

        <Collapse defaultActiveKey={[""]}>
        {formData?.gender && <div className="active-filters"> <div className='show-text-value'>{renderShowValue('gender')}</div><CloseCircleOutlined onClick={() => {
          setFormData({...formData, gender: ''})
        }} className="close-icon" /></div> }
          <Panel header="Gender" key="3">
            <SubCategoryComponent
              title="Gender"
              name="gender"
              options={genderFilter}
              formData={formData1}
              setFormData={setFormData}
            />
          </Panel>
        </Collapse>
      </>
    );
  };

  const renderCategoryLeftSideFilter = () => {
    return (
      <>
        <Collapse defaultActiveKey={["1"]}>
        {formData1?.category && <div className="active-filters"> <div className='show-text-value'>{renderShowValue('category')}</div><CloseCircleOutlined onClick={() => {
          setFormData({...formData, category: '', subCategory: ''})
        }} className="close-icon" /></div> }
          <Panel header="Category" key="1">
          <SubCategoryComponent
            title="Category"
            name="category"
            options={categories}
            formData={formData1}
            setFormData={setFormData}
            setSubCategories={setSubCategories}
          />
          </Panel>
        </Collapse>
      </>
    );
  };

  const renderFilterComponent = (key) => {
    switch (key) {
      case "available":
        return (
          <SubCategoryComponent
            title="Available"
            name="available"
            value={formData?.available}
            formData={formData1}
            setFormData={setFormData}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({ ...formData, available: val.value });
            }}
            onClear={() => setFormData({ ...formData, available: "" })}
            options={availableOptions}
          />
        );
      case "experience":
        return (
          <SubCategoryComponent
            title="Experience"
            name="experience"
            options={experienceFilter}
            formData={formData1}
            setFormData={setFormData}
          />
        );
      case "location":
        return (
          <SubCategoryComponent
            title="Location"
            name="location"
            options={
              countriesList &&
              countriesList?.map((item, idx) => {
                const list = `${item?.emoji} ${item?.value}`
                return {
                  _id: idx,
                  id: idx,
                  key: idx,
                  code: item?.phone_code,
                  value: item?.country_name 
                };
              })
            }
            formData={formData1}
            setFormData={setFormData}
          />
        );
      case "gender":
        return (
          <SubCategoryComponent
            title="Gender"
            name="gender"
            options={genderFilter}
            formData={formData1}
            setFormData={setFormData}
          />
        );
      case "age":
        return (
          <SubCategoryComponent
            title="Age"
            name="age"
            options={ageFilter}
            formData={formData1}
            setFormData={setFormData}
          />
        );
      case "weight":
        return (
          <SubCategoryComponent
            title="Weight"
            name="weight"
            options={ageFilter}
            formData={formData1}
            setFormData={setFormData}
          />
        );
      case "height":
        return (
          <SubCategoryComponent
            title="Height"
            name="height"
            options={ageFilter}
            formData={formData1}
            setFormData={setFormData}
          />
        );
      case "budget":
        return (
          <SubCategoryComponent
            title="Budget"
            name="budget"
            options={budgetFilter}
            formData={formData1}
            setFormData={setFormData}
          />
        );
      case "language":
        return (
          <SubCategoryComponent
            title="Language"
            name="languages"
            options={languageFilter}
            formData={formData1}
            setFormData={setFormData}
          />
        );
      case "best-in":
        return (
          <SubCategoryComponent
            title="Best In"
            name="bestIn"
            value={formData?.bestIn}
            formData={formData1}
            setFormData={setFormData}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({ ...formData, bestIn: val.value });
            }}
            onClear={() => setFormData({ ...formData, bestIn: "" })}
            options={bestIn}
          />
        );
      case "extra-talent":
        return (
          <SubCategoryComponent
            title="Extra Talent"
            name="extraTalent"
            value={formData?.extraTalent}
            formData={formData1}
            setFormData={setFormData}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({ ...formData, extraTalent: val.value });
            }}
            onClear={() => setFormData({ ...formData, extraTalent: "" })}
            options={extraTalent}
          />
        );
      case "eye-color":
        return (
          <SubCategoryComponent
            title="Eye Color"
            name="eyeColor"
            value={formData?.eyeColor}
            formData={formData1}
            setFormData={setFormData}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({ ...formData, eyeColor: val.value });
            }}
            onClear={() => setFormData({ ...formData, eyeColor: "" })}
            options={eyeColors}
          />
        );
      case "hair-color":
        return (
          <SubCategoryComponent
            title="Hair Color"
            name="hairColor"
            value={formData?.hairColor}
            formData={formData1}
            setFormData={setFormData}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({ ...formData, hairColor: val.value });
            }}
            onClear={() => setFormData({ ...formData, hairColor: "" })}
            options={hairColors}
          />
        );
      case "skin-tone":
        return (
          <SubCategoryComponent
            title="Skin Tone"
            name="skinTone"
            value={formData?.skinTone}
            formData={formData1}
            setFormData={setFormData}
            onSelect={(cat, val) => {
              // console.log(val, cat, 'val')
              setFormData({ ...formData, skinTone: val.value });
            }}
            onClear={() => setFormData({ ...formData, skinTone: "" })}
            options={skinColors}
          />
        );
      default:
        return null;
    }
  };

  const renderShowValue = (key) => {
    switch (key) {
      case "available":
        return formData1.available || ''
      case "category":
        return formData1?.category && `${formData1?.category || ''} ${formData1?.subCategory || ''}`
      case "experience":
        return formData1?.experienceMinimum && `${formData1?.experienceMinimum || ''} - ${formData1?.experienceMaximum || ''}`
      case "location":
        return `${formData1?.country || ''}${formData1?.state || ''}${formData1?.city && formData1?.city || '' }`
      case "gender":
        return formData1.gender && formData1.gender.toString() || '' 
      case "age":
        return formData1?.ageMinimum && `${formData1?.ageMinimum || '' } - ${formData1?.ageMaximum || ''}`
      case "weight":
        return formData1?.weightMinimum && `${formData1?.weightMinimum || '' } - ${formData1?.weightMaximum || ''}`
      case "height":
        return formData1?.heightMinimum && `${formData1?.heightMinimum || '' } - ${formData1?.heightMaximum || ''}`
      case "budget":
        return formData1?.budgetMinimum && `${formData1?.budgetMinimum || '' } - ${formData1?.budgetMaximum || ''}`
      case "language":
        return formData1.languages && formData1.languages.toString() || '' 
      case "best-in":
        return formData1.bestIn || ''
      case "extra-talent":
        return formData1.extraTalent || '' 
      case "eye-color":
        return formData1.eyeColor || '' 
      case "hair-color":
        return formData1.hairColor || '' 
      case "skin-tone":
        return formData1.skinTone || '' 
      default:
        return null;
    }
  };

  const renderEmptyValue = (key) => {
    switch (key) {
      case "available":
        return setFormData({...formData, available: null});
      case "experience":
        return setFormData({...formData, experienceMinimum: null, experienceMaximum: null});
      case "location":
        return  setFormData({...formData, country: null, state: null,  city: null});
      case "gender":
        return setFormData({...formData, gender: []});
      case "age":
        return setFormData({...formData, ageMinimum: null, ageMaximum: null});
      case "weight":
        return  setFormData({...formData, weightMinimum: null, weightMaximum: null});
      case "height":
        return setFormData({...formData, heightMinimum: null, heightMaximum: null});
      case "budget":
        return setFormData({...formData, budgetMinimum: null, budgetMaximum: null});
      case "language":
        return setFormData({...formData, languages: []}); 
      case "best-in":
        return setFormData({...formData, bestIn: null});
      case "extra-talent":
        return setFormData({...formData, extraTalent: null}); 
      case "eye-color":
        return setFormData({...formData, eyeColor: null});
      case "hair-color":
        return setFormData({...formData, hairColor: null}); 
      case "skin-tone":
        return setFormData({...formData, skinTone: null}); 
      default:
        return null;
    }
  };

  const renderConditionFilter = () => {
    return filters?.length
      ? filters?.map((item, idx) => {
          return (
            <>
              <Collapse defaultActiveKey={[""]}>
             {renderShowValue(item.key) && <div className="active-filters"> <div className='show-text-value'>{renderShowValue(item.key)}</div><CloseCircleOutlined onClick={() => {
              renderEmptyValue(item.key);
              }} className="close-icon" /></div>}

                <Panel header={item.value} key={idx}>
                  {renderFilterComponent(item.key)}
                </Panel>

              </Collapse>
            </>
          );
        })
      : renderLeftSideFilter();
  };

  return (
    <div className="list-con">
      <div className="left-side-bar">
      {renderCategoryLeftSideFilter()}
      {renderConditionFilter()}
      </div>

      <div className="database-right-side-section">
        <FilterMenu
          renderLeftSideFilter={renderConditionFilter}
          setIsloading={setIsloading}
        />
        <div className="database-container">
        <CommonList
            users={allUsers?.users || allUsers}
            isFav={isFav}
            isLoading={isLoading || loading || isloading}
  />
  <div className="pagination-section">
    <CommonPagination
      pageSize={100}
      total={allUsers?.total}
      current={paramQuery?.page || 1}
      onShowSizeChange={onShowSizeChange}
    />

  </div>

          {/* <InfiniteScrollCard formData={formData1} userNameMutation={userNameMutation} />*/}
          {/* <CommonScroll allUsers={allUsers} userNameMutation={userNameMutation}  />*/}
        </div>

        <div className="banner-container">
          <img src={banner} alt="ad" width={"100%"} />
        </div>
      </div>
    </div>
  );
};

export default CommonDataBaseList;
