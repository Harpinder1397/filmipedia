import React, { useState, useEffect, useContext } from "react";
import "react-calendar/dist/Calendar.css";
import SubCategoryComponent from "../sub-categories/SubCategories";
import CommonList from "../../common/CommonList";
import banner from "../../assets/images/banner.png";
import JobCard from "../../pages/jobs/card";
import FilterMenu from "./FilterMenu";
import { Spin, Collapse } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import EmptyMessage from "../../common/emptyMessage/EmptyMessage";
import CommonPagination from "../../common/pagination/CommonPagination";
import {
  languageFilter,
  skinColors,
  hairColors,
  eyeColors,
  extraTalent,
  genderFilter,
  languageOptions,
  experienceFilter,
  budgetFilter,
  bestInOptions,
  availableOptions,
} from "../../constant/common";

import { FiltersContext } from "../../App";
import { useGetCountriesMutation, useGetCountriesQuery } from "../../api/getCountries";
import { useLocation } from "react-router-dom";
import qs from "query-string";

const { Panel } = Collapse;

const CommonJobList = (props) => {
  const { jobList, isFav, loading, userId,jobApplicationsList, allJobApplicationsList, handleShareDetails , handleUpdate, handleDelete , JobApplicationsLength, fetchJobList } = props;

  const {
    jobFormData,
    setJobFormData,
    categories,
  } = useContext(FiltersContext);
  const location = useLocation(); // React Hook
  const jobFormDataQuery = qs.parse(location?.search)
  const jobsLocation = location.pathname.includes('jobs')


  console.log(jobFormData, 'jobFormData jobFormData')

  const [isloading, setIsloading] = useState(false);
  const {data: countriesList } = useGetCountriesQuery();
  const {mutate: getCountriesMutation } = useGetCountriesMutation();

  useEffect(() => {
    const payload = {
      userId: userId,
      ...jobFormData
    };
    // const payload = jobFormData;
    Object.keys(payload).forEach((key) => {
      if (!payload[key]) delete payload[key];
    });
    fetchJobList(payload);
  }, [jobFormData]);

  useEffect(() => {
    getCountriesMutation()
  }, []);

  const renderLeftSideFilter = () => {
    return (
      <>
      <Collapse defaultActiveKey={[""]}>
      {jobFormDataQuery?.category ? <div className="active-filters"> <div className='show-text-value'>{`${jobFormDataQuery?.category || ''} ${jobFormDataQuery?.subCategory || ''}`}</div><CloseCircleOutlined onClick={() => {
        setJobFormData({...jobFormDataQuery, category: null, subCategory: null});
        }} className="close-icon" /></div> : ''}
        <Panel header="Category" key="1">
        <SubCategoryComponent
        title="Category"
        name="category"
        options={categories}
        formData={jobFormDataQuery}
        setFormData={setJobFormData}
        jobsLocation={jobsLocation}
      />
        </Panel>
      </Collapse>

        <Collapse defaultActiveKey={[""]}>
        {jobFormDataQuery?.city || jobFormDataQuery?.state || jobFormDataQuery?.country ? <div className="active-filters"> <div className='show-text-value'>{`${jobFormDataQuery?.country || ''}${jobFormDataQuery?.state || ''}${jobFormDataQuery?.city && jobFormDataQuery?.city || '' }`}</div><CloseCircleOutlined onClick={() => {
          setJobFormData({...jobFormDataQuery, country: null, state: null,  city: null});
          }} className="close-icon" /></div> : ''}
          <Panel header="Location" key="1">
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
          formData={jobFormDataQuery}
          setFormData={setJobFormData}
        />
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey={[""]}>
        {jobFormDataQuery.budgetMinimum && <div className="active-filters"> <div className='show-text-value'>{jobFormDataQuery?.budgetMinimum && `${jobFormDataQuery?.budgetMinimum || '' } - ${jobFormDataQuery?.budgetMaximum || ''}`}</div><CloseCircleOutlined onClick={() => {
          setJobFormData({...jobFormDataQuery, budgetMinimum: null, budgetMaximum: null});
          }} className="close-icon" /></div>}
          <Panel header="Budget" key="2">
          <SubCategoryComponent
          title="Budget"
          name="budget"
          options={
            budgetFilter &&
            budgetFilter?.map((item, idx) => {
              return {
                key: item?.value,
                value: item?.value 
              };
            })
          }
          formData={jobFormDataQuery}
          setFormData={setJobFormData}
        />
          </Panel>
        </Collapse>
      </>
    );
  };

//   const renderFilterComponent = (key) => {
//     switch (key) {
//       case "location":
//         return (
//           <SubCategoryComponent
//             title="Location"
//             name="location"
//             options={
//               countriesList &&
//               countriesList?.map((item, idx) => {
//                 const list = `${item?.emoji} ${item?.value}`
//                 return {
//                   _id: idx,
//                   id: idx,
//                   key: idx,
//                   code: item?.phone_code,
//                   value: item?.country_name 
//                 };
//               })
//             }
//             jobFormData={jobFormData}
//             setJobFormData={setJobFormData}
//           />
//         );
//       case "budget":
//         return (
//           <SubCategoryComponent
//             title="Budget"
//             name="budget"
//             options={ageFilter}
//             jobFormData={jobFormData}
//             setJobFormData={setJobFormData}
//           />
//         );
//       default:
//         return null;
//     }
//   };
  const renderConditionFilter = () => {
    return renderLeftSideFilter();
    {/*return filters?.length
      ? filters.map((item, idx) => {
          return (
            <>
              <Collapse defaultActiveKey={[""]}>
              <div className="active-filters">{jobFormData['experienceMinimum']} <CloseCircleOutlined onClick={() => {
                setJobFormData({...jobFormData, ageMinimum: '', ageMaximum: ''})
              }} className="close-icon" /></div>

                <Panel header={item.value} key={idx}>
                  {renderLeftSideFilter()}
                </Panel>

              </Collapse>
            </>
          );
        })
    : */}
  };

  return (
    <div className="list-con">
      <div className="left-side-bar">{renderConditionFilter()}</div>

      <div className="database-right-side-section">
        <FilterMenu
          renderLeftSideFilter={renderConditionFilter}
          setIsloading={setIsloading}
        />
        <div className="database-container">
            {jobList?.data?.length ? <JobCard
                userId={userId}
                data={jobList?.data}
                jobApplicationsList={jobApplicationsList}
                allJobApplicationsList={allJobApplicationsList}
                handleShareDetails={handleShareDetails}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                JobApplicationsLength={JobApplicationsLength}
            /> : (
            <EmptyMessage />
            )}
        </div>

        <div className="banner-container">
          <img src={banner} alt="ad" width={"100%"} />
        </div>
      </div>
    </div>
  );
};

export default CommonJobList;
