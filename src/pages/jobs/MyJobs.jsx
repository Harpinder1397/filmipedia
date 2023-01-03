import React, { useState, useEffect } from "react";
import { Button, Input, Modal, InputNumber, Space, message, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import JobCard from "./card";
import { useCreateJobMutation, useDeleteJobMutation, useJobsQuery, useUpdateJobMutation, useUpdateJobsMutation } from "../../api/getJobs";
import { useCreateJobApplicationsMutation, useJobApplicationsQuery, useJobAllApplicationsMutation, useUpdateJobApplicationsMutation, useJobAllApplicationsQuery } from "../../api/getJobApplications";
import { useGetUserDataQuery, useGetUserQuery } from "../../api/user";
import FormInput from '../../common/inputs/FormInput';
import EmptyMessage from "../../common/emptyMessage/EmptyMessage";

// styles
import "./card/cardStyle.less";
import CommonPagination from "../../common/pagination/CommonPagination";
import FormSelect from "../../common/inputs/FormSelect";
import { mapCities, mapStates } from "../../common/utils";
import { useStateQuery } from "../../api/getStatesQuery";
import { useGetStateMutation } from "../../api/getState";
import { useGetCountriesMutation, useGetCountriesQuery } from "../../api/getCountries";
// import moment from "moment";

const MyJobs = () => {
  const userId = localStorage.getItem('user');
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add");
  const [location, setLocation] = useState(undefined);
  const [selectedState, setSelectedState] = useState(null);
  const [cities, setCities] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  
  const { data: jobList, isLoading: loading1} = useJobsQuery();
  const { data: userInfo, isLoading: loading8} = useGetUserDataQuery();
  const { data: statesList } = useStateQuery();
  
  const { data: jobApplicationsList } = useJobApplicationsQuery();
  const { data: allJobApplicationsList } = useJobAllApplicationsQuery();
  const { mutate: jobApplicationsMutation } = useUpdateJobApplicationsMutation();
  const { mutate: getAllApplicationsMutation } = useJobAllApplicationsMutation();
  const { mutate: fetchJobList, isLoading: loading2} = useUpdateJobsMutation();
  const { mutate: createJobMutation, isSuccess, isLoading: loading3 } = useCreateJobMutation();
  const { mutate: deleteJobMutation, isLoading: loading4} = useDeleteJobMutation();
  const { mutate: updateJobMutation, isLoading: loading5} = useUpdateJobMutation();
  const {mutate: getStateMutation } = useGetStateMutation();

  const {data: countriesList } = useGetCountriesQuery();
  const {mutate: getCountriesMutation } = useGetCountriesMutation();

  const { mutate: createJobApplications} = useCreateJobApplicationsMutation()
  const { mutate: getUserQuery, isLoading: loading6} = useGetUserQuery();


  const mainLoader = loading1 || loading2 || loading3 || loading4 || loading5


  const showModal = () => {
    setModalTitle("Add");
    setIsModalOpen(true);
    setFormData({});
    
  };

  
  const handleOk = () => {
    if(modalTitle == "Add"){
      const payload = {
        ...formData,
        // thumbnail: fileList,
        postedByCategory: userInfo.category,
        postedBySubCategory: userInfo.subCategory,
        postedById: userInfo?._id,
        postedByName: userInfo?.fullName,
      }
      if(formData?.postedTill && formData?.jobTitle && formData?.requirement && formData?.content){
        createJobMutation(payload);
        if(isSuccess || !loading4){
          setIsModalOpen(false);
          setFormData({});
        }
      }else {
        messageApi.open({
          type: 'error',
          content: 'Please Fill Required Fields',
        });
      }
    }else {
      const payload = formData
      updateJobMutation(payload);
      if(isSuccess || !loading4){
        setIsModalOpen(false);
        setFormData({});
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShareDetails = (value) => {
    const payload = {
      sharedById: userInfo?._id,
      sharedByName: userInfo?.fullName,
      // sharedByDp: value.postedById,
      sharedByCategory: userInfo?.category,
      sharedByExperience: userInfo?.experience,
      sharedTo: value.postedById,
      jobId: value._id,
      jobTitle: value.jobTitle,
      appliedDate: value.postedOn,
      jobExpired: value.postedTill,
      status: true
    }
    createJobApplications(payload)
  }

  const onShowSizeChange = (page, limit) => {
    const payload = {
      ...formData,
      page: page,
      postedById: userId
      // limit: limit
    };
    Object.keys(formData).forEach(key => {
      if(!formData[key])
        delete formData[key]
    });
    fetchJobList(payload);
    getAllApplicationsMutation();
  }

  const handleUpdate = (item) => {
    setFormData(item);
    setIsModalOpen(true);
    setModalTitle("Edit");
  }

  const handleDelete = (id) => {
    deleteJobMutation(id);
  }

  const fetchUserDetails = async () => {
    getUserQuery(userId)
  }

  const fetchJobApplicationsMutation = () => {
    const payload = {
      userId: userId
    };
    Object.keys(payload).forEach(key => {
      if(!payload[key])
        delete payload[key]
    });
    jobApplicationsMutation(payload);
  }

  useEffect(() => {
    const payload = {
      postedById: userId
    };
    Object.keys(formData).forEach(key => {
      if(!formData[key])
        delete formData[key]
    });
    fetchJobList(payload);
    fetchUserDetails();
    fetchJobApplicationsMutation();
    getAllApplicationsMutation();
    getStateMutation();
    getCountriesMutation();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const cities = mapCities(statesList, selectedState);
      setCities(cities);
    }
  }, [selectedState]);

  useEffect(() => {
    const states = mapStates(statesList);
    setLocation(states);
  }, [statesList]);

  return (
    <Spin spinning={mainLoader}>
    {contextHolder}
    <h1>My Jobs</h1>
    <div className="jobcard-page-body">
      <Button type="primary" className="modal-btn" onClick={showModal}>
        Job Create
      </Button>
      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
     {/* <ImageCrop fileList={fileList} setFileList={setFileList} /> */}
        <div>
          <label className="input-label">
            <span style={{ color: "red", fontSize: "18px" }}>*</span> Posted By
            Name :
          </label>
          <Input
            placeholder="Posted By Name"
            value={userInfo?.fullName}
            disabled
          />
        </div>
        <div>
          <label className="input-label">
            <span style={{ color: "red", fontSize: "18px" }}>*</span> Job Title
            :
          </label>
          <Input
            placeholder="Job Title"
            value={formData?.jobTitle}
            onChange={(e) => {
              setFormData({ ...formData, jobTitle: e.target.value });
            }}
          />
        </div>
        <label className="input-label">
          <span style={{ color: "red", fontSize: "18px" }}>*</span> Requirement
          :
        </label>
        <InputNumber
          placeholder="Requirement"
          style={{width: '100%'}}
          value={formData?.requirement}
          onChange={(e) => {
            setFormData({
              ...formData,
              requirement: e,
            });
          }}
        />
        <label className="input-label">
          <span style={{ color: "red", fontSize: "18px" }}>*</span> Budget
          :
        </label>
        <InputNumber
        placeholder="Budget"
        style={{width: '100%'}}
        value={formData?.budget}
        onChange={(e) => {
          setFormData({
            ...formData,
            budget: e,
          });
        }}
      />
        {/*<label className="input-label">
          <span style={{ color: "red", fontSize: "18px" }}>*</span> Category :
        </label>
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          value={formData?.postedByCategory}
          onChange={(value) => setFormData({ ...formData, postedByCategory: value })}
          onSearch={onSearch}
          //   filterOption={(input, option) =>
          //     (option.label "").toLowerCase().includes(input.toLowerCase())
          //   }
          options={[
            {
              value: "actor",
              label: "actor",
            },
            {
              value: "actress",
              label: "actress",
            },
            {
              value: "other",
              label: "other",
            },
          ]}
        />*/}
        {/* <label className="input-label">
            <span style={{ color: "red", fontSize: "18px" }}>*</span>Start date:
          </label>
          <Space direction="vertical" size={12}>
            <DatePicker
              defaultValue={dayjs("01/01/2015", dateFormatList[0])}
              format={dateFormatList}
              onChange={(e) => console.log(e.target.value, "data picker")}
            />
          </Space> */}
        {/*<label className="input-label">
          <span style={{ color: "red", fontSize: "18px" }}>*</span> End date:
        </label>*/}
        <Space direction="vertical" size={12}>
          {/*<DatePicker
            // format="DD-MM-YYYY"
            // value={formData?.postedTill}
            format={dateFormatList}
            // value={dayjs(formData?.postedTill, 'DD-MM-YYYY')}
            selected={dateSet || ''}
            placeholder={formData?.postedTill}
            onChange={(e, value) => {
              setFormData({...formData, postedTill: e?._d})
            }}
          />*/}
          <FormInput
            type="date"
            name="postedTill"
            label="End date:"
            value={formData?.postedTill}
            onChange={(e)=> {
              setFormData({...formData, postedTill: e.target.value})
            }}
            // validationError={formDataErrors.dateOfBirth}
            required
          // disabled
          />
        </Space>

        <FormSelect
          name="country"
          label="Select your country"
          value={formData?.country}
          onSelect={(cat, val) => {
            setSelectedState(val.value);
            const data = {
              ...formData, country: val.value, state: '', city: ""
            };
            setFormData(data);
          }}
          options={
            countriesList &&
            countriesList?.map((item, idx) => {
              return {
                _id: idx,
                id: idx,
                key: idx,
                code: item?.phone_code,
                value: item?.country_name 
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

        <FormSelect
          name="state"
          label="Select your state"
          value={formData?.state}
          onSelect={(cat, val) => {
            setSelectedState(val.value);
            const data = {
              ...formData, state: val.value, city: "" ,
            };
            setFormData(data);
          }}
          options={
            location && Object.keys(location)?.map((item, idx) => {
              return {
                _id: idx,
                value: item
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

        <FormSelect
          name="cities"
          label="Select your city"
          value={formData?.city}
          onSelect={(cat, val) => {
            const data = {
              ...formData, city: val.value,
            };
            setFormData(data);
          }}
          options={
            cities && cities?.map((item, idx) => {
              return {
                _id: idx,
                value: item?.value
              };
            })
          }
          // options={cities}
          showSearch
          required
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          // validationError={formDataErrors.city}
          width={"100%"}
        />

        {/* <label className="input-label">Time :</label>
          <Select
            mode="multiple"
            placeholder="Select time"
            showArrow
            tagRender={tagRender}
            defaultValue={["gold", "cyan"]}
            style={{
              width: "100%",
            }}
            options={options}
          />
          */}
        <label className="input-label">
          <span style={{ color: "red", fontSize: "18px" }}>*</span> Bio :
        </label>
        <TextArea
          rows={4}
          placeholder="Maxlenth 250 character..............."
          maxLength={250}
          value={formData?.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </Modal>
       {jobList?.data?.length ? <JobCard
          userId={userId}
          data={jobList?.data}
          jobApplicationsList={jobApplicationsList}
          allJobApplicationsList={allJobApplicationsList}
          handleShareDetails={handleShareDetails}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        // JobApplicationsLength={jobApplicationsData?.length || 0}
      /> : (
       <EmptyMessage />
      )}
      <div className="pagination-section">
      {jobList?.data?.length >= 9 && <CommonPagination total={jobList?.data?.length} onShowSizeChange={onShowSizeChange}/>}
       </div>
    </div>
    </Spin>
  );
};

export default MyJobs;
