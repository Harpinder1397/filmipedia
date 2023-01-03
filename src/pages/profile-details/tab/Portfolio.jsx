import React, { useState } from 'react';
import { Image } from 'antd';
import EmptyMessage from '../../../common/emptyMessage/EmptyMessage';
const Portfolio = ({userDetails}) => {
  const [visible, setVisible] = useState(false);
//   console.log(userDetails?.thumbnails, 'userDetails');
return (
    userDetails?.thumbnails?.length ? ( userDetails?.thumbnails.map((item) => {
        return (
            <Image
                width={241}
                src={item?.url}
            />
        )
    })
    ) : <EmptyMessage />
  );
};
export default Portfolio;