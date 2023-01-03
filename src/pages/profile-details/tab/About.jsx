import React from 'react';
import { Badge, Descriptions } from 'antd';
const About = ({userDetails}) => {
    return (
        <Descriptions bordered column={{xs:2, sm:2, md:4, lg:4, xxl:4, xl:4}}>
            <Descriptions.Item span={2} label="Full Name">{userDetails?.fullName || '-'}</Descriptions.Item>
            <Descriptions.Item span={2} label="User Name">{userDetails?.userName || '-'}</Descriptions.Item>
            <Descriptions.Item span={2} label="Gender">{userDetails?.gender || '-'}</Descriptions.Item>
            <Descriptions.Item span={2} label="Date of Birth">{userDetails?.dateOfBirth || '-'}</Descriptions.Item>
            <Descriptions.Item span={2} label="Email">{userDetails?.email || '-'}</Descriptions.Item>
            <Descriptions.Item span={2} label="Language">{userDetails?.languages?.toString() || '-'}</Descriptions.Item>
            <Descriptions.Item span={2} label="Category">{userDetails?.category || '-'}</Descriptions.Item>
            <Descriptions.Item span={2} label="Sub Category">{userDetails?.subCategory || '-'}</Descriptions.Item>
            <Descriptions.Item span={2} label="Tag">{userDetails?.tags?.toString() || '-'}</Descriptions.Item>
            <Descriptions.Item span={2} label="Experience">{userDetails?.experience || '-'}</Descriptions.Item>
            <Descriptions.Item span={2} label="State">{userDetails?.state || '-'}</Descriptions.Item>
            <Descriptions.Item span={2} label="City">{userDetails?.city || '-'}</Descriptions.Item>
            <Descriptions.Item span={2} label="Bio">{userDetails?.bio || '-'}</Descriptions.Item>
        </Descriptions>
    )
};
export default About;