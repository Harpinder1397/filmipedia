import React from 'react';
import { Typography, Card } from 'antd';
import EmptyMessage from '../../../common/emptyMessage/EmptyMessage';

const { Text, Link } = Typography;

const Links = ({projects}) => {
    return (
  <div className='links-container'>
    {/*<Link href="https://ant.design" target="_blank">
      Ant Design (Link)
    </Link>
    <Link href="https://ant.design" target="_blank">
      Ant Design (Link)
    </Link>
    <Link href="https://ant.design" target="_blank">
      Ant Design (Link)
    </Link>
    <Link href="https://ant.design" target="_blank">
      Ant Design (Link)
    </Link>
    <Link href="https://ant.design" target="_blank">
      Ant Design (Link)
</Link>*/}
    {projects?.length ? projects?.map((item) => {
        return (
            <Card size='small' type="inner" title={item?.projectName} extra={<a href={item?.links}>Link</a>}>
            <div className="project-links-section">
                <div style={{marginBottom: '8px'}}>
                    <Text>Category : </Text><Text code>{item?.category}</Text>
                </div>
                <div>
                    <Text>Sub Category : </Text><Text code>{item?.subCategory}</Text>
                </div>
            </div>
            </Card>
        )
    }) : <EmptyMessage />}
  </div>
);
}
export default Links;