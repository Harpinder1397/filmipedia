import TableComponent from "../../../common/TableComponent";
import React, { useEffect } from "react";
import { Spin, Typography } from "antd";
import { useJobApplicationsQuery, useUpdateJobApplicationsMutation } from "api/getJobApplications";

const { Title } = Typography;

const MyApplications = () => {

  const userId = localStorage.getItem('user');
  const { data, isLoading: loading1 } = useJobApplicationsQuery();
  const { mutate: jobApplicationsMutation, isLoading: loading2 } = useUpdateJobApplicationsMutation();
  const mainloader = loading1 || loading2

  const stateCol = [
    {
      title: "jobTitle",
      key: "jobTitle",
      dataIndex: "jobTitle",
    },
    {
      title: "Name",
      key: "sharedByName",
      dataIndex: "sharedByName",
    },
    {
      title: "Category",
      key: "sharedByCategory",
      dataIndex: "sharedByCategory",
    },
    {
      title: "Experience",
      key: "sharedByExperience",
      dataIndex: "sharedByExperience",
    },
    {
      title: "Job Expired",
      key: "jobExpired",
      dataIndex: "jobExpired",
    },
    // {
    //   title: "action",
    //   key: "action",
    //   dataIndex: "action",
      // render: (text, row) =>
      // <>
      //   <EditOutlined
      //     onClick={() => {
      //       setIsEditModal('edit');
      //       setIsVisible(true);
      //       setFormData(row);
      //   }}/>
      //   <PopConfirm
      //     title='Are you sure?'
      //     onConfirm={ async() => {
      //       const res = await deleteStateApi(row._id);
      //       if(res){
      //         fetchStatesMutation();
      //       }
      //     }}
      //     body={
      //       <DeleteOutlined className="state-delete-btn" />
      //     }
      //   />

      // </>
    // },
  ];

  const fetchJobApplicationsMutation = () => {
    const payload = {
      sharedById: userId
    };
    Object.keys(payload).forEach(key => {
      if(!payload[key])
        delete payload[key]
    });
    jobApplicationsMutation(payload);
  }
 
  useEffect(() => {
    fetchJobApplicationsMutation()
  }, [])
  

  return (
    <Spin spinning={mainloader}>
      <Title level={3}>My Job Applications</Title>
      <TableComponent
        columns={stateCol}
        data={data?.sort((a, b) => a?.state?.localeCompare(b?.state))}
      />
    </Spin>
  );
};

export default MyApplications;
